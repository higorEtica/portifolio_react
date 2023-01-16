import express from 'express';
import { Router } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use("/",Router);

app.listen(port,() => console.log(`Server Running in port ${port}`));

const contactEmail = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});

contactEmail.verify((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Ready to Send");
    }
});

Router.post("/contact",(req,res)=>{
    const contactNew = {...req.body}

    const mail = {
        from: contactNew.firstName,
        to:process.env.EMAIL_USER,
        subject:"Contact Form Submission - Portfolio",
        html:`        <p>Name: ${contactNew.firstName}</p>
        <p>Email: ${contactNew.email}</p>
        <p>Phone: ${contactNew.phone}</p>
        <p>Message: ${contactNew.message}</p>`
    };

    contactEmail.sendMail(mail,(error) =>{
        if(error){
            res.json(error);
        }else {
            res.json({code:200,status:"Message send"})
        }
    });
});


