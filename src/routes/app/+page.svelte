<script>
    import { fetch_api } from "$lib/utils";
    import * as Dialog from "@components/ui/dialog";
    import { Input } from "@components/ui/input";
    import { Button } from "@components/ui/button";
    import ServerButton from "@components/server-button.svelte";

    export let data;
    
    let error = "";
    let creating = "Create";

    async function createServer(e) {
        error = "";
        creating = "Creating…";

        if (e.target.name.value == "") {
            error = "Server name is required.";
            creating = "Create";
        } else {
            const res = await fetch_api("/api/server/create", {
                name: e.target.name.value
            });
            
            if (res.error) {
                error = res.error;
                creating = "Create";
            } else {
                window.location.href = `/app/${res.server}`;
            }
        }
    }
</script>

<svelte:head>
    <title>Home | Atom</title>
</svelte:head>

<div class = "flex items-center justify-center border-2 border-white my-2.5 px-1.5 py-1.5 ">
    <Dialog.Root>
        <Dialog.Trigger>
            <ServerButton name = "Create Server" />
        </Dialog.Trigger>
        <Dialog.Content>
            <Dialog.Header>
                <Dialog.Title>Create a Server</Dialog.Title>
                <Dialog.Description>Where you and your friends can hangout and chat.</Dialog.Description>
            </Dialog.Header>
            <form on:submit|preventDefault = {createServer} autoComplete = "off" class = "flex">
                <Input type = "text" name = "name" placeholder = "Server Name…" class = "mr-2" />
                <Button type = "submit">{creating}</Button>
            </form>
            <p class = "text-red-500 text-center">{error}</p>
        </Dialog.Content>
    </Dialog.Root>
    {#each data.user.joined as server}
        <a data-sveltekit-reload href = "/app/{server.id}">
            <ServerButton image = {server.image} name = {server.name} />
        </a>
    {/each}
</div>
<p class = "text-center">My Friends</p>