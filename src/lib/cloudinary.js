import { v2 as cloudinary } from "cloudinary";
import { PRIVATE_CLOUDINARY_CLOUD_NAME, PRIVATE_CLOUDINARY_API_KEY, PRIVATE_CLOUDINARY_API_SECRET } from "$env/static/private";

cloudinary.config({
    cloud_name: PRIVATE_CLOUDINARY_CLOUD_NAME,
    api_key: PRIVATE_CLOUDINARY_API_KEY,
    api_secret: PRIVATE_CLOUDINARY_API_SECRET
});


export async function upload_to_cloud(url, id) {    
    let res = cloudinary.uploader.upload(url, { public_id: id });
    res = await res;
    
    return res.url;
}