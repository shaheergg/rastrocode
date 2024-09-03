<template>
  <AppLayout>
    <div class="overflow-hidden rounded-md shadow bg-neutral-800">
      <div class="px-4 py-5 space-y-4 sm:p-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-lg font-semibold">
              <span v-if="$route.params.type === 'all'"> Todos </span>
              <span v-else-if="$route.params.type === 'awaited'">
                Aguardando
              </span>
              <span v-else-if="$route.params.type === 'posted'"> Pagos </span>

              pedidos
            </h2>
            <p class="text-neutral-400">
              Veja todos os pedidos
              <span v-if="$route.params.type === 'posted'">PAGOS</span>
              <span v-if="$route.params.type === 'awaited'">Aguardando</span>
              da sua loja.
            </p>
          </div>
          <div>
            <button
              @click="isFilter = !isFilter"
              class="p-2 bg-white rounded-lg text-neutral-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                />
              </svg>
            </button>
          </div>
        </div>
        <div v-if="isFilter" class="p-4 rounded-md bg-neutral-900">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center space-x-4">
              <div>
                <label class="block text-sm font-medium text-neutral-300">
                  Data Inicial
                </label>
                <input
                  v-model="filters.startDate"
                  type="date"
                  class="block w-40 px-3 py-2 mt-1 text-sm border rounded-md text-neutral-300 bg-neutral-800 border-neutral-700 focus:outline-none focus:ring-neutral-500 focus:border-neutral-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-300">
                  Data Final
                </label>
                <input
                  v-model="filters.endDate"
                  type="date"
                  class="block w-40 px-3 py-2 mt-1 text-sm border rounded-md text-neutral-300 bg-neutral-800 border-neutral-700 focus:outline-none focus:ring-neutral-500 focus:border-neutral-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-300">
                  Nome Cliente:
                </label>
                <input
                  v-model="filters.cliente"
                  type="text"
                  class="block w-40 px-3 py-2 mt-1 text-sm border rounded-md text-neutral-300 bg-neutral-800 border-neutral-700 focus:outline-none focus:ring-neutral-500 focus:border-neutral-500"
                />
              </div>
            </div>
            <div>
              <button
                @click="fetchSales"
                class="px-4 py-2 text-xs font-semibold text-white rounded-md bg-primary"
              >
                FILTRAR
              </button>
            </div>
          </div>
        </div>
        <div class="flow-root mt-8">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div
              class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
            >
              <div
                v-if="loading"
                class="flex items-center justify-center p-6 text-center"
              >
                <h2 class="animate-pulse">Loading...</h2>
              </div>
              <table v-else class="min-w-full divide-y divide-neutral-700">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                    >
                      Código
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Produtos
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Valor
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Data
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                    >
                      Detalhes
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-neutral-800">
                  <tr v-for="sale in filteredSales" :key="sale?.id">
                    <td
                      class="py-4 pl-4 pr-3 text-sm font-medium text-white whitespace-nowrap sm:pl-0"
                    >
                      {{
                        sale?.codigo_de_rastreio
                          ? sale?.codigo_de_rastreio
                          : "--"
                      }}
                    </td>
                    <td
                      class="px-3 py-4 text-sm text-neutral-300 whitespace-nowrap"
                    >
                      {{ sale?.produtos?.length }}
                    </td>
                    <td
                      class="px-3 py-4 text-sm text-neutral-300 whitespace-nowrap"
                    >
                      {{ sale?.valor }}
                    </td>
                    <td
                      class="px-3 py-4 text-sm text-neutral-300 whitespace-nowrap"
                    >
                      {{ sale?.data }}
                    </td>
                    <td
                      class="px-3 py-4 text-sm text-neutral-300 whitespace-nowrap"
                    >
                      {{ sale?.status }}
                    </td>
                    <td
                      class="px-3 py-4 text-sm text-neutral-300 whitespace-nowrap"
                    >
                      {{ sale?.detalhes }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import AppLayout from "../layouts/AppLayout.vue";
import { useToast } from "vue-toast-notification";
import { ref, onMounted, watch } from "vue";
import { client } from "../config/axios";
import { useRoute, useRouter } from "vue-router";

const isFilter = ref(false);
const route = useRoute();

const filters = ref({
  startDate: "2024-01-25",
  endDate: "2024-08-25",
  cliente: "",
});

const type = ref(route.params.type);
const filteredSales = ref(null);
const sales = ref(null);
const loading = ref(false);
const router = useRouter();

const fetchSales = async () => {
  const $toast = useToast();
  loading.value = true;
  try {
    const response = await client.get("/api/sales", {
      params: filters.value,
    });
    const data = response.data?.registros;
    sales.value = data;
    $toast.success("Vendas carregadas com sucesso!");
  } catch (error) {
    $toast.error("Erro ao carregar vendas!");
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const filterSales = () => {
  if (type.value === "all") {
    filteredSales.value = sales.value;
  } else if (type.value !== "all") {
    filteredSales.value = sales.value?.filter((sale) => sale.status !== "paid");
  }
  // Add more conditions as needed.
};

onMounted(async () => {
  if (!["all", "awaited", "posted"].includes(type)) {
    await router.push({ name: "Orders", params: { type: "all" } });
  }
  await fetchSales();
  filterSales(); // Apply the initial filter after fetching sales
});

watch(
  () => route.params.type,
  async (newType) => {
    type.value = newType;
    if (!sales.value) {
      await fetchSales();
    }
    filterSales(); // Filter sales whenever the type changes
  }
);
</script>
