import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import ListaCategorias from "./components/categorias/listarcategorias/ListaCategorias"
import FormCategoria from "./components/categorias/formcategoria/FormCategoria"
import DeletarCategoria from "./components/categorias/deletarcategorias/DeletarCategoria"
import { ToastContainer } from "react-toastify"
import ListarProdutos from "./components/produtos/listarprodutos/ListarProdutos"
import FormProduto from "./components/produtos/formproduto/FormProduto"
import DeletarProduto from "./components/produtos/deletarprodutos/DeletarProduto"
import Home from "./pages/home/Home"

type MenuState = 'closed' | 'open';

function App() {

  const [menuState, setMenuState] = useState<MenuState>('closed');
  const toggleMenu = (): void => {
    setMenuState(prevState => prevState === 'closed' ? 'open' : 'closed');
  };
  const closeMenu = (): void => {
    setMenuState('closed');
  };

  return (
    <>
      <BrowserRouter>

        <Navbar
          menuState={menuState}
          onMenuToggle={toggleMenu}
          onMenuClose={closeMenu}
        />
        <ToastContainer />
        <div className='min-h-[90vh] w-full pt-16 bg-slate-100'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/categorias" element={<ListaCategorias />} />
            <Route path="/categorias/cadastrar" element={<FormCategoria />} />
            <Route path="/categorias/:id" element={<FormCategoria />} />
            <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
            <Route path="/produtos" element={<ListarProdutos />} />
            <Route path="/cadproduto" element={<FormProduto />} />
            <Route path="/editarproduto/:id" element={<FormProduto />} />
            <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
