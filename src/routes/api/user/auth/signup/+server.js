import { json } from "@sveltejs/kit";
import { sha256 } from "js-sha256";
import { v4 as uuidv4 } from "uuid";
import { db } from "$lib/postgres";

export async function POST({ request, cookies }) {
    const formData = await request.json();

    try {
        if (formData.email == "" || formData.username == "" || formData.password == "" || formData.confirmPassword == "") {
            return json({ error: "Please fill in all fields" });
        } else {
            const username = await db`SELECT username FROM atom_users WHERE username = ${formData.username.toLowerCase()};`;
            const email = await db`SELECT email FROM atom_users WHERE email = ${formData.email.toLowerCase()};`;

            if (username.length !== 0) {
                return json({ error: "Username is already in use." });
            } else if (email.length !== 0) {
                return json({ error: "Email is already in use." });
            } else if (formData.password != formData.confirmPassword) {
                return json({ error: "Passwords do not match." });
            } else if (formData.earlyAccess != "dqtkplon99825"){
                return json({ error: "Invalid early access code." });
            } else {
                const id = uuidv4();

                await db`INSERT INTO atom_users (id, email, username, password) VALUES(${id}, ${formData.email}, ${formData.username}, ${sha256(formData.password)});`;

                cookies.set("sid", id, { path: "/" });
                
                return json({ success: true });
            }
        }
    } catch (e) {
        return json({ error: e.message });
    }
}