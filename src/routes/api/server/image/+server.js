import { json } from "@sveltejs/kit";
import { upload } from "$lib/cloudinary";
import { db } from "$lib/postgres";

export async function POST({ request }) {
    try {
        const formData = await request.json();

        await db`UPDATE atom_servers SET image = ${await upload(formData.image)} WHERE id = ${formData.server}`;

        return json({
            success: true
        });
    } catch (e) {
        return json({
            error: e.message
        });
    }
}