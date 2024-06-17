<script>
    import { fetch_api } from "$lib/utils";
    import { Button } from "@components/ui/button";
    import * as Card from "@components/ui/card";
    import { Input } from "@components/ui/input";
    import { Label } from "@components/ui/label";
    import { PUBLIC_DISCORD_URL } from "$env/static/public";

    let reactive = {
        page: true,
        loggingIn: "Login",
        signingUp: "Sign Up",
        signedUp: false,
        error: ""
    }

    async function login(e) {
        reactive.error = "";
        reactive.loggingIn = "Logging in...";
  
        let res = await fetch_api("/api/user/auth/login", {
          username: e.target.username.value,
          password: e.target.password.value
        });

        if (res.error) {
          reactive.loggingIn = "Login";
          reactive.error = res.error;
        } else {
          window.location.href = "/app";
        }
    }

    async function signup(e) {
      reactive.error = "";
      reactive.signingUp = "Signing up…";

      let res = await fetch_api("/api/user/auth/signup", Object.fromEntries(new FormData(e.target)));

      if (res.error) {
        reactive.signingUp = "Sign Up";
        reactive.error = res.error;
      } else {
        reactive.signedUp = true;
      }
    }
</script>

<br>
<a href = "/" class = "ml-10">
    <Button variant = "outline">
        Go Back
    </Button>
</a>
<Card.Root class = "mx-auto max-w-sm mt-10">
    <Card.Header>
        <Card.Title class = "text-2xl">
            {reactive.page == true ? "Login to Atom" : "Sign Up for Atom"}
        </Card.Title>
        <Card.Description>
            {reactive.page == true ? "Gain access to your Atom account" : "Create an account to get started"}
        </Card.Description>
    </Card.Header>
    <Card.Content>
        {#if reactive.page == true}
            <form on:submit|preventDefault = {login} autocomplete = "off" class = "grid gap-4">
                <div class = "grid gap-2">
                    <Label for = "username" class = "text-xs">USERNAME</Label>
                    <Input type = "text" name = "username" placeholder = "john.doe" />
                </div>
                <div class = "grid gap-2">
                    <div class = "flex items-center">
                        <Label for = "password" class = "text-xs">PASSWORD</Label>
                        <a href = "/forgot-password" class = "ml-auto inline-block text-sm text-muted-foreground underline hover:no-underline">
                            Forgot your password?
                        </a>
                    </div>
                    <Input type = "password" name = "password" placeholder = "********" />
                </div>
                <p class = "text-red-500">{reactive.error}</p>
                <Button type = "submit" class = "w-full">
                    {reactive.loggingIn}
                </Button>
            </form>
            <p class = "text-center my-2">or</p>
            <a href = {PUBLIC_DISCORD_URL}>
                <Button variant = "outline" class = "w-full bg-[#5865F2] text-white hover:bg-[#4251ed] hover:text-white">
                    <svg viewBox = "0 0 256 199" width = "19" height = "19" xmlns = "http://www.w3.org/2000/svg" preserveAspectRatio = "xMidYMid" class = "mr-2">
                        <path d = "M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z" fill = "#fff" />
                    </svg>
                    Login with Discord
                </Button>
            </a>
        {:else}
            <form on:submit|preventDefault = {signup} autocomplete = "off" class = "grid gap-4">
                <div class = "grid grid-cols-2 gap-4">
                    <div class = "grid gap-2">
                        <Label for = "email">Email</Label>
                        <Input type = "text" name = "email" placeholder = "john.doe@test.com" />
                    </div>
                    <div class = "grid gap-2">
                        <Label for = "username">Username</Label>
                        <Input type = "text" name = "username" placeholder = "john.doe" />
                    </div>
                </div>
                <div class = "grid gap-2">
                    <Label for = "password">Password</Label>
                    <Input type = "password" name = "password" placeholder = "********" />
                </div>
                <div class = "grid gap-2">
                    <Label for = "password">Confirm Password</Label>
                    <Input type = "password" name = "confirmPassword" placeholder = "********" />
                </div>
                <div class = "grid gap-2">
                    <Label for = "earlyAccess">Early Access Code</Label>
                    <Input type = "text" name = "earlyAccess" placeholder = "???" />
                </div>
                <Button type = "submit" class = "w-full">
                    {reactive.signingUp}
                </Button>
            </form>
        {/if}
        <div class = "mt-4 text-center text-sm">
            {reactive.page == true ? "Don't have an account?" : "Already have an account?"}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <span on:click = {() => reactive.page = !reactive.page} class = "cursor-pointer underline hover:no-underline">
                {#if reactive.page == true}
                    Sign Up
                {:else}
                    Login
                {/if}
            </span>
      </div>
    </Card.Content>
</Card.Root>