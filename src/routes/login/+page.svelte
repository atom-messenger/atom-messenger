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
  
        let res = await fetch_api("/api/user/login", { alias: e.target.alias.value, password: e.target.password.value });

        if (res.error) {
          reactive.loggingIn = "Login";
          reactive.error = res.error;
        } else {
          window.location.href = "/app";
        }
    }
</script>

<svelte:head>
  <title>Login | Atom</title>
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
            <Label for = "email">Alias</Label>
            <Input type = "text" name = "alias" placeholder = "john.doe" />
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
    <img src = "/atom.svg" alt = "placeholder" width = "1920" height = "1080" class = "h-full w-full object-cover" />
  </div>
</div>