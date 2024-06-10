import { db } from "$lib/postgres";

export async function load({ cookies }) {
    const user = await db`SELECT * FROM atom_users WHERE id = ${cookies.get("sid")};`;

    user[0].joined = await Promise.all(await user[0].joined.map(async (server) => {
        try {
            const parsedServer = await db`SELECT id, image, name FROM atom_servers WHERE id = ${server};`;
            return {
                id: parsedServer[0].id,
                image: parsedServer[0].image,
                name: parsedServer[0].name
            }
        } catch (e) {
            e;
        }
    }));

    // parse all friends from ids to usernames
    user[0].friends = await Promise.all(await user[0].friends.map(async (u) => {
        const parsedUser = await db`SELECT username FROM atom_users WHERE id = ${u};`;

        return parsedUser[0].username;
    }));

    // parse users from outgoing reuqests
    user[0].outgoing_requests = await Promise.all(await user[0].outgoing_requests.map(async (u) => {
        const parsedUser = await db`SELECT username FROM atom_users WHERE id = ${u};`;

        return parsedUser[0].username;
    }));

    // parse users from incoming requests
    user[0].incoming_requests = await Promise.all(await user[0].incoming_requests.map(async (u) => {
        const parsedUser = await db`SELECT username FROM atom_users WHERE id = ${u};`;

        return parsedUser[0].username;
    }));

    return {
        user: user[0],
        main: "w-full h-full overflow-auto",
        side: "lg:mx-7 lg:my-0 my-5 overflow-auto"
    }
}