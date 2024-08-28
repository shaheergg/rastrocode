<template>
  <AppLayout>
    <div class="overflow-hidden shadow bg-neutral-800 sm:rounded-md">
      <div class="px-4 py-5 space-y-4 sm:p-6">
        <div class="space-y-4">
          <h2 class="text-xl font-semibold text-white">Recarregar créditos</h2>
          <p class="text-neutral-400">
            Realize novas recargas de crédito na sua conta. Lembrando que sua
            conta não faz novos envios, rastreios e nenhuma operação na falta de
            créditos..
          </p>
        </div>
        <div>
          <form class="">
            <div class="flex flex-col space-y-4">
              <label for="credit" class="text-lg"
                >Quantidade de créditos *</label
              >
              <select
                v-model="selectedCredit"
                class="px-4 py-2 text-white bg-transparent border rounded-md border-neutral-400"
                name="credit"
                id="credit"
              >
                <option
                  v-for="option in creditOptions"
                  :key="option.value"
                  :value="option"
                  class="text-neutral-200 bg-neutral-700"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
            <div class="flex items-center justify-end">
              <button
                @click.prevent="applyCredit"
                class="px-4 py-2 mt-4 text-white rounded-md bg-primary bg-primary-500"
              >
                Realizar recarga
              </button>
            </div>
          </form>
          <div>
            <p>Realizar recarga com CRYPTO (em breve)</p>
          </div>
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
import "vue-toast-notification/dist/theme-sugar.css";

const creditOptions = [
  {
    label: "50 créditos - R$ 125,00",
    value: 50,
  },
  {
    label: "100 créditos + 10 de bônus - R$ 250,00",
    value: 100,
  },
  {
    label: "250 créditos + 30 de bônus - R$ 625,00",
    value: 250,
  },
  {
    label: "500 créditos + 80 de bônus - R$ 1.250,00",
    value: 500,
  },
  {
    label: "1000 créditos + 210 de bônus - R$ 2.500,00",
    value: 1000,
  },
  {
    label: "2000 créditos + 510 de bônus - R$ 5.000,00",
    value: 2000,
  },
  {
    label: "3000 créditos + 810 de bônus - R$ 7.500,00",
    value: 3000,
  },
  {
    label: "350 créditos + 2050 de bônus - R$ 12.500,00",
    value: 5000,
  },
];

const selectedCredit = ref(creditOptions[0]);
console.log(selectedCredit.value.value);

const applyCredit = async () => {
  try {
    const response = await client.post("/api/recharge", {
      value: selectedCredit.value.value,
    });
    const $toast = useToast();
    let instance = $toast.success("Recarga realizada com sucesso");
  } catch (error) {
    console.log(error);
    const $toast = useToast();
    let instance = $toast.error("Erro ao realizar recarga");
  }
};
</script>
