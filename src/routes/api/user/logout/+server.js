import { json } from "@sveltejs/kit";

export function GET({ cookies }) {
    cookies.delete("sid", { path: "/" });
    return json({ loggedOut: true });
}