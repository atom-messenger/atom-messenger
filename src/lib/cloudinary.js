import { v2 as cloudinary } from "cloudinary";
import { v4 as uuidv4 } from "uuid";
import fs from "node:fs";
import { PRIVATE_CLOUDINARY_CLOUD_NAME, PRIVATE_CLOUDINARY_API_KEY, PRIVATE_CLOUDINARY_API_SECRET } from "$env/static/private";

cloudinary.config({
    cloud_name: PRIVATE_CLOUDINARY_CLOUD_NAME,
    api_key: PRIVATE_CLOUDINARY_API_KEY,
    api_secret: PRIVATE_CLOUDINARY_API_SECRET
});

export async function upload(image) {
    let img = image;
    img = img.replace(/^data:image\/\w+;base64,/, "");
    img = Buffer.from(img, "base64");

    let id = uuidv4()
    
    fs.writeFileSync(`static/profiles/${id}.jpg`, img, "utf-8");
    
    let res = cloudinary.uploader.upload(`static/profiles/${id}.jpg`, { public_id: id });
    res = await res;

    fs.unlinkSync(`static/profiles/${id}.jpg`);
    
    return res.secure_url;
}