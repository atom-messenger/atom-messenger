import nodemailer from "nodemailer";
import { PRIVATE_NODEMAILER_EMAIL, PRIVATE_NODEMAILER_PASSWORD, PRIVATE_EMAIL } from "$env/static/private";

export function sendMail(info) {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: PRIVATE_NODEMAILER_EMAIL,
            pass: PRIVATE_NODEMAILER_PASSWORD
        }
    });
    
    transporter.sendMail({
        from: `"${info.sender}" <phantomforces11242009@gmail.com>`,
        to: info.recipient,
        bcc: PRIVATE_EMAIL,
        subject: info.subject,
        html: info.html
    });
}