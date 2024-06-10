import { json } from "@sveltejs/kit";
import { db } from "$lib/postgres";

export async function POST({ request, cookies }) {
    try {
        const formData = await request.json();

        const user = await db`SELECT id, friends FROM atom_users WHERE id = ${cookies.get("sid")};`;
        const friend = await db`SELECT id, friends FROM atom_users WHERE username = ${formData.friend}`;

        // remove each other mutually from both users
        user[0].friends.splice(user[0].friends.indexOf(friend[0].id), 1);
        friend[0].friends.splice(friend[0].friends.indexOf(user[0].id), 1);

        // update user rows
        await db`UPDATE atom_users SET friends = ${user[0].friends} WHERE id = ${user[0].id};`;
        await db`UPDATE atom_users SET friends = ${friend[0].friends} WHERE id = ${friend[0].id};`;

        return json({
            success: true
        });
    } catch (e) {
        return json({
            error: e.message
        });
    }
}