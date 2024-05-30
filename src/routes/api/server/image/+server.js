import { v4 as uuidv4 } from "uuid";
import fs from "node:fs";
import { upload_to_cloud } from "$lib/cloudinary";
import { db } from "$lib/postgres";

export async function POST({ request }) {
    const formData = await request.json();

    let img = formData.image;
    img = img.replace(/^data:image\/\w+;base64,/, "");
    img = Buffer.from(img, 'base64');

    let id = uuidv4()
    
    fs.writeFileSync(`static/profiles/${id}.jpg`, img, "utf-8");

    const uploaded = await upload_to_cloud(`static/profiles/${id}.jpg`, id);

    await db`UPDATE atom_servers SET image = ${uploaded} WHERE id = ${formData.server}`;

    return new Response("uploaded an image!!");
}