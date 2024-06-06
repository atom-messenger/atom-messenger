import { sveltekit } from "@sveltejs/kit/vite";
import { Server } from "socket.io";
import { defineConfig } from "vite";
import { db } from "./server/postgres.js";

const webSocketServer = {
	name: "webSocketServer",
	configureServer(server) {
		if (!server.httpServer) return

		const io = new Server(server.httpServer)

		io.on("connection", socket => {
			socket.on("message", async msg => {
				const user = await db`SELECT profile, username FROM atom_users WHERE id = ${msg.author};`;

				socket.emit(`message_${msg.server}`, {
					// broadcast message back to all clients
					profile: user[0].profile,
					username: user[0].username,
					text: msg.text
				})
			});
		});
	}
}

export default defineConfig({
	plugins: [sveltekit(), webSocketServer]
})
