<script>
    import * as Card from "@components/ui/card";
    import { Button } from "@components/ui/button";
    import Account from "@components/pages/settings/account.svelte";
    import Appearance from "@components/pages/settings/appearance.svelte";
    import Notifications from "@components/pages/settings/notifications.svelte";
    import Profile from "@components/pages/settings/profile.svelte";

    export let data;

    const settings = [
        "Account",
        "Profile",
        "Appearance",
        "Notifications",
    ];
</script>

<svelte:head>
    <title>Atom | {data.page.charAt(0).toUpperCase()}{data.page.slice(1)} | Settings</title>
</svelte:head>
 
<Card.Root class = "{data.main} mr-7">
    <Card.Header>
        <Card.Title>
            Settings
        </Card.Title>
    </Card.Header>
    <Card.Content>
        <div class = "flex items-center my-5">
            <label for = "image">
                <img src = {data.user.profile} alt = "pfp" class = "w-[45px] h-[45px] rounded-[50px] mr-2" />
            </label>
            <p class = "text-xl">{data.user.username}</p>
        </div>
        <div class = "flex w-full h-[55vh] m-auto">
            <div class = "w-4/12 h-full">
                {#each settings as setting}
                    <a href = "?page={setting.toLowerCase()}">
                        <Button variant = "ghost" class = "block mb-2 w-full text-left {setting.toLowerCase() == data.page ? "bg-secondary" : ""}">{setting}</Button>
                    </a>
                {/each}
            </div>
            <div class = "w-8/12 h-full ml-5">
                <h2 class = "text-lg font-bold mb-5">{data.page.charAt(0).toUpperCase()}{data.page.slice(1)}</h2>
                {#if data.page == "account"}
                    <Account user = {data.user} />
                {:else if data.page == "profile"}
                    <Profile user = {data.user} />
                {:else if data.page == "appearance"}
                    <Appearance />
                {:else if data.page == "notifications"}
                    <Notifications />
                {/if}
            </div>
        </div>
    </Card.Content>
</Card.Root>