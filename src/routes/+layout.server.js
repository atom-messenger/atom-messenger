import { redirect } from "@sveltejs/kit";
import { db } from "$lib/postgres";

// custom middleware
export async function load({ url, cookies }) {
    if (cookies.get("sid")) {
        const user = await db`SELECT * FROM atom_users WHERE id = ${cookies.get("sid")};`;

        if (user.length === 0 && url.pathname != "/" && url.pathname != "/login") {
            redirect(302, "/login");
        } else if (url.pathname == "/") {
            redirect(302, "/app");
        } else {
            return {
                user: user[0]
            }
        }
    } else if (url.pathname != "/" && url.pathname != "/login") {
        redirect(302, "/login");
    }
}