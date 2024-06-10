import { json } from "@sveltejs/kit";
import { sha256 } from "js-sha256";
import { db } from "$lib/postgres";
import { sendMail } from "$lib/nodemailer";

export async function POST({ request, cookies }) {
    const formData = await request.json();

    try {
        if (formData.username != "" && formData.password != "") {
            const user = await db`SELECT id, email, username FROM atom_users WHERE username = ${formData.username.toLowerCase()} AND password = ${sha256(formData.password)} AND role = 'user';`;
            
            if (user.length === 0) {
                return json({
                    error: "Something went wrong."
                });
            } else {
                cookies.set("sid", user[0].id, { path: "/" });
                
                sendMail({
                    sender: "no-reply (Atom Messenger)",
                    recipient: user[0].email,
                    subject: `Login Notification for ${user[0].email}`,
                    html: `<p style = "font-family: verdana;">Someone has logged into your Atom Messenger account, <u>${user[0].username}</u>. If this was not you, please contact us immediately.</p>`
                });
                
                return json({
                    success: true
                });
            }
        } else {
            return json({
                error: "Please fill in all fields"
            });
        }
    } catch (e) {
        return json({
            error: e.message
        });
    }
}