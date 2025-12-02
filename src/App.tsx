import Footer from "./components/footer/Footer"
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"


function App() {

  

  return (
    <>
     
        
        <Navbar menuState={"closed"} onMenuToggle={function (): void {
        throw new Error("Function not implemented.")
      } } onMenuClose={function (): void {
        throw new Error("Function not implemented.")
      } }/>
         <Home />
         <Footer />
      
    </>
  )
}

export default App