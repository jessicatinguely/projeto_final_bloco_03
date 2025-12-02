import { Link } from 'react-router-dom'

import type Categoria from '../../../models/Categoria'
import { PencilSimpleLine, Trash } from '@phosphor-icons/react'



interface CardCategoriaProps {

    categoria: Categoria

}

function CardCategoria({ categoria }: CardCategoriaProps) {

    return (

        <div className=' pt-10 flex flex-col rounded-2xl overflow-hidden justify-between my-2 '>

            <header className='px-6 py-2 bg-teal-500 text font-semibold text-2xl'>

                Categoria

            </header>

            <div className='p-6 flex flex-col gap-2 bg-[#F9F5ec] text h-full'>

                {/* Descrição com letra MENOR */}

                <p className='text-xl italic mt-1 opacity-90'>

                    {categoria.nome || 'Sem descrição detalhada.'}

                </p>


            </div>



            <div className="flex">



                <Link

                    to={`/categorias/${categoria.id}`}

                    className='w-full text bg-teal-500 hover:bg-teal-600

flex items-center justify-center py-2'

                >

                    <button><PencilSimpleLine size={32} /></button>

                </Link>



                <Link

                    to={`/deletarcategoria/${categoria.id}`}

                    className='text bg-red-300 hover:bg-red-400 w-full

flex items-center justify-center'

                >

                    <button><Trash size={32} /></button>

                </Link>



            </div>

        </div>

    )

}



export default CardCategoria