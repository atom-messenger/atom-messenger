<script>
    import { Button } from "@components/ui/button";

    export let user;
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
        <div class = "block">
            <p class = "block font-bold text-muted-foreground text-sm">
                EMAIl
            </p>
            **********@gmail.com
        </div>
        <Button variant = "outline" class = "ml-auto">Edit</Button>
    </div>
</div>