s
<template>
  <AppLayout>
    <div class="overflow-hidden rounded-md shadow bg-neutral-800">
      <div class="px-4 py-5 space-y-4 sm:p-6">
        <div class="space-y-2">
          <h2 class="text-lg font-semibold">Configuração de Postagem</h2>
          <p class="text-neutral-300">
            Configure o local que irá aparecer como origem da postagem para seus
            clientes.
          </p>
          <div
            class="p-2 rounded-md bg-red-100 text-red-500 text-sm font-semibold border border-red-500"
          >
            Atenção: Irá aparecer EXATAMENTE IGUAL você digitar aqui. Evite
            erros de português.
          </div>
        </div>
        <div>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="space-y-2">
              <label for="type"> Tipo de postagem * </label>
              <select
                v-model="type"
                class="w-full px-4 py-2 border rounded-md bg-neutral-700 border-neutral-700"
                name="type"
                id="type"
              >
                <option value="int">Internacional (Recomendado)</option>
                <option value="na">Nacional</option>
              </select>
            </div>
            <div v-if="type === 'int'">
              <span>Configuração para postagem INTERNACIONAL: </span>
              <div class="space-y-2">
                <label for="country">País de origem *</label>
                <input
                  v-model="country"
                  class="w-full px-4 py-2 border rounded-md bg-neutral-700 border-neutral-700"
                  type="text"
                />
              </div>
            </div>
            <div class="space-y-4" v-else>
              <span>Configuração para postagem NACIONAL: </span>
              <div class="space-y-2">
                <label for="city">Cidade de Origem *</label>
                <input
                  v-model="city"
                  class="w-full px-4 py-2 border rounded-md bg-neutral-700 border-neutral-700"
                  type="text"
                  id="city"
                />
              </div>
              <div class="space-y-2">
                <label for="state">
                  UF de Origem (2 caracteres - Exemplo: SP) *
                </label>
                <input
                  v-model="state"
                  class="w-full px-4 py-2 border rounded-md bg-neutral-700 border-neutral-700"
                  type="text"
                  id="state"
                />
              </div>
            </div>
            <div class="flex items-center justify-between">
              <button type="submit" class="px-4 py-2 rounded-md bg-primary">
                Atulizar
              </button>
              <a
                href="https://auroralogistica.com/PQ7966104306BR"
                target="_blank"
                class="px-4 py-2 rounded-md bg-primary"
              >
                VISULIZER EXEMPLO DE CODIGO DE RASTREIO
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from "../layouts/AppLayout.vue";
import { ref } from "vue";
import { client } from "../config/axios";
import { useToast } from "vue-toast-notification";

const type = ref("int");
const country = ref("China");
const city = ref("São Paulo");
const state = ref("SP");

const configurePost = async (data) => {
  try {
    const response = await client.post("/api/post", data);
    if (response.status !== 200 && response.status !== 201) {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
    console.log("Pós-configuração bem-sucedida:", response.data);
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

const handleSubmit = async () => {
  let data = {};
  const toast = useToast();
  if (type.value === "int") {
    data.tipo = "Internacional";
    data.paisOrigem = country.value;
    data.cidadeOrigem = "123";
    data.estadoOrigem = "123";
  } else {
    data.tipo = "Nacional";
    data.paisOrigem = "Brasil";
    data.cidadeOrigem = city.value;
    data.estadoOrigem = state.value;
  }
  console.log(data);
  try {
    await configurePost(data);
    toast.success("Pós-configuração bem-sucedida");
  } catch (error) {
    toast.error("Error: " + error.message);
  }
};
</script>
