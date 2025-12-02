import { useEffect, useState } from 'react'
import { PacmanLoader } from 'react-spinners'
import type Produto from '../../../models/Produto'
import { buscar } from '../../../services/Service'
import CardProdutos from '../cardprodutos/CardProdutos'

function ListarProdutos() {
    const [produtos, setProdutos] = useState<Produto[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function buscarProdutos() {
        setIsLoading(true)

        try {
            await buscar('/produtos', setProdutos)
        } catch {
            console.log('Erro ao buscar todos os Produtos!')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        buscarProdutos()
    }, [produtos.length])

    return (
        <>
            {isLoading && (
                <div className="flex justify-center text-5xl animate-bounce pt-20">
                    🔎︎💊
                </div>
            )}
            <div className="flex justify-center mt-4 md:mt-6">
                <div className="container flex flex-col m-2 md:my-0">
                    {!isLoading && produtos.length === 0 && (
                        <span className="my-8 text-3xl text-center">
                            Nenhum produto foi encontrado
                        </span>
                    )}

                    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 mb-4 md:mb-0 p-2 md:p-4">
                        {produtos.map((produto) => (
                            <CardProdutos
                                key={produto.id}
                                produto={produto}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListarProdutos