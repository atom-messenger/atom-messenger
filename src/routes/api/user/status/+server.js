import { json } from "@sveltejs/kit";
import { db } from "$lib/postgres";

export async function POST({ request }) {
    try {
        const formData = await request.json();

        await db`UPDATE atom_users SET status = ${formData.status} WHERE id = ${formData.id};`;

        return json({
            success: true
        });
    } catch (e) {
        return json({
            error: e.message
        });
    }
}