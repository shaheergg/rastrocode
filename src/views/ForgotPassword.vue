<template>
  <div
    class="flex flex-col justify-center flex-1 min-h-screen px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <Logo />
      <h3 class="mt-10 text-sm text-center text-white">
        Esqueceu sua senha? Sem problemas. Basta nos informar seu endereço de
        e-mail e enviaremos por e-mail um link de redefinição de senha que
        permitirá que você escolha uma nova.
      </h3>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-white"
            >Endereço de email
          </label>
          <div class="mt-2">
            <input
              v-model="email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              class="block w-full outline-none px-4 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            @click="handleSubmit"
            type="submit"
            class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Link de redefinição de senha de e-mail
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { client } from "../config/axios";
import { useToast } from "vue-toast-notification";
import Logo from "../components/Logo.vue";

const email = ref("");
const handleSubmit = async (e) => {
  e.preventDefault();
  const $toast = useToast();
  try {
    const response = await client.post("/api/forget-password", {
      email: email.value,
    });
    if (!response.ok) {
      throw new Error(response?.data?.message);
    }
    $toast.success(response.data.message);
  } catch (error) {
    $toast.error("An error occurred. Please try again later.");
  }
};
</script>
