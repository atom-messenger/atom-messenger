<script>
    import * as Tooltip from "@components/ui/tooltip";

    export let name;
    export let image = "";
    export let className = "";

    let showName = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<Tooltip.Root>
    <Tooltip.Trigger>
        <div class = "w-[50px] h-[50px] rounded-[50px] bg-muted mx-1 flex items-center justify-center text-secondary-foreground duration-300 cursor-pointer {image == "" ? "hover:rounded" : ""} {showName == true ? "px-3 w-fit" : "px-0 w-[30px]"} {className}">
            {#if image == ""}
                {#if name == "Create Server"}
                    <svg xmlns = "http://www.w3.org/2000/svg" width = "18" height = "18" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round">
                        <path stroke = "none" d = "M0 0h24v24H0z" fill = "none" />
                        <path d = "M12 5l0 14" />
                        <path d = "M5 12l14 0" />
                    </svg>
                {:else}
                    {name[0].toUpperCase()}
                {/if}
                {#if showName == true}
                    &nbsp;{name}
                {/if}
            {:else}
                <img src = {image} alt = {name} class = "w-[50px] h-[50px] rounded-[50px] border duration-300 hover:rounded" />
            {/if}
        </div>
    </Tooltip.Trigger>
    <Tooltip.Content>
        {name}
    </Tooltip.Content>
</Tooltip.Root>