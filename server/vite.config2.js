import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { websocket } from "@ubermanu/sveltekit-websocket/vite";

/*const webSocketServer = {
	name: "webSocketServer",
	async configureServer(server) {
		if (!server.httpServer) return;
		const io = new Server(server.httpServer)

		io.on("connection", (socket) => {
			socket.on("test", () => {
				console.log("received");
			})
			socket.on("message", async (msg) => {
				const author = await db`SELECT id, alias FROM atom_users WHERE id = ${msg.author};`;

				// emit message first for better performance on clients (will wait if fetching data from database)
				io.emit(`msg_${msg.server}`, { author: author[0].alias, text: msg.text });

				const server = await db`SELECT id, messages FROM atom_servers WHERE id = ${msg.server};`;

				server[0].messages.push({ author: author[0].id, text: msg.text });

				await db`UPDATE atom_servers SET messages = ${server[0].messages} WHERE id = ${server[0].id};`;
			});
		});

	}
}*/

export default defineConfig({
	plugins: [sveltekit(), websocket()]
});