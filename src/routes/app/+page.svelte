<script>
    import * as Card from "@components/ui/card";
    import { Input } from "@components/ui/input";
    import { Button } from "@components/ui/button";

    export let data;
</script>

<svelte:head>
    <title>Atom | Friends</title>
</svelte:head>

<Card.Root class = "{data.main} mr-7">
    <Card.Header>
        <Card.Title>
            My Friends
        </Card.Title>
    </Card.Header>
    <Card.Content>
        <form autocomplete = "off" class = "w-72 mb-10 flex">
            <Input type = "text" name = "name" placeholder = "Friend's Username…" class = "h-[36px] mr-2" />
            <Button variant = "secondary" type = "submit">Add Friend</Button>
        </form>
        <p class = "text-muted-foreground text-center text-lg">You have no friends lol :3</p>
        <img src = "/friends.svg" alt = "notionly" class = "m-auto w-[30%] h-[30%]" />
    </Card.Content>
</Card.Root>