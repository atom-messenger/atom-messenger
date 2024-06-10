<script>
    import { Button } from "@components/ui/button";

    const features = [
        {
            name: "Secure Messaging",
            icon: `<svg xmlns = "http://www.w3.org/2000/svg" width = "24" height = "24" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round" class = "h-6 w-6"><path stroke = "none" d = "M0 0h24v24H0z" fill = "none" /><path d = "M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" /><path d = "M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d = "M8 11v-4a4 4 0 1 1 8 0v4" /></svg>`,
            description: "Atom uses end-to-end encryption to keep your messages safe and secure."
        },
        {
            name: "Servers",
            icon: `<svg xmlns = "http://www.w3.org/2000/svg" width = "24" height = "24" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = " 2" stroke-linecap = "round" stroke-linejoin = "round" class = "h-6 w-6"><path stroke = "none" d = "M0 0h24v24H0z" fill = "none" /><path d = "M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" /><path d = "M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" /></svg>`,
            description: "Collaborate with your team or catch up with friends in our servers."
        },
        {
            name: "Free Forever",
            icon: `<svg xmlns = "http://www.w3.org/2000/svg" width = "24" height = "24" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round" class = "h-6 w-6"><path stroke = "none" d = "M0 0h24v24H0z" fill = "none" /><path d = "M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d = "M13.867 9.75c-.246 -.48 -.708 -.769 -1.2 -.75h-1.334c-.736 0 -1.333 .67 -1.333 1.5c0 .827 .597 1.499 1.333 1.499h1.334c.736 0 1.333 .671 1.333 1.5c0 .828 -.597 1.499 -1.333 1.499h-1.334c-.492 .019 -.954 -.27 -1.2 -.75" /><path d = "M12 7v2" /><path d = "M12 15v2" /><path d = "M6 6l1.5 1.5" /><path d = "M16.5 16.5l1.5 1.5" /></svg>`,
            description: "Atom will be free forever. No ads, no subscriptions, no fees."
        }
    ]
</script>

<svelte:head>
    <title>Atom - The Messaging App</title>
</svelte:head>

<div class = "flex flex-col min-h-[100dvh]">
    <main class = "flex-1">
        <section class = "w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div class = "container px-4 md:px-6">
                <div class = "flex flex-col items-center space-y-4 text-center">
                    <div class = "space-y-2">
                        <h1 class = "text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                            Atom - The Messaging App
                        </h1>
                        <p class = "mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            The modern messaging app that keeps you connected with your friends
                        </p>
                    </div>
                    <a href = "/auth">
                        <Button>Get Started</Button>
                    </a>
                </div>
            </div>
        </section>
        <section class = "w-full py-12 md:py-24 lg:py-32">
            <div class = "container px-4 md:px-6 ml-auto">
                <div class = "grid items-start gap-6 sm:grid-cols-3">
                    {#each features as feature}
                        <div class = "grid gap-2 text-center my-20">
                            <div class = "flex h-10 w-10 items-center justify-center rounded-full bg-muted m-auto">
                                {@html feature.icon}
                            </div>
                            <h3 class = "text-lg font-bold">
                                {feature.name}
                            </h3>
                            <p class = "text-gray-500 dark:text-gray-400">
                                {feature.description}
                            </p>
                        </div>
                    {/each}
                </div>
            </div>
        </section>
    </main>
    <footer class = "flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p class = "text-xs text-gray-500 dark:text-gray-400">© 2024 Atom Inc. All rights reserved.</p>
        <nav class = "sm:ml-auto flex gap-4 sm:gap-6">
            <a href = "/privacy" class = "text-xs hover:underline underline-offset-4">
                Privacy Policy
            </a>
            <a href = "/tos" class = "text-xs hover:underline underline-offset-4">
                Terms of Service
            </a>
        </nav>
    </footer>
</div>