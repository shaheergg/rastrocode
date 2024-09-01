<template>
  <div class="rounded-md bg-neutral-800">
    <div class="mx-auto rounded-md max-w-7xl">
      <div
        class="grid grid-cols-1 gap-px rounded-md bg-white/5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div class="px-4 py-6 bg-neutral-800 sm:px-6 lg:px-8">
          <p
            class="text-sm font-medium leading-6 truncate whitespace-nowrap text-neutral-400"
          >
            CRÉDITOS
          </p>
          <span class="text-xs truncate whitespace-nowrap">
            CRÉDITOS DISPONÍVEIS
          </span>
          <p class="flex items-baseline mt-2 gap-x-2">
            <span class="text-4xl font-semibold tracking-tight text-white">{{
              data?.saldo ? data?.saldo : "0"
            }}</span>
          </p>
        </div>
        <div class="px-4 py-6 bg-neutral-800 sm:px-6 lg:px-8">
          <p
            class="text-sm font-medium leading-6 truncate whitespace-nowrap text-neutral-400"
          >
            PENDENTES
          </p>
          <span class="text-xs truncate whitespace-nowrap">
            ENVIOS ATRASADOS
          </span>
          <p class="flex items-baseline mt-2 gap-x-2">
            <span class="text-4xl font-semibold tracking-tight text-white">{{
              data?.pedidosatrasados
            }}</span>
          </p>
        </div>
        <div class="px-4 py-6 bg-neutral-800 sm:px-6 lg:px-8">
          <p
            class="text-sm font-medium leading-6 truncate whitespace-nowrap text-neutral-400"
          >
            QUANTIDADE DE PEDIDOS HOJE
          </p>
          <span class="text-xs truncate whitespace-nowrap">
            (PAGOS E RECUSADOS)
          </span>
          <p class="flex items-baseline mt-2 gap-x-2">
            <span class="text-4xl font-semibold tracking-tight text-white">{{
              data?.quantidadeDePedidosHoje
            }}</span>
          </p>
        </div>
        <div class="px-4 py-6 bg-neutral-800 sm:px-6 lg:px-8">
          <p
            class="text-sm font-medium leading-6 truncate whitespace-nowrap text-neutral-400"
          >
            VENDAS PAGAS
          </p>
          <span class="text-xs truncate whitespace-nowrap">
            APROVADAS / HOJE
          </span>
          <p class="flex items-baseline mt-2 gap-x-2">
            <span class="text-4xl font-semibold tracking-tight text-white">{{
              data?.totalvendashoje
            }}</span>
          </p>
        </div>
        <div class="px-4 py-6 bg-neutral-800 sm:px-6 lg:px-8">
          <p
            class="text-sm font-medium leading-6 truncate whitespace-nowrap text-neutral-400"
          >
            QUANTIDADE ENVIADA
          </p>
          <span class="text-xs truncate whitespace-nowrap">
            TOTAL DE VENDAS ENVIADAS HOJE
          </span>
          <p class="flex items-baseline mt-2 gap-x-2">
            <span class="text-4xl font-semibold tracking-tight text-white">{{
              data?.qtdetotalenviado
            }}</span>
          </p>
        </div>
        <div class="px-4 py-6 bg-neutral-800 sm:px-6 lg:px-8">
          <p
            class="text-sm font-medium leading-6 truncate whitespace-nowrap text-neutral-400"
          >
            TOTAL GERAL
          </p>
          <span class="text-xs truncate whitespace-nowrap">
            Total pago no sistema
          </span>
          <p class="flex items-baseline mt-2 gap-x-2">
            <span class="text-4xl font-semibold tracking-tight text-white">{{
              data?.saldo ? data?.saldo : "0"
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { client } from "../config/axios";
import { useAuthStore } from "../store/auth";

const stats = [
  {
    name: "PENDENTES ENVIOS ATRASADOS",
    subTitle: "APROVADAS / HOJE",
    value: "0",
  },
  {
    name: "QUANTIDADE DE PEDIDOS HOJE (PAGOS E RECUSADOS)",
    value: "0",
  },
  { name: "VENDAS PAGAS", value: "3" },
  {
    name: "QUANTIDADE ENVIADA",
    subTitle: "TOTAL DE VENDAS ENVIADAS HOJE",
    value: "0",
  },
  {
    name: "TOTAL GERAL",
    subTitle: "Total pago no sistema",
    value: "0",
  },
];

const authStore = useAuthStore();
const data = ref({});
const fetchDashboardStats = async () => {
  const response = await client.get("api/dashboard");
  data.value = response.data;
};
fetchDashboardStats().then(() => {
  console.log(data.value);
});
</script>
