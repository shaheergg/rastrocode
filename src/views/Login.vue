<template>
  <div
    class="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <Logo />
      <h2 class="mt-10 text-2xl font-bold text-center text-white">
        Painel de usuário
      </h2>
      <h3 class="mt-10 text-lg text-center text-white">
        Insira seus dados de acesso
      </h3>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        @submit.prevent="handleLogin"
        class="space-y-6"
        action="#"
        method="POST"
      >
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-white"
            >Endereço de email
          </label>
          <div class="mt-2">
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              class="block w-full outline-none px-4 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-white"
              >Senha</label
            >
            <div class="text-sm">
              <RouterLink
                to="/forgot-password"
                class="font-semibold text-hover hover:text-hover/70"
                >Esqueceu sua senha?
              </RouterLink>
            </div>
          </div>
          <div class="mt-2">
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              class="block w-full px-4 outline-none rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
import Logo from "../components/Logo.vue";
import { useToast } from "vue-toast-notification";

const email = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  const $toast = useToast();
  try {
    await authStore.login({ email: email.value, password: password.value });
  } catch (error) {
    $toast.error(error?.message || "Erro ao fazer login");
  }

  if (authStore.isAuthenticated) {
    router.push({
      name: "Dashboard",
    });
  }
};
</script>
