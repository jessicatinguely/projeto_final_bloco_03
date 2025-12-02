import { ListIcon, ShoppingCartIcon, UserIcon, XIcon } from "@phosphor-icons/react";
import { useRef } from "react";
import SearchForm from "./SearchForm";
import { Link } from "react-router-dom";

type MenuState = 'closed' | 'open';

interface NavbarProps {
    menuState: MenuState;
    onMenuToggle: () => void;
    onMenuClose: () => void;
};

function Navbar({ menuState, onMenuToggle, onMenuClose }: Readonly<NavbarProps>) {

    const menuRef = useRef<HTMLDivElement>(null);

    const handleMenuToggle = (): void => {
        onMenuToggle();
    };

    // Handler para fechar o menu mobile, ao clicar no botão X
    const handleMenuClose = (): void => {
        onMenuClose();
    };

    return (
        <>
            {/* Navbar fixa no topo , todas as telas */}
            <div className='fixed top-0 left-0 z-50 flex justify-center w-full py-4 text-white bg-teal-500 md:py-2'>
                <div className="container flex items-center justify-between mx-6 mt-2 text-lg">
                    {/* Logo da loja, sempre visível (sem rota) */}
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="https://ik.imagekit.io/hnkqnvn7cu/cruzar.png?updatedAt=1764677411653"
                            alt="Logo"
                            className="w-12 md:w-16"
                        />
                        <span className="text-xl font-semibold tracking-wide">VivaBem</span>
                    </Link>

                    {/* Barra de busca */}
                    <div className="relative flex items-center justify-center w-2/5 text-black max-md:hidden">
                        <SearchForm />
                    </div>

                    {/* Menu de navegação */}
                    <div className='items-center hidden gap-4 py-4 md:flex'>
                        <button type="button" className="hover:underline">Produtos</button>
                        <button type="button" className='hover:underline'>Categorias</button>
                        <button type="button" className='hover:underline'>Cadastrar Categoria</button>
                        <UserIcon size={32} weight='bold' />
                        <ShoppingCartIcon size={32} weight='bold' />
                    </div>

                    {/* Botão menu mobile, só aparece em telas pequenas e quando o menu está fechado */}
                    {menuState === 'closed' && (
                        <button className="p-2 cursor-pointer md:hidden" onClick={handleMenuToggle} aria-label="Abrir menu">
                            <ListIcon size={32} weight="bold" />
                        </button>
                    )}
                </div>
            </div>

            {/* Menu mobile  */}
            {menuState === 'open' && (
                <div
                    ref={menuRef}
                    className="fixed top-0 left-0 z-50 w-full h-full transition-all duration-300 ease-in-out bg-teal-500 bg-opacity-95 md:hidden animate-fade-in animate-slide-in"
                    style={{ animation: 'fade-in 0.3s, slide-in 0.3s' }}
                >
                    <div className="relative flex flex-col items-start justify-start gap-2 p-6 text-lg text-left text-white">

                        <div className="flex items-center justify-between w-full mb-2">
                            <img
                                src="https://ik.imagekit.io/hnkqnvn7cu/cruzar.png?updatedAt=1764677411653"
                                alt="Logo"
                                className='w-50 md:w-60'
                            />
                            <button
                                type="button"
                                aria-label="Fechar menu"
                                className="mr-2 text-white cursor-pointer hover:text-gray-300"
                                onClick={handleMenuClose}
                            >
                                <XIcon size={32} weight="bold" />
                            </button>
                        </div>

                        {/* Barra de busca mobile */}
                        <div className="w-full mb-4">
                            <SearchForm />
                        </div>

                        {/* Itens de navegação mobile: Home é rota; os demais continuam sem rota */}
                        <Link to="/" onClick={handleMenuClose} className="py-2 text-white hover:text-gray-300 text-left w-full">
                            Home
                        </Link>
                        <button onClick={handleMenuClose} className="py-2 text-white hover:text-gray-300 text-left w-full">Produtos</button>
                        <button onClick={handleMenuClose} className="py-2 text-white hover:text-gray-300 text-left w-full">Cadastrar Produto</button>
                        <button onClick={handleMenuClose} className="py-2 text-white hover:text-gray-300 text-left w-full">Categorias</button>
                        <button onClick={handleMenuClose} className="py-2 text-white hover:text-gray-300 text-left w-full">Cadastrar Categoria</button>

                        {/* Ícones de usuário e carrinho no menu mobile */}
                        <div className='flex gap-4 mt-4'>
                            <button onClick={handleMenuClose} aria-label="Usuário">
                                <UserIcon size={32} weight='bold' className="text-white" />
                            </button>
                            <button onClick={handleMenuClose} aria-label="Carrinho">
                                <ShoppingCartIcon size={32} weight='bold' className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar;