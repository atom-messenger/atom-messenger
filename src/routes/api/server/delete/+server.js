import { json } from "@sveltejs/kit";
import { db } from "$lib/postgres";

export async function POST({ request, cookies }) {
    const formData = await request.json();

    const server = await db`SELECT id, owner, members FROM atom_servers WHERE id = ${formData.server};`;

    if (server.length === 0) {
        return json({ error: "Server does not exist" });
    } else if (server[0].owner !== cookies.get("sid")) {
        return json({ error: "You do not own this server" });
    } else {
        // Delete server
        server[0].members.forEach(async member => {
            const user = await db`SELECT id, joined FROM atom_users WHERE id = ${member};`;
            user[0].joined.splice(user[0].joined.indexOf(server[0].id), 1);
            await db`UPDATE atom_users SET joined = ${user[0].joined} WHERE id = ${user[0].id};`
        });

        await db`DELETE FROM atom_servers WHERE id = ${server[0].id};`;

        return json({ success: true })
    }
}