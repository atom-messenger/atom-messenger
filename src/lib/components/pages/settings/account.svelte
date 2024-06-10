<script>
    import { Button } from "@components/ui/button";

    export let user;

    let showEmail = false;
</script>

<div class = "border rounded p-5">
    <div class = "flex mb-5">
        <div class = "block">
            <p class = "block font-bold text-muted-foreground text-sm">
                DISPLAY NAME
            </p>
            {@html user.display_name ? user.display_name : `<p class = "text-red-500">None Set</p>`}
        </div>
        <Button variant = "outline" class = "ml-auto">Edit</Button>
    </div>
    <div class = "flex mb-5">
        <div class = "block">
            <p class = "block font-bold text-muted-foreground text-sm">
                USERNAME
            </p>
            {user.username}
        </div>
        <Button variant = "outline" class = "ml-auto">Edit</Button>
    </div>
    <div class = "flex mb-5">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class = "block">
            <p class = "block font-bold text-muted-foreground text-sm">
                EMAIl
            </p>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <span on:click = {() => showEmail = !showEmail} class = "cursor-pointer duration-100 hover:text-muted-foreground">
                {#if showEmail == false}
                    {"*".repeat(user.email.split("@")[0].length)}@{user.email.split("@")[1]}
                {:else}
                    {user.email}
                {/if}
            </span>
        </div>
        <Button variant = "outline" class = "ml-auto">Edit</Button>
    </div>
</div>