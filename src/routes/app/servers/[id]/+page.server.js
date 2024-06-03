import { db } from "$lib/postgres";

export async function load({ params, cookies }) {
    try {
        const server = await db`SELECT id, image, name, owner, members, messages FROM atom_servers WHERE id = ${params.id};`;

        if (server[0].members.includes(cookies.get("sid")) == false) {
            const user = await db`SELECT username, joined FROM atom_users WHERE id = ${cookies.get("sid")};`;

            user[0].joined.push(server[0].id);
            server[0].members.push(cookies.get("sid"));

            await db`UPDATE atom_users SET joined = ${user[0].joined} WHERE id = ${cookies.get("sid")};`;
            await db`UPDATE atom_servers SET members = ${server[0].members} WHERE id = ${server[0].id};`;
        }

        server[0].messages = await Promise.all(await server[0].messages.map(async (msg) => {
            const parsedUser = await db`SELECT profile, username FROM atom_users WHERE id = ${msg.author};`;
            return { ...parsedUser[0], text: msg.text };
        }));

        server[0].members = await Promise.all(await server[0].members.map(async (member) => {
            const parsedUser = await db`SELECT profile, display_name, status, bio, username FROM atom_users WHERE id = ${member};`;
            return parsedUser[0];
        }));
        
        return {
            server: server[0]
        }
    } catch (e) {
        return {
            server: null
        }
    }
}