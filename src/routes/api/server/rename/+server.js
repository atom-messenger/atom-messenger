import { json } from "@sveltejs/kit";
import { db } from "$lib/postgres";

export async function POST({ request, cookies }) {
    try {
        const formData = await request.json();

        const server = await db`SELECT owner FROM atom_servers WHERE id = ${formData.server};`;

        if (server[0].owner == cookies.get("sid")) {
            await db`UPDATE atom_servers SET name = ${formData.name} WHERE id = ${formData.server};`;

            return json({ success: true });
        } else {
            return json({ error: "You are not the server owner." });
        }
    } catch (e) {
        return json({ error: e.message });
    }
}