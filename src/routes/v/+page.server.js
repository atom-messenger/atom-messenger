import { redirect } from "@sveltejs/kit";
import { db } from "$lib/postgres";

export async function load({ url, cookies }) {
    try {
        const newUser = await db`SELECT id FROM atom_users WHERE id = ${url.searchParams.get("id")} AND role = 'pending';`;

        await db`UPDATE atom_users SET role = 'user' WHERE id = ${newUser[0].id};`;

        cookies.set("sid", newUser[0].id, { path: "/" });

        redirect(302, "/app");
    } catch (e) {
        redirect(302, "/")
    }
}