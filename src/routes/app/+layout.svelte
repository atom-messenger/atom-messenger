<script>
    import { fetch_api } from "$lib/utils";
    import * as Card from "@components/ui/card";
    import * as DropdownMenu from "@components/ui/dropdown-menu";
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

    async function logout() {
        await fetch("/api/user/logout");
        window.location.href = "/login";
    }
</script>

<!-- top navbar for branding/navigating around user's account -->
<nav class = "bg-transparent mb-2.5">
    <div class = "max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <h1 class = "flex items-center text-2xl font-semibold rtl:space-x-reverse">
            <svg xmlns = "http://www.w3.org/2000/svg" width = "30" height = "30" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round"  class = "mr-1">
                <path stroke = "none" d = "M0 0h24v24H0z" fill = "none"/>
                <path d = "M12 12v.01" class = "stroke-primary" />
                <path d = "M19.071 4.929c-1.562 -1.562 -6 .337 -9.9 4.243c-3.905 3.905 -5.804 8.337 -4.242 9.9c1.562 1.561 6 -.338 9.9 -4.244c3.905 -3.905 5.804 -8.337 4.242 -9.9" />
                <path d = "M4.929 4.929c-1.562 1.562 .337 6 4.243 9.9c3.905 3.905 8.337 5.804 9.9 4.242c1.561 -1.562 -.338 -6 -4.244 -9.9c-3.905 -3.905 -8.337 -5.804 -9.9 -4.242" />
            </svg>
            Atom
        </h1>
        <ul class = "font-medium flex flex-col rounded-[0.3rem] md:flex-row md:space-x-8 rtl:space-x-reverse">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <li class = "block rounded-[0.3rem] px-3 py-2 cursor-pointer duration-100 text-primary-foreground bg-primary hover:bg-primary/90">
                        My Account
                    </li>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label class = "flex">
                        {data.user.alias}
                    </DropdownMenu.Label>
                    <DropdownMenu.Separator />
                    <a href = "/settings">
                        <DropdownMenu.Item class = "cursor-pointer">
                            Settings
                            <svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round" class = "ml-auto">
                                <path stroke = "none" d = "M0 0h24v24H0z" fill = "none" />
                                <path d = "M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                                <path d = "M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                            </svg>
                        </DropdownMenu.Item>
                    </a>
                    <DropdownMenu.Item on:click = {logout} class = "text-red-500 cursor-pointer">
                        Logout
                        <svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round" class = "ml-auto">
                            <path stroke = "none" d = "M0 0h24v24H0z" fill = "none" />
                            <path d = "M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                            <path d = "M9 12h12l-3 -3" />
                            <path d = "M18 15l3 -3" />
                        </svg>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </ul>
    </div>
</nav>

<!-- container holding sidebars and main content -->
<div class = "lg:flex lg:items-center lg:justify-center lg:h-[85vh] lg:m-0 m-5 mb-10">
    <!-- server list sidebar -->
    <Card.Root class = "lg:w-32 {data.side}">
        <Card.Header class = "border-b mb-2">
            <a href = "/">
                <Card.Title class = "flex items-center cursor-pointer duration-100 hover:text-muted-foreground">
                    <svg xmlns = "http://www.w3.org/2000/svg" width = "20" height = "20" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round" class = "m-auto">
                        <path stroke = "none" d = "M0 0h24v24H0z" fill = "none" />
                        <path d = "M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
                        <path d = "M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
                    </svg>
                </Card.Title>
            </a>
        </Card.Header>
        <Card.Content class = "lg:block lg:text-center flex justify-center">
            <Dialog.Root>
                <Dialog.Trigger>
                    <ServerButton name = "Create Server" className = "lg:mb-2.5" />
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
                <a data-sveltekit-reload href = "/app/{server.id}" class = "block lg:mb-2">
                    <ServerButton image = {server.image} name = {server.name} />
                </a>
            {/each}
        </Card.Content>
    </Card.Root>
    <!-- this container is for making the server list sidebar same width throughout -->
    <div class = "w-full flex h-full">
        <slot />
    </div>
</div>