import { json } from "@sveltejs/kit";
import { db } from "$lib/postgres";
import { sendMail } from "$lib/nodemailer";
import { PUBLIC_URL } from "$env/static/public";

export async function POST({ request, cookies }) {
    try {
        const formData = await request.json();

        if (formData.friend == "") {
            return json({
                error: "Please fill in a username."
            });
        } else {
            const user = await db`SELECT id, username, outgoing_requests FROM atom_users WHERE id = ${cookies.get("sid")};`;
            const friend = await db`SELECT id, email, username, incoming_requests FROM atom_users WHERE username = ${formData.friend};`;

            if (friend.length === 0) {
                return json({
                    error: "User does not exist."
                });
            } else if (user[0].id == friend[0].id) {
                return json({
                    error: "You cannot add yourself."
                });
            } else if (user[0].outgoing_requests.includes(friend[0].id)) {
                return json({
                    error: "Friend request already sent."
                });
            } else {
                if (friend[0].incoming_requests.includes(user[0].id)) {
                    return json({
                        error: "Friend request already sent"
                    });
                } else {
                    await db`UPDATE atom_users SET outgoing_requests = ${[ friend[0].id, ...user[0].outgoing_requests ]} WHERE id = ${user[0].id};`;
                    await db`UPDATE atom_users SET incoming_requests = ${[ user[0].id, ...friend[0].incoming_requests ]} WHERE id = ${friend[0].id};`;
    
                    sendMail({
                        sender: "no-reply (Atom)",
                        recipient: friend[0].email,
                        subject: `${user[0].username} has requested to be your friend!`,
                        html: `<p style = "font-family: verdana;">Go to your <a href = "${PUBLIC_URL}/app">Atom dashboard</a> to accept their friend request!</p>`
                    });

                    return json({
                        success: "Friend request sent."
                    });
                }
            }
        }
    } catch (e) {
        return json({
            error: e.message
        });
    }
}