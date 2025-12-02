import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
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
        
        <div className='min-h-[90vh] w-full pt-16 bg-slate-100'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App