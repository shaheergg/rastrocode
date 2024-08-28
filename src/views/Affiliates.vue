<template>
  <AppLayout>
    <div class="bg-neutral-800">
      <div class="mx-auto max-w-7xl">
        <div class="py-10 bg-neutral-800">
          <div class="px-4 sm:px-6 lg:px-8">
            <div class="sm:flex sm:items-center">
              <div class="sm:flex-auto">
                <h1 class="text-base font-semibold leading-6 text-white">
                  Indique e ganhe
                </h1>
                <p class="mt-2 text-sm text-neutral-300">
                  Indique novos usuários e receba 20% de comissão sobre todas as
                  recargas deles OBS: Valor pago em créditos. Exemplo: Um
                  indicado seu recarregou 100 créditos, você recebe 20 créditos
                  de comissão.
                </p>
                <p class="mt-2 text-sm text-neutral-300">
                  Utilize o link abaixo para indicar o sistema:
                  <a
                    class="text-neutral-400 hover:underline"
                    href="https://rastrocode.net/register/melhorias"
                  >
                    https://rastrocode.net/register/melhorias</a
                  >
                </p>
              </div>
            </div>
            <div class="flow-root mt-8">
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div
                  class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
                >
                  <div>
                    <h2 class="text-base font-semibold leading-6 text-white">
                      Meus afiliados
                    </h2>
                    <p class="mt-2 text-sm text-neutral-300">
                      Veja todos os usuários indicados por você.
                    </p>
                  </div>
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
                          Nome
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                        >
                          Telefone
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-neutral-800">
                      <tr v-for="person in affiliates" :key="person.id">
                        <td
                          class="py-4 pl-4 pr-3 text-sm font-medium text-white whitespace-nowrap sm:pl-0"
                        >
                          {{ person.name }}
                        </td>
                        <td
                          class="px-3 py-4 text-sm text-neutral-300 whitespace-nowrap"
                        >
                          {{ person.email }}
                        </td>
                        <td
                          class="px-3 py-4 text-sm text-neutral-300 whitespace-nowrap"
                        >
                          {{ person.telefone }}
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
const loading = ref(false);
const affiliates = ref([]);

const fetchAffiliates = async () => {
  loading.value = true;
  try {
    const response = await client.get("/api/affiliate");
    affiliates.value = response.data?.allusers;
  } catch (error) {
    loading.value = false;
  }
};

fetchAffiliates().then(() => {
  loading.value = false;
});
</script>
