import { createTransport } from "nodemailer"


const sendMail = async (email,subject,text)=>{
    const transport = createTransport({
        host:"smtp.gmail.com",
        port: 587, 
        secure: false,  
        auth:{
            user:process.env.MAIL,
            pass:process.env.PASS,
    
        }
    })
    await transport.sendMail({
        from:process.env.MAIL,
        to:email,
        subject,
        text,
    })
}
export default sendMail