<script>
    import { onMount, createEventDispatcher } from "svelte";
    
    const dispatch = createEventDispatcher();

    onMount(() => {
        document.querySelector("emoji-picker").addEventListener('emoji-click', e => {
            // somehow get this message to parent
            dispatch("emoji", e.detail.unicode);
        });
    });
</script>

<emoji-picker></emoji-picker>