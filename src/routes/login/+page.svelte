<script>
    import { fetch_api } from "$lib/utils";
    import { Button } from "@components/ui/button/index.js";
    import { Input } from "@components/ui/input/index.js";
    import { Label } from "@components/ui/label/index.js";

    let reactive = {
      loggingIn: "Login",
      error: ""
    }

    async function login(e) {
        e.preventDefault();
        
        reactive.error = "";
        reactive.loggingIn = "Logging in...";
  
        let res = await fetch_api("/api/user/login", {
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
</script>

<svelte:head>
  <title>Atom | Login</title>
</svelte:head>

<div class = "w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
  <div class = "flex items-center justify-center py-12">
    <div class = "mx-auto grid w-[350px] gap-6">
      <div class = "grid gap-2 text-center">
        <h1 class = "text-3xl font-bold">
          Login to Atom
        </h1>
        <p class = "text-balance text-muted-foreground">
          Access your Atom Messenger account
        </p>
      </div>
      <div class = "grid gap-4">
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
          </div>
          <p class = "text-red-500 mb-2">{reactive.error}</p>
          <Button type = "submit" class = "w-full">{reactive.loggingIn}</Button>
        </form>
      </div>
      <div class = "mt-4 text-center text-sm">
        Don't have an account?
        <a href = "/" class = "underline hover:no-underline">Sign up</a>
      </div>
    </div>
  </div>
  <div class = "hidden bg-muted lg:block">
    <svg xmlns = "http://www.w3.org/2000/svg" width = "1920" height = "1800" viewBox = "0 0 24 24" fill = "none" stroke = "currentColor" stroke-width = "2" stroke-linecap = "round" stroke-linejoin = "round" class = "h-full w-full object-cover stroke-[#e0e0de] dark:stroke-[#3b3a3a]">
      <circle cx = "12" cy = "12" r = "1" stroke = "currentColor" class = "stroke-primary" />
      <path d = "M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z" />
      <path d = "M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z" />
    </svg>
  </div>
</div>