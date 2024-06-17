import { json } from "@sveltejs/kit";
import { v4 as uuidv4 } from "uuid";
import { db } from "$lib/postgres";

export async function POST({ request, cookies }) {
    try {
        const formData = await request.json();

        const id = uuidv4();

        if (formData.name.endsWith(" ")) {
            return json({
                error: "Server name cannot end with a space."
            });
        }

        const user = await db`SELECT id, joined FROM atom_users WHERE id = ${cookies.get("sid")};`;

        await db`INSERT INTO atom_servers (id, name, owner, members) VALUES (${id}, ${formData.name}, ${user[0].id}, ${[ user[0].id ]});`;
        await db`UPDATE atom_users SET joined = ${[ id, ...user[0].joined ]} WHERE id = ${user[0].id};`;

        return json({
            success: true
        });
    } catch (e) {
        console.log(e);

        return json({
            error: e.message
        });
    }
}