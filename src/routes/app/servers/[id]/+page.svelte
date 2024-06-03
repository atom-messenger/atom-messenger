<script>
    import { onMount } from "svelte";
    import Pusher from "pusher-js";
    import { fetch_api } from "$lib/utils";
    import Error from "@components/pages/404.svelte";
    import { Button } from "@components/ui/button";
    import { Input } from "@components/ui/input";
    import * as Card from "@components/ui/card";
    import * as DropdownMenu from "@components/ui/dropdown-menu";
    import * as Sheet from "@components/ui/sheet";
    import * as Tooltip from "$lib/components/ui/tooltip";

    export let data;

    let messages = data.server ? [...data.server.messages] : []
    let error = "";
    let settingPage = false;

    // scrolling to the bottom of the feed and lisetening for new messages
    onMount(() => {
        document.getElementById("feed").scrollTop = document.getElementById("feed").scrollHeight;

        const pusher = new Pusher("587113dc1c1846385c6f", {
            cluster: "us3"
        });

        const channel = pusher.subscribe(`message_${data.server.id}`);

        channel.bind("message", function(msg) {
            messages.push(msg);
            messages = messages;

            const feedElement = document.getElementById("feed");
            const observer = new MutationObserver(() => {
                feedElement.scrollTop = feedElement.scrollHeight;
            });
            observer.observe(feedElement, { childList: true });
        });
    });

    // send a message to the server
    async function send(e) {
        await fetch_api("/api/user/send", {
            server: data.server.id,
            author: data.user.id,
            text: e.target.message.value
        });

        e.target.message.value = "";
    }

    // leaving a server if user isn't the owner
    async function leave() {
        if (data.server.owner == data.user.id) {
            alert("You can't leave your own server!");
        } else {
            await fetch_api("/api/server/leave", {
                server: data.server.id
            }, "/");
        }
    }

    // uploading an image for the server
    async function uploadImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = async () => {
            await fetch_api("/api/server/image", {
                server: data.server.id,
                image: reader.result
            });
        };
        reader.readAsDataURL(file);

        window.location.reload();
    }
</script>

<svelte:head>
    <title>Atom | {data.server != null ? data.server.name : "Server Not Found"}</title>
</svelte:head>

