import { db } from "$lib/postgres";

export async function load({ params, cookies }) {
    try {
        const server = await db`SELECT * FROM atom_servers WHERE id = ${params.id};`;

        if (server[0].members.includes(cookies.get("sid")) == false) {
            const user = await db`SELECT alias, joined FROM atom_users WHERE id = ${cookies.get("sid")};`;
            const server = await db`SELECT id, members FROM atom_servers WHERE id = ${params.id};`;

            user[0].joined.push(server[0].id);
            server[0].members.push(cookies.get("sid"));

            await db`UPDATE atom_users SET joined = ${user[0].joined} WHERE id = ${cookies.get("sid")};`;
            await db`UPDATE atom_servers SET members = ${server[0].members} WHERE id = ${server[0].id};`;
        }

        server[0].messages = await Promise.all(await server[0].messages.map(async (msg) => {
            const parsedUser = await db`SELECT profile, alias FROM atom_users WHERE id = ${msg.author};`;
            return { profile: parsedUser[0].profile, author: parsedUser[0].alias, text: msg.text };
        }));

        server[0].members = await Promise.all(await server[0].members.map(async (member) => {
            const parsedUser = await db`SELECT profile, alias FROM atom_users WHERE id = ${member};`;
            return { profile: parsedUser[0].profile, alias: parsedUser[0].alias };
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