import React, { useState } from "react";
import Login from "./Login";
import {Routes, Route, useNavigate} from 'react-router-dom'
import Home from "./Home";
import axios from 'axios'


function Register(props){
const[invitationCode,setInvitation] = useState("");
const[firstname,setFirst] = useState("");
const[lastname,setLast] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [funds, setFunds] = useState(0);
const navigate = useNavigate();
const [result,setresult] = useState("")

const navigatologin = () => {

  navigate('/login');
};


const handleOnSubmit = async (e) => {
   e.preventDefault();
    if(invitationCode === "abc@123"){
     
   

    
  
  
    let result = await fetch(
    'https://cryptox-nine.vercel.app/register', {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        },
    
        method: "post",
        body: JSON.stringify({firstname, lastname, email, password ,funds}),

      
    })
 
    

    if (result) {
        alert("Data saved succesfully");
        setInvitation("");
        setFirst("");
        setLast("");
        setEmail("");
        setPassword("");
        props.sendEmail(email)
        navigate('/home');
    }else{
      alert("something went wrong")
    }
}else{
    alert("invalid invitation code");
}
}




 return(
    <section className="background-radial-gradient overflow-hidden balls size">

      
        <div className="container ">
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
                  <form>
                    {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                   
                      <div className="fisrtname">
                        <div className="">
                          <input type="text" id="form3Example1" className="fir" value={firstname} onChange={(e) => setFirst(e.target.value)}/>
                          <label className="naamkaran1" for="form3Example1">First name</label>
                        </div>
                      </div>
                      <div className="firstname">
                        <div className="form-outline">
                          <input type="text" id="form3Example2" className="fir" value={lastname} onChange={(e) => setLast(e.target.value)} />
                          <label className="naamkaran1" for="form3Example2">Last name</label>
                        </div>
                      </div>
                    
      
                    {/* <!-- Email input --> */}
                    <div className="firstname">
                      <input type="email" id="form3Example3" className="fir" value={email} onChange={(e) => setEmail(e.target.value)}/>
                      <label className="naamkaran1" for="form3Example3">Email address</label>
                    </div>
      
                   
                    <div className="firstname">
                      <input type="password" id="form3Example4" className="fir" value={password} onChange={(e) => setPassword(e.target.value)}/>
                      <label className="naamkaran1" for="form3Example4">Password</label>
                    </div>

                    <div className="firstname">
                      <input type="password" id="form3Example4" className="fir" value={invitationCode} onChange={(e) => setInvitation(e.target.value)} />
                      <label className="naamkaran1" for="form3Example4">Please enter invitation code</label>
                    </div>
      
                   
                  
      
                   
                    <button type="submit" className="btn btn-primary btn-block mb-4 regi" onClick={handleOnSubmit}>
                     <span className="hebhai">Register</span>
                    </button>
                    
                    <div className = "nahihe" >
                        Existing Account?
                    <button type="submit" className="login" onClick={navigatologin}>
                      Login Now
                    </button>
                    </div>
            
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
         
        </Routes>
      </section>
      
 )
}

export default Register;
