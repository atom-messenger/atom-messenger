<script>
    import { fetch_api } from "$lib/utils";
    import * as Card from "@components/ui/card";
    import * as Dialog from "@components/ui/dialog";
    import * as Tabs from "$lib/components/ui/tabs";
    import * as Tooltip from "$lib/components/ui/tooltip";
    import { Input } from "@components/ui/input";
    import { Button } from "@components/ui/button";

    export let data;

    let message = "";

    async function addFriend(e) {
        message = "";

        const res = await fetch_api("/api/user/friends/add/request", {
            friend: e.target.friend.value
        });

        if (res.error) {
            message = {
                type: "error",
                text: res.error
            };
        } else {
            message = {
                type: "success",
                text: res.success
            }
        }
    }

    // friend request user button
    const friendDiv = {
        container: "bg-secondary border rounded p-2 duration-100 flex items-center hover:bg-transparent hover:border-secondary",
        svg: "cursor-pointer border bg-background rounded-[50px] h-[20px] w-[20px] p-[2px]"
    }
</script>

<svelte:head>
    <title>Atom | Friends</title>
</svelte:head>

<Card.Root class = "{data.main} mr-7">
    <Card.Header>
        <Card.Title>
            My Dashboard
        </Card.Title>
    </Card.Header>
    <Card.Content>
        <div class = "flex items-center border-b pb-[20px] mb-[20px]">
            <div class = "block mr-auto">
                <form on:submit|preventDefault = {addFriend} autocomplete = "off" class = "w-72 flex">
                    <Input type = "text" name = "friend" placeholder = "Friend's Username…" class = "h-[36px] mr-2" />
                    <Button type = "submit" variant = "secondary">Add Friend</Button>
                </form>
                <p class = "text-{message.type == "error" ? "red" : "green"}-500 mt-2">
                    {message ? message.text : ""}
                </p>
            </div>
            <div>
                <Dialog.Root>
                    <Dialog.Trigger>
                        <Button>New Post</Button>
                    </Dialog.Trigger>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>
                                New Post
                            </Dialog.Title>
                            <Dialog.Description>
                                Share a post with your friends!
                            </Dialog.Description>
                        </Dialog.Header>
                    </Dialog.Content>
                </Dialog.Root>
            </div>
        </div>
        <div class = "block lg:flex lg:items-center lg:justify-center">
            <div class = "block h-[50vh] lg:w-[50%]">
                <p class = "text-md font-bold text-center">
                    Friend Management
                </p>
                <Tabs.Root value = "all" class = "w-full lg:w-fit mt-2 mb-10 m-auto">
                    <Tabs.List class = "flex justify-center overflow-auto">
                        <Tabs.Trigger value = "all">All</Tabs.Trigger>
                        <Tabs.Trigger value = "incoming">Incoming</Tabs.Trigger>
                        <Tabs.Trigger value = "outgoing">Outgoing</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value = "all">
                        {#if data.user.friends.length === 0}
                            <p class = "text-red-500 text-center">
                                You have no friends! Add them!
                            </p>
                        {:else}
                            {#each data.user.friends as friend}
                                <div class = {friendDiv.container}>
                                    <a href = "/u/{friend}" class = "w-full">
                                        {friend}
                                    </a>
                                    <Tooltip.Root>
                                        <Tooltip.Trigger class = "ml-auto">
                                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                                            <svg on:click = {async () => await fetch_api("/api/user/friends/remove/delete", { friend }, "/")} xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round" class = {friendDiv.svg}>
                                                <path stroke = "none" d = "M0 0h24v24H0z" fill = "none" />
                                                <path d = "M18 6l-12 12" />
                                                <path d = "M6 6l12 12" />
                                            </svg>
                                        </Tooltip.Trigger>
                                        <Tooltip.Content>
                                            Cancel
                                        </Tooltip.Content>
                                    </Tooltip.Root>
                                </div>
                            {/each}
                        {/if}
                    </Tabs.Content>
                    <Tabs.Content value = "incoming">
                        {#if data.user.incoming_requests.length === 0}
                            <p class = "text-red-500 text-center">
                                No incoming friend requests.
                            </p>
                        {:else}
                            {#each data.user.incoming_requests as user}
                                <div class = {friendDiv.container}>
                                    <a href = "/u/{user}" class = "w-full">
                                        {user}
                                    </a>
                                    <Tooltip.Root>          
                                        <Tooltip.Trigger class = "ml-auto">
                                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                                            <svg on:click = {async () => await fetch_api("/api/user/friends/add/accept", { friend: user }, "/")} xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round" class = "{friendDiv.svg} hover:text-green-500">
                                                <path stroke = "none" d = "M0 0h24v24H0z" fill = "none" />
                                                <path d = "M5 12l5 5l10 -10" />
                                            </svg>
                                        </Tooltip.Trigger>
                                        <Tooltip.Content>
                                            Accept Request
                                        </Tooltip.Content>
                                    </Tooltip.Root>
                                    <Tooltip.Root>
                                        <Tooltip.Trigger>
                                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                                            <svg on:click = {async () => await fetch_api("/api/user/friends/remove/cancel", { side: "receiver", friend: user }, "/")} xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round" class = "{friendDiv.svg} hover:text-red-500">
                                                <path stroke = "none" d = "M0 0h24v24H0z" fill = "none" />
                                                <path d = "M18 6l-12 12" />
                                                <path d = "M6 6l12 12" />
                                            </svg>
                                        </Tooltip.Trigger>
                                        <Tooltip.Content>
                                            Deny Request
                                        </Tooltip.Content>
                                    </Tooltip.Root>
                                </div>
                            {/each}
                        {/if}
                    </Tabs.Content>
                    <Tabs.Content value = "outgoing">
                        {#if data.user.outgoing_requests.length === 0}
                            <p class = "text-red-500 text-center">
                                No outgoing friend requests.
                            </p>
                        {:else}
                            {#each data.user.outgoing_requests as user}
                                <div class = {friendDiv.container}>
                                    <a href = "/u/{user}" class = "w-full">
                                        {user}
                                    </a>
                                    <Tooltip.Root>
                                        <Tooltip.Trigger class = "ml-auto">
                                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                                            <svg on:click = {async () => await fetch_api("/api/user/friends/remove/cancel", { side: "sender", friend: user }, "/")} xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round" class = {friendDiv.svg}>
                                                <path stroke = "none" d = "M0 0h24v24H0z" fill = "none" />
                                                <path d = "M18 6l-12 12" />
                                                <path d = "M6 6l12 12" />
                                            </svg>
                                        </Tooltip.Trigger>
                                        <Tooltip.Content>
                                            Cancel
                                        </Tooltip.Content>
                                    </Tooltip.Root>
                                </div>
                            {/each}
                        {/if}
                    </Tabs.Content>
                </Tabs.Root>
            </div>
            <div class = "block h-[50vh] border-t pt-5 lg:pt-0 lg:border-0 lg:w-[50%]">
                <p class = "text-muted-foreground text-center text-lg">
                    You don't have a feed yet. Add some friends first!
                </p>
                <img src = "/friends.svg" alt = "notionly" class = "m-auto w-[70%] h-[70%]" />
            </div>
        </div>
    </Card.Content>
</Card.Root>