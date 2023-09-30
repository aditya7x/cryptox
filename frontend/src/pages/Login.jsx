import React ,{useState} from "react";
import Home from "./Home";
import {Routes, Route, useNavigate} from 'react-router-dom'
import App from "../App";

function Login(props){
    const[email,setEmail] =  useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleOnSubmit = async (e) => {
        
        e.preventDefault();
        let result = await fetch(
        'http://localhost:5000/login', {
            method: "post",
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(result.status === 200){
          props.sendEmail(email)
         
          navigate('/home')

        }else{
          alert("invalid credentials")
        }

       
     
        
       
    
    }

 return(
    <section className="background-radial-gradient overflow-hidden balls size">

      
        <div className="container pos">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{zIndex: "10"}}>
              <h1 className="bada" style={{color: "hsl(218, 81%, 95%)"}}>
                Guru <br />
                <span style= {{color: "hsl(218, 81%, 75%)"}} >Work</span>
              </h1>
             
            </div>
      
            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>
      
              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                <h3 className="welcome">Welcome Back</h3>
                  <form>
           
                    <div className="fistname">
                      <input type="email" id="form3Example3" className="fir" value={email} onChange={(e) => setEmail(e.target.value)}/>
                      <label className="naamkaran1" for="form3Example3">Enter your Email address</label>
                    </div>
      
                   
                    <div className="firstname">
                      <input type="password" id="form3Example4" className="fir" value={password} onChange={(e) => setPassword(e.target.value)} />
                      <label className="naamkaran1" for="form3Example4">Enter your Password</label>
                    </div>

            
      
                               
                    <button type="submit" className="btn btn-primary btn-block mb-4 regi" onClick={handleOnSubmit}>
                    <span className="hebhai">Login</span>
                    </button>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Routes>
        
          <Route path="/home" element={<Home  />} />
         
        </Routes>
      </section>
 )
}

export default Login;
