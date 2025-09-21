
import { useState } from 'react';
const Auth = ({setIsLoggedIn}) => {
    const [isRegestered , setIsTRegestered] = useState(false);
    const [email , setEmail] = useState("")
    const [pass , setPass] = useState("")
    const [cpass , setCpass] = useState("")
    

    const handleLogin = async () =>{

        try{
            const res = await fetch('http://localhost:5000/auth/login', {
                method : "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username :email, password:pass}),
            });

            const data = await res.json();

            if(res.ok){
                const token = data.token;
                localStorage.setItem("token", token);
                setIsLoggedIn(true);
            }
            else{
                alert(data.message);
            }
        }
        catch(err){
            console.log(err.message);
        }
    

    }
    const handleSignUp = async() =>{
        if( cpass != pass)return alert("password doesnt match !")
        try{
            const res = await fetch('http://localhost:5000/auth/register', {
                method : "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username :email, password:pass}),
            });

            const data = await res.json();

            if(res.ok){
                const token = data.token;
                localStorage.setItem("token", token);
                setIsLoggedIn(true);
            }
            else{
                alert(data.message);
            }
        }
        catch(err){
            console.log(err.message);
        }
        
    }
    return (
        <div className='auth'>
            <div className="auth-container">
                <h2>{isRegestered ? "Login " : "Create An Account"}</h2>
                <input type="email" placeholder='Enter email' className='input' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/><br />
                <input type="password" placeholder='Enter Password' className='input' name='password' value={pass} onChange={(e) => setPass(e.target.value)}/><br />
                {!isRegestered && (<><input type="password" placeholder='Confirm Password' className='input'value={cpass} onChange={(e) => setCpass(e.target.value)}/><br /></>)}
                <div className='btn'>{(
                    <>
                    {isRegestered && <button onClick={handleLogin}>Login</button>}
                    {!isRegestered && <button onClick={handleSignUp}>Sign Up</button>}
                    </>
                )}
                </div>
                <span onClick={() => setIsTRegestered(!isRegestered)}>{isRegestered ?  'Sign Up' : 'Login'}</span>
            </div>
        </div>
    )
}

export default Auth
