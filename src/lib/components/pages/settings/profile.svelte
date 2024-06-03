<script>
    import { fetch_api } from "$lib/utils";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Input } from "$lib/components/ui/input";

    export let user;

    // uploading a pfp
    async function uploadPfp(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = async () => {
            await fetch_api("/api/user/pfp", {
                id: user.id,
                image: reader.result
            });
        };
        reader.readAsDataURL(file);

        window.location.reload();
    }
</script>

<div class = "flex items-center my-5">
    <label for = "image">
        <img src = {user.profile} alt = "pfp" class = "w-[30px] h-[30px] rounded-[50px] cursor-pointer mr-2" />
    </label>
    <form on:change|preventDefault = {uploadPfp}>
        <input type = "file" name = "image" id = "image" accept = ".jpg, .jpeg, .png" class = "hidden" />
    </form>
    <p class = "text-xl">{user.username}</p>
</div>
<div class = "block mb-5">
    <p class = "font-bold text-muted-foreground text-sm">
        STATUS
    </p>
    <form on:change|preventDefault = {async (e) => await fetch_api("/api/user/status", { id: user.id, status: e.target.value })} autocomplete = "off">
        <Input type = "text" value = {user.status} placeholder = "my status…" />
    </form>
</div>
<div class = "block">
    <p class = "font-bold text-muted-foreground text-sm">
        BIO
    </p>
    <form on:change|preventDefault = {async (e) => await fetch_api("/api/user/bio", { id: user.id, bio: e.target.value })}>
        <Textarea type = "text" value = {user.bio} placeholder = "my bio…" />
    </form>
</div>