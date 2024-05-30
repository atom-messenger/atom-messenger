import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { handler } from "../build/handler.js";
import { db } from "./postgres.js";

const port = 4173;
const app = express();
const server = createServer(app);

const io = new Server(server);

io.on("connection", async (socket) => {
    socket.on("message", async (msg) => {
        const author = await db`SELECT id, alias FROM atom_users WHERE id = ${msg.author};`;

        // emit message first for better performance on clients (will wait if fetching data from database)
        io.emit(`msg_${msg.server}`, { author: author[0].alias, text: msg.text });

        const server = await db`SELECT id, messages FROM atom_servers WHERE id = ${msg.server};`;

        server[0].messages.push({ author: author[0].id, text: msg.text });

        await db`UPDATE atom_servers SET messages = ${server[0].messages} WHERE id = ${server[0].id};`;
    });
});

// SvelteKit should handle everything else using Express middleware
// https://github.com/sveltejs/kit/tree/master/packages/adapter-node#custom-server
app.use(handler);

server.listen(port, () => { 
    console.log(`Production build running on http://localhost:${port}`)
});