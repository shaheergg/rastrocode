<template>
  <AppLayout>
    <div class="bg-neutral-800">
      <div class="mx-auto max-w-7xl">
        <div class="py-10 bg-neutral-800">
          <div class="px-4 sm:px-6 lg:px-8">
            <div class="sm:flex sm:items-center">
              <div class="sm:flex-auto flex items-center justify-between">
                <h1 class="text-base font-semibold leading-6 text-white">
                  Postagem
                </h1>
                <RouterLink
                  to="/postagem/configure"
                  class="px-4 py-2 rounded-md bg-primary"
                >
                  Configuração de Postagem
                </RouterLink>
              </div>
            </div>
            <div class="flow-root mt-8">
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div
                  class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
                >
                  <div
                    v-if="loading"
                    class="flex items-center justify-center p-8 text-white animate-pulse"
                  >
                    Loading...
                  </div>
                  <table v-else class="min-w-full divide-y divide-neutral-700">
                    <thead>
                      <tr class="border-b border-neutral-700">
                        <th
                          scope="col"
                          class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                        >
                          Tipo Postagem
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Pais Origem
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Cidade Origem
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          UF Origem
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-neutral-800">
                      <tr v-for="post in posts" :key="post.id">
                        <td
                          class="py-4 pl-4 pr-3 text-sm font-medium text-white whitespace-nowrap sm:pl-0"
                        >
                          {{ post.tipo_postagem }}
                        </td>
                        <td
                          class="px-3 py-4 text-sm text-neutral-300 whitespace-nowrap"
                        >
                          {{ post.pais_origem }}
                        </td>
                        <td
                          class="px-3 py-4 text-sm text-neutral-300 whitespace-nowrap"
                        >
                          {{ post.cidade_origem }}
                        </td>
                        <td
                          class="px-3 py-4 text-sm text-neutral-300 whitespace-nowrap"
                        >
                          {{ post.uf_origem }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from "vue";
import { client } from "../config/axios";
import AppLayout from "../layouts/AppLayout.vue";
import { RouterLink } from "vue-router";
const loading = ref(false);
const posts = ref([]);

const fetchPosts = async () => {
  loading.value = true;
  try {
    const response = await client.get("/api/post");
    posts.value = response.data;
  } catch (error) {
    loading.value = false;
  }
};

fetchPosts().then(() => {
  loading.value = false;
});
</script>
