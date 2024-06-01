import Pusher from "pusher";
import { json } from "@sveltejs/kit";
import { db } from "$lib/postgres"

export async function POST({ request }) {
    const formData = await request.json();

    const pusher = new Pusher({
        appId: "1811727",
        key: "587113dc1c1846385c6f",
        secret: "a2b3c996964aa1794490",
        cluster: "us3",
        useTLS: true
    });

    const author = await db`SELECT alias, profile FROM atom_users WHERE id = ${formData.author};`;

    pusher.trigger(`message_${formData.server}`, "message", {
        profile: author[0].profile,
        author: author[0].alias,
        text: formData.text
    });

    const server = await db`SELECT id, messages FROM atom_servers WHERE id = ${formData.server};`;
    server[0].messages.push({
        text: formData.text.replaceAll(`"`, `\"`),
        author: formData.author
    });

    await db`UPDATE atom_servers SET messages = ${server[0].messages} WHERE id = ${server[0].id};`;

    return json({ success: true });
}