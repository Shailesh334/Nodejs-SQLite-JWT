
import { useState } from "react"
import Auth from "./components/Auth"
import Show from "./components/Show"
function App() {
  const [isLoggedIn , setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));
  
  return (
    
    <>
      {!isLoggedIn && <Auth setIsLoggedIn={setIsLoggedIn}/>}
      {isLoggedIn && <Show />}
    </>
  )
}

export default App
