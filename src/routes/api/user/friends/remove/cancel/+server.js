import { json } from "@sveltejs/kit";
import { db } from "$lib/postgres";
import { sendMail } from "$lib/nodemailer";
import { PUBLIC_URL } from "$env/static/public";

export async function POST({ request, cookies }) {
    try {
        const formData = await request.json();

        const user = await db`SELECT id, username, incoming_requests, outgoing_requests FROM atom_users WHERE id = ${cookies.get("sid")};`;
        const friend = await db`SELECT id, email, incoming_requests, outgoing_requests FROM atom_users WHERE username = ${formData.friend};`;

        if (formData.side == "sender") {
            // person sending the request chooses to cancel
            user[0].outgoing_requests.splice(user[0].outgoing_requests.indexOf(friend[0].id), 1);
            friend[0].incoming_requests.splice(friend[0].incoming_requests.indexOf(user[0].id), 1);

            await db`UPDATE atom_users SET outgoing_requests = ${user[0].outgoing_requests} WHERE id = ${user[0].id};`;
            await db`UPDATE atom_users SET incoming_requests = ${friend[0].incoming_requests} WHERE id = ${friend[0].id};`;
        } else {
            // person receiving the request chooses to deny
            user[0].incoming_requests.splice(user[0].incoming_requests.indexOf(friend[0].id), 1);
            friend[0].outgoing_requests.splice(friend[0].outgoing_requests.indexOf(user[0].id), 1);

            await db`UPDATE atom_users SET incoming_requests = ${user[0].incoming_requests} WHERE id = ${user[0].id};`;
            await db`UPDATE atom_users SET outgoing_requests = ${friend[0].outgoing_requests} WHERE id = ${friend[0].id};`;

            sendMail({
                sender: "no-reply (Atom)",
                recipient: friend[0].email,
                subject: `${user[0].username} has denied your friend request`,
                html: `<p style = "font-family: verdana;"><a href = "${PUBLIC_URL}/u/${user[0].username}">${user[0].username}</a> denied your friend request. Better luck next time!</p>`
            });
        }

        return json({
            success: true
        });
    } catch (e) {
        console.log(e);

        return json({
            error: e.message
        });
    }
}