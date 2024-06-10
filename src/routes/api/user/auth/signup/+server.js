import { json } from "@sveltejs/kit";
import { sha256 } from "js-sha256";
import { v4 as uuidv4 } from "uuid";
import { db } from "$lib/postgres";
import { sendMail } from "$lib/nodemailer";
import { PRIVATE_INVITE_KEY } from "$env/static/private";
import { PUBLIC_URL } from "$env/static/public";

export async function POST({ request }) {
    const formData = await request.json();

    try {
        if (formData.email == "" || formData.username == "" || formData.password == "" || formData.confirmPassword == "") {
            return json({
                error: "Please fill in all fields"
            });
        } else {
            const username = await db`SELECT username FROM atom_users WHERE username = ${formData.username.toLowerCase()};`;
            const email = await db`SELECT email FROM atom_users WHERE email = ${formData.email.toLowerCase()};`;

            if (username.length !== 0) {
                return json({
                    error: "Username is already in use."
                });
            } else if (email.length !== 0) {
                return json({
                    error: "Email is already in use."
                });
            } else if (formData.password != formData.confirmPassword) {
                return json({
                    error: "Passwords do not match."
                });
            } else if (formData.earlyAccess != PRIVATE_INVITE_KEY){
                return json({
                    error: "Invalid early access code."
                });
            } else {
                const id = uuidv4();

                await db`INSERT INTO atom_users (id, email, username, password, role) VALUES(${id}, ${formData.email.toLowerCase()}, ${formData.username.toLowerCase()}, ${sha256(formData.password)}, 'pending');`;
                
                sendMail({
                    sender: "no-reply (Atom)",
                    recipient: formData.email.toLowerCase(),
                    subject: `Sign Up at Atom for ${formData.email.toLowerCase()}`,
                    html: `<p style = "font-family: verdana;">Your email was used to sign up for an Atom account. Please click <a href = "${PUBLIC_URL}/v?id=${id}">here<a/> to verify your email to your account.<br><br>If this wasn't you, please ignore this email.</p>`
                });
                
                return json({
                    success: true
                });
            }
        }
    } catch (e) {
        return json({
            error: e.message
        });
    }
}