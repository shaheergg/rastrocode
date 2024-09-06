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
      <form class="space-y-6" @submit.prevent="handleRegister" method="POST">
        <!-- Name Field -->
        <div>
          <label
            for="name"
            class="block text-sm font-medium leading-6 text-white"
            >Nome</label
          >
          <div class="mt-2">
            <input
              id="name"
              v-model="name"
              name="name"
              required
              type="text"
              class="block w-full outline-none px-4 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <!-- Email Field -->
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
              required
              autocomplete="email"
              class="block w-full outline-none px-4 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <!-- WhatsApp Field -->
        <div>
          <label
            for="wpp"
            class="block text-sm font-medium leading-6 text-white"
            >WPP</label
          >
          <div class="mt-2">
            <input
              id="wpp"
              v-model="wpp"
              name="wpp"
              required
              type="text"
              class="block w-full outline-none px-4 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <!-- Username Field -->
        <div>
          <label
            for="username"
            class="block text-sm font-medium leading-6 text-white"
            >Nome de usuário
          </label>
          <div class="mt-2">
            <input
              id="username"
              v-model="username"
              required
              name="username"
              type="text"
              class="block w-full outline-none px-4 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <!-- Telefone Field -->
        <div>
          <label
            for="telefone"
            class="block text-sm font-medium leading-6 text-white"
            >Telefone</label
          >
          <div class="mt-2">
            <input
              id="telefone"
              v-model="telefone"
              required
              name="telefone"
              type="text"
              class="block w-full outline-none px-4 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <!-- Password Field -->
        <div>
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-white"
            >Senha</label
          >
          <div class="mt-2">
            <input
              v-model="password"
              id="password"
              name="password"
              required
              type="password"
              autocomplete="current-password"
              class="block w-full px-4 outline-none rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <!-- Password Confirmation Field -->
        <div>
          <label
            for="password_confirmation"
            class="block text-sm font-medium leading-6 text-white"
            >Confirme sua senha
          </label>
          <div class="mt-2">
            <input
              v-model="passwordConfirmation"
              id="password_confirmation"
              name="password_confirmation"
              required
              type="password"
              class="block w-full px-4 outline-none rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Registrei
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { baseUrl } from "../config/baseurl";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";
import Logo from "../components/Logo.vue";

// Using ref to create reactive variables
const name = ref("");
const email = ref("");
const wpp = ref("");
const username = ref("");
const telefone = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const router = useRouter();

// Function to handle the POST request
const registerUser = async () => {
  try {
    // Validate input
    if (
      !name.value ||
      !email.value ||
      !wpp.value ||
      !username.value ||
      !telefone.value ||
      !password.value ||
      !passwordConfirmation.value
    ) {
      throw new Error("All fields are required");
    }

    if (password.value !== passwordConfirmation.value) {
      throw new Error("Passwords do not match");
    }

    // Make API request
    const response = await axios.post(baseUrl + "/api/register", {
      name: name.value,
      email: email.value,
      wpp: wpp.value,
      username: username.value,
      telefone: telefone.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    });

    // Check response status
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }

    console.log("Registration successful:", response.data);
    return response.data;
  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Server responded with an error:", error.response.data);
      throw new Error(error.response.data.message || "Server error occurred");
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from server");
      throw new Error(
        "No response from server. Please check your internet connection."
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error during registration:", error.message);
      throw error;
    }
  }
};
const handleRegister = async () => {
  const $toast = useToast();
  try {
    await registerUser();
    $toast.success("Usuário cadastrado com sucesso!");
    router.push("/");
  } catch (err) {
    $toast.error(err.message);
    return;
  }
};
</script>
