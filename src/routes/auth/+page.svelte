<script>
    import { fetch_api } from "$lib/utils";
    import { Button } from "@components/ui/button/index.js";
    import { Input } from "@components/ui/input/index.js";
    import { Label } from "@components/ui/label/index.js";
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

<svelte:head>
  <title>Atom | Login</title>
</svelte:head>

<div class = "w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
  <div class = "flex items-center justify-center py-12">
    {#if reactive.signedUp == false}
      <div class = "mx-auto grid w-[350px] gap-6">
        <div class = "grid gap-2 text-center">
          <h1 class = "text-3xl font-bold">
            {reactive.page == true ? "Login to Atom" : "Sign Up for Atom"}
          </h1>
          <p class = "text-balance text-muted-foreground">
            Access your Atom account
          </p>
        </div>
        <div class = "grid gap-4">
          {#if reactive.page == true}
            <form on:submit|preventDefault = {login} autocomplete = "off">
              <div class = "grid gap-2 mb-5">
                <Label for = "username">Username</Label>
                <Input type = "text" name = "username" placeholder = "john.doe" />
              </div>
              <div class = "grid gap-2 mb-5">
                <div class = "flex items-center">
                  <Label for = "password">Password</Label>
                  <a href = "/forgot-password" class = "ml-auto inline-block text-sm text-muted-foreground underline hover:no-underline">
                    Forgot your password?
                  </a>
                </div>
                <Input type = "password" name = "password" placeholder = "********" />
                <p class = "text-red-500">{reactive.error}</p>
                <Button type = "submit" class = "w-full">{reactive.loggingIn}</Button>
                <p class = "text-muted-foreground text-center">or</p>
                <a href = {PUBLIC_DISCORD_URL}>
                  <Button type = "button" variant = "outline" class = "w-full bg-[#5865F2] hover:bg-[#4251ed]">
                    <svg viewBox="0 0 256 199" width="19" height="19" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" class = "mr-2">
                      <path d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z" fill = "#fff" />
                    </svg>
                    Continue with Discord
                  </Button>
                </a>
              </div>
            </form>
          {:else}
            <form on:submit|preventDefault = {signup} autocomplete = "off">
              <div class = "grid gap-2 mb-5">
                <Label for = "email">Email</Label>
                <Input type = "email" name = "email" placeholder = "john.doe@gmail.com" />
              </div>
              <div class = "grid gap-2 mb-5">
                <Label for = "username">Username</Label>
                <Input type = "text" name = "username" placeholder = "john.doe" />
              </div>
              <div class = "grid gap-2 mb-5">
                <Label for = "password">Password</Label>
                <Input type = "password" name = "password" placeholder = "********" />
              </div>
              <div class = "grid gap-2 mb-5">
                <Label for = "confirmPassword">Confirm Password</Label>
                <Input type = "password" name = "confirmPassword" placeholder = "********" />
              </div>
              <div class = "grid gap-2 mb-5">
                <Label for = "earlyAccess">Early Access Code</Label>
                <Input type = "text" name = "earlyAccess" placeholder = "???" />
              </div>
              <p class = "text-red-500 mb-2">{reactive.error}</p>
              <Button type = "submit" class = "w-full">{reactive.signingUp}</Button>
            </form>
          {/if}
        </div>
        <div class = "text-center text-sm">
          {reactive.page == true ? "Don't have an account?" : "Already have an account?"}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <span on:click = {() => reactive.page = !reactive.page} class = "underline cursor-pointer hover:no-underline">
            {reactive.page == true ? "Sign up" : "Login"}
          </span>
        </div>
      </div>
    {:else}
      <p class = "text-green-500 text-center">
        A verification email was sent to your email address
      </p>
    {/if}
  </div>
  <div class = "hidden bg-muted lg:block">
    <svg xmlns = "http://www.w3.org/2000/svg" width = "1920" height = "1800" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round" class = "h-full w-full object-cover stroke-[#e0e0de] dark:stroke-[#3b3a3a]">
      <circle cx = "12" cy = "12" r = "1" stroke = "currentColor" class = "stroke-primary" />
      <path d = "M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
      <path d = "M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
    </svg>
  </div>
</div>