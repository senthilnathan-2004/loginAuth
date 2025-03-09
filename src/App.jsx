import './App.css'
import {useState} from "react"
import {ClipLoader} from 'react-spinners'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Allroute from './router/Allroute';
import { useNavigate } from 'react-router-dom';

function App() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [pass,setPass] = useState('')
  const [button,setButton] =useState('Sign up')
  const [token,setToken]=useState('')
  const navigate = useNavigate()

  
 
  const postLogin = async () => {
    const URL = "http://localhost:3000/api/user/register";
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const length = 5;

    // Input validation
    if (!name || !email || !pass ) {
      toast.error("Please fill in all fields", {
        position: "bottom-right",
      });
      return;
    }
    if (!(pattern.test(email))) {
      toast.error("Invalid email", {
        position: "bottom-right",
      });  
      return; 
    }
    if(pass.length <= length ){
      toast.error("Password length minimum 6 digit", {
        position: "bottom-right",
      }); 
      return;
    }
    if(pass.length >= 10 ){
      toast.error("Password length maximum 10 digit", {
        position: "bottom-right",
      }); 
      return;
    }

    try {
      setButton(<ClipLoader color='white' size={30}/>)
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email:email.toLowerCase(),
          password: pass,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        toast.error(data.message, {
          position: "bottom-right",
        });
        setButton('Sign up')
        return
      }
      setToken(data.token)

      toast.success("Check Your Email", {
        position: "top-right",
      });

      setButton('Sign up')
      setEmail("")
      setName("")
      setPass("")

      //change route
       navigate('/verify')
       

    } catch (err) {
      console.error(err.message);
      toast.error("Login failed. Please try again.", {
        position: "bottom-right",
      });
      setButton('Sign up')
    }
  };
  

  return (
    <>
      <Allroute
     
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      pass={pass}
      setPass={setPass}
      postLogin={postLogin}  
      button={button}  
      token={token}
      />
    </>
  )
}

export default App
