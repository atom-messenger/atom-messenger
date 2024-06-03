import { redirect } from "@sveltejs/kit";
import { db } from "$lib/postgres";

export async function load({ cookies, url }) {
    if (!url.searchParams.get("page")) {
        redirect(302, "?page=account");
    }

    return {
        page: url.searchParams.get("page")
    }
}