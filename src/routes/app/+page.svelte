<script>
    import * as Card from "@components/ui/card";

    export let data;
</script>

<svelte:head>
    <title>Atom | Friends</title>
</svelte:head>

<Card.Root class = "{data.main} mr-7">
    <Card.Header >
        <Card.Title>
            My Friends
        </Card.Title>
    </Card.Header>
    <Card.Content>
        <p class = "text-muted-foreground text-center text-lg">You have no friends lol :3</p>
        <img src = "/friends.svg" alt = "notionly" class = "m-auto w-[30%] h-[30%]" />
    </Card.Content>
</Card.Root>