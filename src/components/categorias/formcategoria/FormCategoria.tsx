import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";

// Importamos os hooks essenciais para navegação e captura de parâmetros da rota.

import { useNavigate, useParams } from "react-router-dom";

// Tipagem da nossa Entidade Categoria.

import type Categoria from "../../../models/Categoria";

// Funções que se comunicam com a API (CRUD).

import { atualizar, buscar, cadastrar } from "../../../services/Service";

// Componente visual para indicar carregamento.

import { ClipLoader } from "react-spinners";
import { ToastAlerta } from "../../../utils/ToastAlerta";

// Função para exibir notificações ao usuário.

function FormCategoria() {

    // Estados e Hooks de Controle (State Management)
    // Hook para navegação programática (redirecionar o usuário).

    const navigate = useNavigate();

    // Estado de controle para feedback visual durante a comunicação com a API.

    const [isLoading, setIsLoading] = useState<boolean>(false);


    // Estado que armazena os dados do formulário.

    // Inicializado como um objeto vazio, mas tipado como Categoria.

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

    // Captura o 'id' da URL (se estiver no modo de edição).

    // Se estiver no modo de cadastro, 'id' será 'undefined'.

    const { id } = useParams<{ id: string }>();


    // Funções de Ciclo de Vida e Busca de Dados
    // Função assíncrona para pré-carregar os dados da Categoria no modo de Edição.
    async function buscarCategoriaPorId() {

        try {

            // Se o ID for válido, a função 'buscar' preenche o estado 'categoria'.

            await buscar(`/categorias/${id}`, setCategoria)

        } catch (error: any) {

            // Tratamento de erro de recurso não encontrado (ex: 404).

            ToastAlerta('Erro ao carregar Categoria. Redirecionando.', 'erro');

            navigate('/categorias');

        }

    }



    // Hook useEffect: Lida com Efeitos Colaterais (side effects).

    // Ele executa a função de busca de dados apenas quando o 'id' (parâmetro da URL)

    // estiver disponível, garantindo o modo de Edição.

    useEffect(() => {

        if (id !== undefined) {

            buscarCategoriaPorId();

        }

    }, [id]) // A dependência [id] garante que a busca só ocorra quando a rota for definida!



    // Função de Redirecionamento (usada após salvar ou ao cancelar).

    function retornar() {

        navigate('/categorias');

    }



    // Funções de Manipulação de Estado e Eventos



    // Função para manter o estado sincronizado com os inputs do formulário.

    // O evento ChangeEvent<HTMLInputElement> garante a tipagem correta.

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {

        setCategoria({

            ...categoria, // Mantém os dados existentes (Spread Operator).

            [e.target.name]: e.target.value // Atualiza apenas o campo que mudou.

        });

    }



    // Função principal para enviar o formulário (Cadastro ou Atualização).

    async function gerarNovoCategoria(e: FormEvent<HTMLFormElement>) {

        e.preventDefault(); // Impede o recarregamento padrão da página.

        setIsLoading(true); // Inicia o carregamento.



        try {

            if (id !== undefined) {

                // Modo de ATUALIZAÇÃO (requisição PUT)

                // Usamos a mesma URL '/categorias' se a API usa Body Request para PUT.

                await atualizar(`/categorias`, categoria, setCategoria) // Passamos a função setCategoria.

                ToastAlerta('Categoria atualizada com sucesso!', 'sucesso');

            } else {

                // Modo de CADASTRO (requisição POST)

                await cadastrar('/categorias', categoria, setCategoria)

                ToastAlerta('Categoria cadastrada com sucesso!', 'sucesso');

            }

        } catch (error: any) {

            // Em caso de falha da API (geralmente status 4xx ou 5xx):

            ToastAlerta('Erro ao salvar a Categoria! Verifique os dados e tente novamente.', 'erro');

        } finally {

            // O bloco 'finally' sempre será executado, independentemente do sucesso ou erro.

            setIsLoading(false); // Finaliza o carregamento.

            retornar(); // Redireciona o usuário para a lista.

        }

    }



    // Console.log útil para debug: exibe o objeto 'categoria' no console.

    console.log(JSON.stringify(categoria));



    // 4. Estrutura do Componente (Renderização)



    return (

        <div className="container flex flex-col items-center justify-center mx-auto">

            <h1 className="text-4xl text-center my-8">

                {/* Título dinâmico: 'Cadastrar Categoria' ou 'Atualizar Categoria' */}

                {id === undefined ? 'Cadastrar' : 'Atualizar'} Categoria

            </h1>

            <form className="w-1/2 flex flex-col gap-4"

                onSubmit={gerarNovoCategoria}>


                {/* Input para o Nome da Categoria */}

                <div className="flex flex-col gap-2">

                    <label htmlFor="nome">Nome da Categoria</label>

                    <input

                        type="text"

                        placeholder="Ex: Analgésicos, Anti-inflamatórios, Cosméticos"

                        name="nome"

                        required // Campo obrigatório

                        className="border-2 border-slate-700 rounded p-2"

                        value={categoria.nome || ''} // Exibe o valor do estado. Se for undefined, exibe string vazia.

                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}

                    />

                </div>



                {/* Botão de Submissão com Indicador de Carregamento */}

                <button

                    className="rounded text-white bg-teal-500 hover:bg-teal-600  w-1/2 py-2 mx-auto flex justify-center"

                    type="submit"

                >

                    {

                        isLoading ?

                            <ClipLoader

                                color="#FFFFFF"

                                size={24}

                            /> :

                            <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>

                    }

                </button>

            </form>

        </div>

    );

}



export default FormCategoria;