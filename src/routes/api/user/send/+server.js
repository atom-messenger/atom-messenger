import { json } from "@sveltejs/kit";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { db } from "$lib/postgres"
import { PRIVATE_CRYPTO_KEY } from "$env/static/private";

export async function POST({ request }) {
    const formData = await request.json();

    const server = await db`SELECT id, messages FROM atom_servers WHERE id = ${formData.server};`;

    await db`UPDATE atom_servers SET messages = ${[{
        id: uuidv4(),
        type: "text",
        text: CryptoJS.AES.encrypt(formData.text.replaceAll(`"`, `\"`), PRIVATE_CRYPTO_KEY).toString(),
        author: formData.author
    }, ...server[0].messages]} WHERE id = ${server[0].id};`;

    return json({
        success: true
    });
}