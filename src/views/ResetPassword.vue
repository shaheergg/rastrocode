<template>
  <div
    class="flex flex-col justify-center flex-1 min-h-full px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="w-auto h-10 mx-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
        alt="Your Company"
      />
      <h2 class="mt-10 text-2xl font-bold text-center text-white">
        Redefinir senha
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        @submit.prevent="handleResetPassword"
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
              >Nova Senha
            </label>
            <div class="text-sm">
              <RouterLink
                to="/"
                class="font-semibold text-hover hover:text-hover/70"
                >Login</RouterLink
              >
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
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-white"
              >Confirme sua senha
            </label>
          </div>
          <div class="mt-2">
            <input
              v-model="confirmPassword"
              id="Confirm password"
              name="Confirm password"
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
            Redefinir senha
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { client } from "../config/axios";
import { useToast } from "vue-toast-notification";
import { useRoute } from "vue-router";
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const router = useRoute();

const handleResetPassword = async () => {
  const $toast = useToast();
  if (password.value !== confirmPassword.value) {
    return;
  }

  try {
    // get token from url
    const token = router.params.token;
    if (!token) {
      throw new Error("Invalid token");
    }
    const response = await client.post("/api/reset-password", {
      email: email.value,
      password: password.value,
      token,
      password_confirmation: confirmPassword.value,
    });
    if (!response.ok) {
      throw new Error(response?.data?.message);
    }
    $toast.success(response.data.message);
  } catch (error) {
    $toast.error(error.message);
  }
};
</script>
