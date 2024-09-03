<template>
  <AppLayout>
    <div class="overflow-hidden rounded-lg shadow bg-neutral-800">
      <div class="px-4 py-5 space-y-4 sm:p-6">
        <h2 class="text-lg font-semibold">Integração Gateway</h2>
        <p class="text-neutral-400">
          Realize as configurações abaixo para integrar seu gateway de pagamento
          ao nosso sistema..
        </p>
        <div v-if="$route.params.type === 'gateway'" class="space-y-4">
          <div class="space-y-4">
            <label class="text-sm" for="">Gateway *</label>
            <select
              class="w-full px-4 py-2 border-0 rounded-md bg-neutral-700 text-neutral-100"
              v-model="gateway"
            >
              <option
                v-for="gateway in gateways"
                :value="gateway"
                :key="gateway"
              >
                {{ gateway }}
              </option>
            </select>
          </div>
          <div class="space-y-4">
            <label class="text-sm" for="">Chave secreta *</label>
            <input
              v-model="secretKey"
              type="text"
              class="w-full px-4 py-2 border-0 rounded-md bg-neutral-700 text-neutral-100"
            />
          </div>
          <div class="space-y-4">
            <label class="text-sm" for="">Chave pública *</label>
            <input
              v-model="publicKey"
              type="text"
              class="w-full px-4 py-2 border-0 rounded-md bg-neutral-700 text-neutral-100"
            />
          </div>
          <div>
            <button
              @click="handleFormSubmit"
              class="px-4 py-2 rounded-md bg-primary"
            >
              Atualizar Integração
            </button>
          </div>
          <div>
            <div
              class="p-4 space-y-4 bg-red-100 border border-red-700 rounded-md"
            >
              <h2 class="text-lg font-semibold text-red-700">IMPORTANTE:</h2>
              <p class="text-red-700">
                Você deve configurar o Weebhook do seu gateway para a URL
                abaixo:
              </p>
              <div class="flex items-center gap-2 font-semibold text-red-700">
                <span>https://rastrocode.net/webhook</span>
                <button
                  @click="copyToClipboard('https://rastrocode.net/webhook')"
                  class="text-red-700"
                >
                  <ClipboardDocumentIcon class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="$route.params.type === 'checkout'" class="space-y-4">
          <div class="p-4 space-y-4 bg-red-100 rounded-md">
            <h2 class="text-lg font-semibold text-red-700">Vega</h2>
            <img src="https://rastrocode.net/img/vega.png" alt="" />
            <p class="text-red-700">
              Caso for importar os pedidos do VEGA CHECKOUT copie abaixo
            </p>
            <button
              @click="
                copyToClipboard(
                  'https://rastrocode.net/vega/0e3ba755-6020-11ef-9020-0242ac130002'
                )
              "
              class="flex items-center gap-2 text-sm text-red-700"
            >
              <ClipboardDocumentIcon class="w-4 h-4" />
              <span>Copiar URL</span>
            </button>
          </div>
          <div class="p-4 space-y-4 bg-red-100 rounded-md">
            <h2 class="text-lg font-semibold text-red-700">ADOOREI</h2>
            <img
              class="h-36"
              src="https://rastrocode.net/img/adoorei_logo.jpeg"
              alt=""
            />
            <p class="text-red-700">
              Caso for importar os pedidos do ADOOREI CHECKOUT copie abaixo
            </p>
            <button
              @click="
                copyToClipboard(
                  'https://rastrocode.net/adoorei/0e3ba755-6020-11ef-9020-0242ac130002'
                )
              "
              class="flex items-center gap-2 text-sm text-red-700"
            >
              <ClipboardDocumentIcon class="w-4 h-4" />
              <span>Copiar URL</span>
            </button>
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
import { ClipboardDocumentIcon } from "@heroicons/vue/24/solid";
import { useRoute } from "vue-router";

const gateways = [
  "CashTime",
  "SpaceFy Pay",
  "FastPay Brasil",
  "Nômade Pay",
  "Bynet",
  "BX PAY",
  "Skale Pay",
  "Sout Pay",
  "Dom Pagamentos",
  "Billions",
  "Pantherpay",
  "Gtw Capital",
  "VirtuPay",
];
const gateway = ref(gateways[0]);
const publicKey = ref("");
const secretKey = ref("");
const route = useRoute();
const handleFormSubmit = async (e) => {
  e.preventDefault();
  if (!publicKey.value || !secretKey.value) {
    return;
  }
  const $toast = useToast();

  const data = {
    gateway: gateway.value,
    chaveSecreta: secretKey.value,
    chavePublica: publicKey.value,
    companyId: "123",
    chave: "123",
    tipo: route.params.type,
  };
  try {
    const response = await client.post("/api/integration", data);
    $toast.success("Integração realizada com sucesso.");
    console.log(response);
  } catch (error) {
    $toast.error(error.message);
    console.log(error);
  } finally {
    publicKey.value = "";
    secretKey.value = "";
  }
};

// copy to clipboard on click
const copyToClipboard = (text) => {
  alert(`URL copiada: ${text}`);
  navigator.clipboard.writeText(text);
};
</script>
