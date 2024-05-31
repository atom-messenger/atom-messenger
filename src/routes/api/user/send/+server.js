import { io } from "socket.io-client";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    const formData = await request.json();
    const socket = io("http://localhost:5173");

    socket.emit("message", {
        server: formData.server,
        author: formData.author,
        text: formData.text
    });

    return json({ success: true });
}