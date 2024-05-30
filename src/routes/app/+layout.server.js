import { db } from "$lib/postgres";

export async function load({ cookies }) {
    const user = await db`SELECT * FROM atom_users WHERE id = ${cookies.get("sid")};`;

    user[0].joined = await Promise.all(await user[0].joined.map(async (server) => {
        const parsedServer = await db`SELECT id, name FROM atom_servers WHERE id = ${server};`;
        return { id: parsedServer[0].id, name: parsedServer[0].name };
    }));

    return {
        user: user[0]
    }
}