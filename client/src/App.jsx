
import { useState } from "react"
import Auth from "./components/Auth"
import Show from "./components/Show"
function App() {
  const [isLoggedIn , setIsLoggedIn] = useState(false);

  return (
    
    <>
      {!isLoggedIn && <Auth setIsLoggedIn={setIsLoggedIn}/>}
      {isLoggedIn && <Show />}
    </>
  )
}

export default App
