import { json } from "@sveltejs/kit";
import { db } from "$lib/postgres";

export async function POST({ request, cookies }) {
    try {
        const formData = await request.json();

        const user = await db`SELECT id, joined FROM atom_users WHERE id = ${cookies.get("sid")};`;
        const server = await db`SELECT id, members FROM atom_servers WHERE id = ${formData.server};`;

        user[0].joined.splice(user[0].joined.indexOf(user[0].joined.find((s) => s == server[0].id)), 1);
        server[0].members.splice(server[0].members.indexOf(user[0].id), 1);

        await db`UPDATE atom_servers SET members = ${server[0].members} WHERE id = ${server[0].id};`;
        await db`UPDATE atom_users SET joined = ${user[0].joined} WHERE id = ${user[0].id};`;

        return json({
            success: true
        });
    } catch (e) {
        return json({
            error: e.message
        });
    }
}