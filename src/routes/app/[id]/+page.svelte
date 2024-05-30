<script>
    import { io } from "socket.io-client";
    import { onMount } from "svelte";
    import { fetch_api } from "$lib/utils";
    import { Button } from "@components/ui/button";
    import { Input } from "@components/ui/input";
    import * as Card from "@components/ui/card";
    import * as DropdownMenu from "@components/ui/dropdown-menu";
    import * as Sheet from "$lib/components/ui/sheet";
    import ServerButton from "@components/server-button.svelte";

    export let data;
  
    const socket = io();

    let messages = data.server ? [...data.server.messages] : [];
    let error = "";
    let settingPage = false;

    onMount(() => {
        document.getElementById("feed").scrollTop = document.getElementById("feed").scrollHeight;
    });

    socket.on(`msg_${data.server ? data.server.id : null}`, (msg) => {
        messages.push(msg);
        messages = messages;

        const feedElement = document.getElementById("feed");
        const observer = new MutationObserver(() => {
            feedElement.scrollTop = feedElement.scrollHeight;
        });
        observer.observe(feedElement, { childList: true });
    });

    function send(e) {
        socket.emit("message", { server: data.server.id, author: data.user.id, text: e.target.message.value });
        e.target.message.value = "";
    }

    async function leave() {
        if (data.server.owner == data.user.id) {
            alert("You can't leave your own server!");
        } else {
            await fetch_api("/api/server/leave", {
                server: data.server.id
            }, "/");
        }
    }

    const sideBox = "lg:mx-7 lg:my-0 lg:h-full my-5 overflow-auto";
</script>

<svelte:head>
    <title>{data.server != null ? data.server.name : "Server Not Found"} | Atom</title>
</svelte:head>

{#if data.server == null}
    <div class = "text-center mt-10">
        <h1 class = "text-2xl">Server Not Found</h1>
        <p class = "text-muted-foreground">Wrong server link lol</p>
    </div>
{:else}
    <div class = "lg:flex lg:items-center lg:justify-center lg:h-[85vh] lg:m-0 m-5">
        <Card.Root class = "lg:w-1/12 {sideBox}">
            <Card.Header class = "border-b mb-2.5">
                <Card.Title class = "flex items-center">
                    <svg xmlns = "http://www.w3.org/2000/svg" width = "20" height = "20" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round" class = "m-auto">
                        <path stroke = "none" d = "M0 0h24v24H0z" fill = "none" />
                        <path d = "M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                        <path d = "M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                    </svg>
                </Card.Title>
            </Card.Header>
            <Card.Content class = "lg:block flex justify-center">
                {#each data.user.joined as server}
                    <a data-sveltekit-reload href = "/app/{server.id}" class = "block text-center lg:mb-2.5">
                        <ServerButton name = {server.name} />
                    </a>
                {/each}
            </Card.Content>
        </Card.Root>
        <Card.Root class = "lg:w-9/12 w-full h-full overflow-auto">
            <Card.Header>
                <Card.Title class = "flex items-center">
                    {#if settingPage == false}
                        <span class = "mr-auto text-2xl">{data.server.name}</span>
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
                                    <DropdownMenu.Item on:click = {async () => await fetch_api("/api/server/delete", { server: data.server.id }, "/")} class = "text-red-500">
                                        Delete
                                        <svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round" class = "ml-auto">
                                            <path stroke = "none" d = "M0 0h24v24H0z" fill = "none" />
                                            <path d = "M4 7l16 0" />
                                            <path d = "M10 11l0 6" />
                                            <path d = "M14 11l0 6" />
                                            <path d = "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                            <path d = "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
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
                        <Input value = {data.server.name} class = "mr-auto text-2xl w-fit" />
                        <Button variant = "outline" on:click = {() => settingPage = false}>Go Back</Button>
                    {/if}
                </Card.Title>
            </Card.Header>
            <Card.Content>
                {#if settingPage == false}
                    <div id = "feed" class = "overflow-auto border rounded-[0.3rem] px-2.5 py-2.5 h-[60vh] mb-5">
                        {#each messages as msg}
                            <div class = "flex w-full mb-1 h-fit px-2.5 py-2.5 rounded-[0.3rem] hover:bg-secondary">
                                <img src = "/profiles/default.png" alt = "User Profile" class = "w-[25px] h-[25px] rounded-[50px] mr-2" />
                                <div class = "block mr-auto">
                                    <p class = "text-muted-foreground">{msg.author}</p>
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
                    <p>Setting page</p>
                {/if}
            </Card.Content>
        </Card.Root>
        <Card.Root class = "lg:w-2/12 {sideBox}">
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
                            <div class = "flex items-center hover:text-muted-foreground duration-100">
                                <img src = "/profiles/default.png" width = "20" height = "20" alt = "pfp" class = "rounded-[50px] mr-2" />
                                <p>{member}</p> <!-- show all letters when in normal viewport -->
                            </div>
                        </Sheet.Trigger>
                        <Sheet.Content>
                            <Sheet.Header>
                                <Sheet.Title class = "flex items-center">
                                    <img src = "/profiles/default.png" width = "30" height = "30" alt = "pfp" class = "rounded-[50px] mr-2" />
                                    {member}
                                </Sheet.Title>
                                <Sheet.Description>
                                    Status asdfksldfs;fldaksjdflsd;falsdkf
                                </Sheet.Description>
                            </Sheet.Header>
                        </Sheet.Content>
                    </Sheet.Root>
                {/each}
            </Card.Content>
        </Card.Root>
    </div>
{/if}