{#if data.server == null}
    <Card.Root class = "{data.main} mr-7">
        <Error />
    </Card.Root>
{:else}
<Card.Root class = {data.main}>
    <Card.Header>
        <Card.Title class = "flex items-center">
            {#if settingPage == false}
                <span class = "mr-auto">{data.server.name}</span>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <svg xmlns = "http://www.w3.org/2000/svg" width = "24" height = "24" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round">
                            <path stroke = "none" d = "M0 0h24v24H0z" fill = "none" />
                            <path d = "M4 6l16 0" />
                            <path d = "M4 12l16 0" />
                            <path d = "M4 18l16 0" />
                        </svg>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item>
                            Invite
                            <svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round" class = "ml-auto">
                                <path stroke = "none" d = "M0 0h24v24H0z" fill = "none" />
                                <path d = "M5 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                <path d = "M3 21v-2a4 4 0 0 1 4 -4h4c.96 0 1.84 .338 2.53 .901" />
                                <path d = "M16 3.13a4 4 0 0 1 0 7.75" />
                                <path d = "M16 19h6" />
                                <path d = "M19 16v6" />
                            </svg>
                        </DropdownMenu.Item>
                        {#if data.server.owner == data.user.id}
                            <DropdownMenu.Item on:click = {() => settingPage = true}>
                                Settings
                                <svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round" class = "ml-auto">
                                    <path stroke = "none" d = "M0 0h24v24H0z" fill = "none" />
                                    <path d = "M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                                    <path d = "M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                </svg>
                            </DropdownMenu.Item>
                        {:else}
                            <DropdownMenu.Item on:click = {leave} class = "text-red-500">
                                Leave
                                <svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round" class = "ml-auto">
                                    <path stroke = "none" d = "M0 0h24v24H0z" fill = "none" />
                                    <path d = "M13 12v.01" />
                                    <path d = "M3 21h18" />
                                    <path d = "M5 21v-16a2 2 0 0 1 2 -2h7.5m2.5 10.5v7.5" />
                                    <path d = "M14 7h7m-3 -3l3 3l-3 3" />
                                </svg>
                            </DropdownMenu.Item>
                        {/if}
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            {:else}
                Server Overview
                <Button variant = "secondary" on:click = {() => settingPage = false} class = "ml-auto">Go Back</Button>
            {/if}
        </Card.Title>
    </Card.Header>
    <Card.Content>
        {#if settingPage == false}
            <div id = "feed" class = "overflow-auto border rounded px-2.5 py-2.5 h-[60vh] mb-5">
                {#each messages as msg}
                    <div class = "flex w-full mb-1 h-fit px-2.5 py-2.5 rounded hover:bg-secondary">
                        <img src = {msg.profile} alt = "User Profile" class = "w-[25px] h-[25px] rounded-[50px] mr-2" />
                        <div class = "block mr-auto">
                            <p class = "text-muted-foreground">{msg.username}</p>
                            {msg.text}
                        </div>
                        <DropdownMenu.Root>
                            <DropdownMenu.Trigger>
                                <svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round">
                                    <path stroke = "none" d = "M0 0h24v24H0z" fill = "none" />
                                    <path d = "M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                                    <path d = "M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                                    <path d = "M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                                </svg>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                <DropdownMenu.Item>Copy Message ID</DropdownMenu.Item>
                                {#if data.server.owner == data.user.id}
                                    <DropdownMenu.Item class = "text-red-500">Delete Message</DropdownMenu.Item>
                                {/if}
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </div>
                {/each}
            </div>
            <p class = "text-red-500 mb-2">{error}</p>
            <form on:submit|preventDefault = {send} autoComplete = "off" class = "flex items-center m-auto">
                <Input name = "message" placeholder = {`Message ${data.server.name}…`} class = "mr-2" />
                <Button type = "submit" variant = "secondary">
                    <svg xmlns = "http://www.w3.org/2000/svg" width = "20" height = "20" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round">
                        <path stroke = "none" d = "M0 0h24v24H0z" fill = "none" />
                        <path d = "M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
                        <path d = "M6.5 12h14.5" />
                    </svg>
                </Button>
            </form>
        {:else}
            <div class = "flex items-center">
                <label for = "image">
                    {#if data.server.image == "none"}
                        <div class = "w-[60px] h-[60px] text-2xl rounded-[50px] bg-muted mr-1 flex items-center justify-center text-secondary-foreground duration-100 cursor-pointer">
                            {data.server.name[0].toUpperCase()}
                        </div>
                    {:else}
                        <img src = {data.server.image} alt = "{data.server.name}_image" class = "w-[50px] h-[50px] rounded-[50px] object-cover mr-1 cursor-pointer" />
                    {/if}
                </label>
                <form on:change|preventDefault = {uploadImage}>
                    <input type = "file" name = "image" id = "image" accept = ".jpg, .jpeg, .png" class = "hidden" />
                </form>
                <div class = "block ml-2.5">
                    <form on:change|preventDefault = {async (e) => await fetch_api("/api/server/rename", { server: data.server.id, name: e.target.value }, `/app/servers/${data.server.id}`)}>
                        <Input type = "text" value = {data.server.name} class = "text-lg w-fit" />
                    </form>
                    <p class = "text-muted-foreground mt-1">
                        {data.server.members.length} Member{data.server.members.length == 1 ? "" : "s"}
                        <span class = "mx-2.5">|</span>
                        {data.server.messages.length} Message{data.server.messages.length == 1 ? "" : "s"}
                    </p>
                </div>
            </div>
            <div class = "border-2 border-red-500 mt-16 p-10 rounded">
                <h1 class = "text-xl text-red-500 mb-5">Danger Zone</h1>
                <div class = "sm:flex sm:items-center block">
                    <Button on:click = {async () => await fetch_api("/api/server/delete", { server: data.server.id }, "/")} variant = "destructive">
                        Delete Server
                    </Button>
                    <Button on:click = {async () => await fetch_api("/api/server/purge", { server: data.server.id }, `/app/servers/${data.server.id}`)} variant = "destructive" class = "sm:ml-2 sm:mt-0 mt-5">
                        Purge Messages
                    </Button>
                </div>
            </div>
        {/if}
    </Card.Content>
</Card.Root>
<Card.Root class = "lg:w-56 {data.side}">
    <Card.Header>
        <Card.Title class = "flex items-center">
            <span class = "lg:block hidden">Members</span>
            <svg xmlns = "http://www.w3.org/2000/svg" width = "20" height = "20" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round" class = "lg:ml-auto lg:m-0 m-auto">
                <path stroke = "none" d = "M0 0h24v24H0z" fill = "none" />
                <path d = "M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d = "M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                <path d = "M16 3.13a4 4 0 0 1 0 7.75" />
                <path d = "M21 21v-2a4 4 0 0 0 -3 -3.85" />
            </svg>
        </Card.Title>
        <Card.Description class = "lg:text-left text-center">
            {data.server.members.length} Member{data.server.members.length == 1 ? "" : "s"}
        </Card.Description>
    </Card.Header>
    <Card.Content>
        {#each data.server.members as member}
            <Sheet.Root>
                <Sheet.Trigger>
                    <Tooltip.Root>
                        <Tooltip.Trigger>
                            <div class = "flex items-center hover:text-muted-foreground duration-100">
                                <img src = {member.profile} alt = "pfp" class = "w-[20px] h-[20px] rounded-[50px] border mr-1" />
                                <p>
                                    {member.display_name ? member.display_name : member.username}
                                </p>
                            </div>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                            {member.status ? member.status : "No status available"}
                        </Tooltip.Content>
                    </Tooltip.Root>
                </Sheet.Trigger>
                <Sheet.Content>
                    <Sheet.Header>
                        <Sheet.Title class = "flex items-center">
                            <img src = {member.profile} alt = "pfp" class = "w-[50px] h-[50px] rounded-[50px] border mr-2" />
                            <p>
                                {member.display_name ? member.display_name : member.username}
                                <span class = "block font-normal text-muted-foreground text-sm">{member.username}</span>
                            </p>
                        </Sheet.Title>
                        <Sheet.Description class = "text-lg">
                            • {member.status ? member.status : "No status available"}
                        </Sheet.Description>
                    </Sheet.Header>
                    <h2 class = "mt-5 text-lg">
                        {member.bio}
                    </h2>
                </Sheet.Content>
            </Sheet.Root>
        {/each}
    </Card.Content>
</Card.Root>
{/if}