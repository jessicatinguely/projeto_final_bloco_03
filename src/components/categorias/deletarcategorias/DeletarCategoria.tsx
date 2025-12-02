import { useEffect, useState } from "react";
// Importamos hooks do React Router DOM para navegação e captura de parâmetros da URL.
import { useNavigate, useParams } from "react-router-dom"; 
// Importamos o modelo de dados (interface) da nossa Entidade "Categoria".
import type Categoria from "../../../models/Categoria"; 
// Importamos as funções de serviço que se comunicam com a nossa API (Backend).
import { buscar, deletar } from "../../../services/Service"; 
// Componente visual para indicar que uma operação está em andamento.
import { ClipLoader } from "react-spinners";
// Função utilitária para exibir notificações ao usuário.
import { ToastAlerta } from "../../../utils/ToastAlerta";


function DeletarCategoria() {

  // navigate é usado para redirecionar o usuário após a operação (ex: voltar para a lista).
  const navigate = useNavigate(); 

  // Estado que controla se a operação de deleção está em andamento, para desabilitar o botão.
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  // Estado que armazena os dados da Categoria que será exibida e, posteriormente, deletada.
  // Usamos '{} as Categoria' para inicializar o objeto vazio com a tipagem correta.
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria); 

  // useParams captura o ID que está na rota (ex: /deletarcategoria/10)
  // Esse ID é essencial para saber qual registro buscar e deletar.
  const { id } = useParams<{ id: string }>(); 

  // Função assíncrona para buscar os dados da Categoria pelo ID antes de deletar.
  async function buscarCategoriaPorId() {
    try {
      // Chamamos a função de serviço que faz a requisição GET na nossa API.
      await buscar(`/categorias/${id}`, setCategoria);
    } catch (error: any) {
      // Se houver qualquer erro na busca (ex: ID não existe, 404), tratamos:
      ToastAlerta('Erro ao carregar a Categoria ou ID inválido.', 'erro');
      // E redirecionamos o usuário de volta para a lista principal, pois o ID falhou.
      navigate('/categorias');
    }
  }

  // Hook que é executado na montagem do componente e sempre que o 'id' mudar.
  useEffect(() => {
    // Garantimos que só buscamos se o ID estiver presente na URL.
    if (id !== undefined) {
      buscarCategoriaPorId();
    }
  }, [id]); // Dependência [id]: o efeito re-executa se o ID na URL mudar.

  // Função simples para redirecionar o usuário, usada no botão 'Não'.
  function retornar() {
    navigate('/categorias');
  }

  // Função principal para a execução da exclusão de dados.
  async function deletarCategoria() {
    setIsLoading(true); // Ativa o spinner e desabilita o botão.

    try {
      // Ação Crítica: Faz a requisição DELETE para a API.
      await deletar(`/categorias/${id}`);
      
      // Se a requisição for SUCESSO (Status 2xx):
      ToastAlerta('Categoria deletada com sucesso', 'sucesso');
      retornar(); // Redireciona para a lista.

    } catch (error) {
      // Se a requisição falhar (Status 4xx, 5xx, ou erro de rede):
      ToastAlerta('Erro ao deletar categoria. Tente novamente.', 'erro');
    
    } finally {
      // O 'finally' garante que o código aqui será executado, 
      // independente de ter havido sucesso (try) ou falha (catch).
      setIsLoading(false); // Desativa o spinner.
    }
  }

  // Bloco de renderização do componente.
  return (
    <div className='container w-1/3 mx-auto'>
      <h1 className='text-4xl text-center my-4'>Deletar categoria</h1>

      <p className='text-center font-semibold mb-4'>
        Você tem certeza de que deseja apagar a categoria a seguir?
      </p>

      <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
        <header
          className='py-2 px-6 bg-teal-500  text font-bold text-2xl'>
          Categoria
        </header>

        {/* Exibimos a descrição no corpo, para mais contexto. */}
        <p className='p-8 text-3xl bg-slate-200 h-full'>{categoria.nome}</p>

        <div className="flex">
          <button
            className='text bg-red-300 hover:bg-red-400 w-full py-2'
            onClick={retornar} // Usa a função que apenas redireciona (cancela a deleção).
          >
            Não
          </button>

          <button
            className='w-full text bg-teal-500 
                       hover:bg-[#f9f5ec] flex items-center justify-center'
            onClick={deletarCategoria} // Chama a função que faz a deleção.
            disabled={isLoading} // O botão fica desabilitado enquanto 'isLoading' for true.
          >
            {/* Renderização condicional: Mostra o spinner se estiver carregando, 
                ou o texto 'Sim' caso contrário. */}
            {isLoading ? (
              <ClipLoader
                color="#FFFFFF"
                size={24}
              />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarCategoria;