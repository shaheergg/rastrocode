<template>
  <div
    class="flex flex-col justify-center flex-1 min-h-screen px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="w-auto h-10 mx-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
        alt="Your Company"
      />
      <h3 class="mt-10 text-sm text-center text-white">
        Forgot your password? No problem. Just let us know your email address
        and we will email you a password reset link that will allow you to
        choose a new one.
      </h3>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-white"
            >Email address</label
          >
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
            Email Password reset link
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
