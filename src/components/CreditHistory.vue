<template>
  <div class="bg-neutral-800">
    <div class="mx-auto max-w-7xl">
      <div class="py-10 bg-neutral-800">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-base font-semibold leading-6 text-white">
                Histórico de créditos
              </h1>
              <p class="mt-2 text-sm text-neutral-300">
                Veja todas as movimentações de créditos em sua conta.
              </p>
            </div>
          </div>
          <div class="flow-root mt-8">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div
                class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
              >
                <table class="min-w-full divide-y divide-neutral-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Créditos
                      </th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-white"
                      >
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-neutral-800">
                    <tr v-for="history in histories" :key="history.id">
                      <td
                        class="py-4 pl-4 pr-3 text-sm font-medium text-white whitespace-nowrap sm:pl-0"
                      >
                        {{ history.description }}
                      </td>
                      <td
                        class="px-3 py-4 text-sm text-neutral-300 whitespace-nowrap"
                      >
                        {{ history.type }}
                      </td>
                      <td
                        class="px-3 py-4 text-sm text-neutral-300 whitespace-nowrap"
                      >
                        {{ history.credits }}
                      </td>
                      <td
                        class="px-3 py-4 text-sm text-neutral-300 whitespace-nowrap"
                      >
                        {{ history.date }}
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
</template>

<script setup>
const histories = [
  {
    id: 1,
    description: "Créditos bônus para teste do sistema	",
    type: "credito",
    credits: "Credit",
    date: "2024-08-22 00:47:06",
  },
  // More people...
];
</script>
