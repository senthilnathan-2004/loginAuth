
  import {  toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { useRef, useState } from "react";
  import { ToastContainer } from 'react-toastify';
  import { useNavigate } from 'react-router-dom';

  // eslint-disable-next-line react/prop-types
      const Verify = ({token}) => {
      const navigate = useNavigate()
      const otpLength = 6;
      const [otp, setOtp] = useState(Array(otpLength).fill(""));
      const inputRefs = useRef([]);
    
      const handleChange = (index, e) => {
        const value = e.target.value;
        if (!/^\d?$/.test(value)) return;
    
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    
        if (value && index < otpLength - 1) {
          inputRefs.current[index + 1].focus();
        }
      };
    
      const handleBackspace = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
          inputRefs.current[index - 1].focus();
        }
      };
    
      const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").split("");
        const newOtp = [...otp];
    
        pastedData.forEach((digit, i) => {
          if (i < otpLength) {
            newOtp[i] = digit;
          }
        });
    
        setOtp(newOtp);
        inputRefs.current[Math.min(pastedData.length, otpLength) - 1]?.focus();
      };
      
     async function otpSubmit(){
        const postOtp =otp.join("")
        console.log(postOtp)
        const URL = "http://localhost:3000/api/user/verify";
        if(!otp){
          toast.error("Please enter otp", {
            position: "bottom-right",
          });
          return
        }

        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            otp:postOtp,
            token
          }),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
          toast.error(data.message, {
            position: "bottom-right",
          });
          return
        }
        navigate("/")
      }
      return (
        <div className="otp-container1">
        <div className="otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              className="otp-input"
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleBackspace(index, e)}
              onPaste={handlePaste}
            />
          ))}
          
           </div>
           <button onClick={otpSubmit} className="loginButton">Continue</button>
           <ToastContainer />
         </div>
      );
    };
  
export default Verify