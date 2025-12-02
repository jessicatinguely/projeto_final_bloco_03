import { useNavigate } from "react-router-dom";
import CardCategoria from "../cardcategoria/CardCategoria"
import { useEffect, useState } from "react";
// Importamos a função de busca (GET) da nossa camada de serviço.
import { buscar } from "../../../services/Service";
// Tipagem da nossa Entidade Categoria.
import type Categoria from "../../../models/Categoria";
// Função para exibir notificações.
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaCategorias() {

  // Hook para navegação programática.
  const navigate = useNavigate(); 

  // Estado que controla o carregamento, para exibir o spinner.
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  // Estado que armazena a lista de categorias buscadas da API. Inicializado como um array vazio.
  const [categorias, setCategorias] = useState<Categoria[]>([]); 

  // Função assíncrona para buscar a lista de categorias na API.
  async function buscarCategorias() {
    try {
      setIsLoading(true); // Inicia o carregamento.

      // Faz a requisição GET na rota '/categorias' e preenche o estado 'categorias'.
      await buscar('/categorias', setCategorias)

    } catch (error: any) {
      // Em um ambiente sem login/token, este bloco trata erros genéricos de rede ou servidor (404, 500, etc.).
      ToastAlerta('Erro ao carregar a lista de categorias.', 'erro');
    } finally {
      // Finaliza o carregamento, independente do sucesso ou erro da requisição.
      setIsLoading(false); 
    }
  }

  // Hook useEffect: Responsável por executar a busca de categorias.
  // A dependência VAZIA ([]) garante que a busca ocorra APENAS uma vez, na montagem do componente.
  // Isso evita loops de renderização e requisições excessivas.
  useEffect(() => {
    buscarCategorias(); 
  }, []);

  return (
    <>
      {
        // Renderização Condicional: Se isLoading for true, exibe o loader.
        isLoading && ( 
          
            <div className="flex justify-center text-5xl animate-bounce">
                        🔎︎💊
            </div>
          
        )
      }
      <div className="flex justify-center w-full ">
        <div className="container flex flex-col">
          {
            // Renderização Condicional: Se não estiver carregando E a lista estiver vazia.
            (!isLoading && categorias.length === 0) && ( 
              <span className="text-3xl text-center">
                Nenhuma categoria foi encontrada.
              </span> 
            )
          }
          {/* Estrutura de grid responsiva para exibir os cards. */}
          <div className="grid grid-cols-1 md:grid-cols-2 
                          lg:grid-cols-3 gap-8">

            {
              // Itera sobre a lista de categorias e cria um CardCategoria para cada item.
              // important: A prop 'key' é essencial para o desempenho do React ao renderizar listas.
              categorias.map((categoria) => (
                <CardCategoria key={categoria.id} categoria={categoria} />
              ))
            }

          </div>
        </div>
      </div>
     
    </>
  )
}
export default ListaCategorias;