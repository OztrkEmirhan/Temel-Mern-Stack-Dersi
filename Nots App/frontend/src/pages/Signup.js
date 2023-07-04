import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup=()=>{

    const [email,setEmail]=useState('')
    const [parola,setParola]=useState('')

    const {signup,hata,yukleniyor}=useSignup()

    const handleSubmit=async (e)=>{
        e.preventDefault();

        //console.log(yukleniyor);

       await signup(email,parola)
    }


    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Üye Ol</h3>
            <label>Email:</label>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} />

            <label>Parola:</label>
            <input type="password" onChange={(e)=>setParola(e.target.value)} />

            <button disabled={yukleniyor} type="submit">Üye Ol</button>

            {hata && <div className="error">{hata}</div>}
        </form>
    )
}


export default Signup