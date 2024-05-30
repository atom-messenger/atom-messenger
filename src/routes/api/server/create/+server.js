import { json } from "@sveltejs/kit";
import { v4 as uuidv4 } from "uuid";
import { db } from "$lib/postgres";

export async function POST({ request, cookies }) {
    try {
        const formData = await request.json();

        const id = uuidv4();
        await db`INSERT INTO atom_servers (id, name, owner) VALUES (${id}, ${formData.name}, ${cookies.get("sid")});`;

        return json({ server: id });
    } catch (e) {
        return json({ error: e.message });
    }
}