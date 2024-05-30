import { json } from "@sveltejs/kit";
import { sha256 } from "js-sha256";
import { db } from "$lib/postgres";

export async function POST({ request, cookies }) {
    const formData = await request.json();

    try {
        if (formData.alias != "" && formData.password != "") {
            const user = await db`SELECT * FROM atom_users WHERE alias = ${formData.alias} AND password = ${sha256(formData.password)};`;
            
            if (user.length === 0) {
                return json({ error: "Something went wrong." });
            } else {
                cookies.set("sid", user[0].id, { path: "/" });
                return json({ success: true });
            }
        } else {
            return json({ error: "Please fill in all fields" });
        }
    } catch (e) {
        return json({ error: e.message });
    }
}