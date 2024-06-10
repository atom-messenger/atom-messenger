import axios from "axios";
import { json, redirect } from "@sveltejs/kit";
import { db } from "$lib/postgres";
import { PRIVATE_DISCORD_CLIENT_ID, PRIVATE_DISCORD_CLIENT_SECRET } from "$env/static/private";
import { PUBLIC_URL } from "$env/static/public";

export async function GET({ url, cookies }) {
    if (url.searchParams.get("code")) {
        const formData = new URLSearchParams({
            client_id: PRIVATE_DISCORD_CLIENT_ID,
            client_secret: PRIVATE_DISCORD_CLIENT_SECRET,
            grant_type: "authorization_code",
            code: url.searchParams.get("code"),
            redirect_uri: `${PUBLIC_URL}/api/user/auth/discord/login`,
        });

        const output = await axios.post("https://discord.com/api/v10/oauth2/token", formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        if (output.data) {
            const access = output.data.access_token;

            const userInfo = await axios.get("https://discord.com/api/v10/users/@me", {
                headers: {
                    "Authorization": `Bearer ${access}`
                }
            });

            const user = await db`SELECT id FROM atom_users WHERE email = ${userInfo.data.email.toLowerCase()};`;

            cookies.set("sid", user[0].id, { path: "/" });

            redirect(302, "/");
        }

        return json({
            code: url.searchParams.get("code")
        });
    } else {
        return json({
            error: "No code was provided"
        });
    }
}