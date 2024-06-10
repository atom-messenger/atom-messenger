import { json } from "@sveltejs/kit";
import { db } from "$lib/postgres";

export async function POST({ request, cookies }) {
    try {
        const formData = await request.json();

        const user = await db`SELECT id, username, incoming_requests, friends FROM atom_users WHERE id = ${cookies.get("sid")};`;
        const friend = await db`SELECT id, outgoing_requests, friends FROM atom_users WHERE username = ${formData.friend};`;

        user[0].incoming_requests.splice(user[0].incoming_requests.indexOf(friend[0].id), 1);
        friend[0].outgoing_requests.splice(friend[0].outgoing_requests.indexOf(user[0].id), 1);

        // update the user after accepting friend request
        await db`UPDATE atom_users SET incoming_requests = ${user[0].incoming_requests}, friends = ${[friend[0].id, ...user[0].friends]} WHERE id = ${user[0].id};`;

        // update the friend after accepting friend request
        await db`UPDATE atom_users SET outgoing_requests = ${friend[0].outgoing_requests}, friends = ${[user[0].id, ...friend[0].friends]} WHERE id = ${friend[0].id};`;

        return json({
            success: true
        });
    } catch (e) {
        return json({
            error: e.message
        });
    }
}