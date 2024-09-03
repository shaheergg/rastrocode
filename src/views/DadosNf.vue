<template>
  <AppLayout>
    <div class="overflow-hidden rounded-md shadow bg-neutral-800">
      <div class="px-4 py-5 space-y-4 sm:p-6">
        <div class="space-y-2">
          <h2 class="text-lg font-semibold">Dados para Nota Fiscal</h2>
          <p class="text-neutral-300">
            Configure as informações que vão aparecer na nota fiscal que seus
            clientes vão receber..
          </p>
        </div>
        <div>
          <form @submit.prevent="handleSubmitForm" class="space-y-4">
            <div class="space-y-3">
              <label for="razaoSocial"> Razão social * </label>
              <input
                id="razaoSocial"
                name="razaoSocial"
                v-model="razaoSocial"
                required
                placeholder="Razão Social da empresa"
                class="w-full px-4 py-2 border rounded-md bg-neutral-700 border-neutral-700"
                type="text"
              />
            </div>
            <div class="space-y-3">
              <label for="cpnj"> CNPJ * </label>
              <input
                id="cpnj"
                name="cpnj"
                required
                placeholder="CPNJ da empresa"
                class="w-full px-4 py-2 border rounded-md bg-neutral-700 border-neutral-700"
                type="text"
                v-model="numeroDocumento"
              />
            </div>
            <div class="space-y-3">
              <label for="telefone"> Telefone * </label>
              <input
                id="telefone"
                name="telefone"
                required
                v-model="phone"
                placeholder="Telefone da empresa"
                class="w-full px-4 py-2 border rounded-md bg-neutral-700 border-neutral-700"
                type="text"
              />
            </div>
            <div class="space-y-3">
              <label for="logo">
                URL do logo da loja (Recomendado que esteja no formato PNG sem o
                fundo.) *
              </label>
              <input
                id="logo"
                name="logo"
                v-model="logoLoja"
                required
                placeholder="URL logo da loja"
                class="w-full px-4 py-2 border rounded-md bg-neutral-700 border-neutral-700"
                type="url"
              />
            </div>
            <div class="space-y-3">
              <label for="endereco"> Endereço * * </label>
              <input
                id="endereco"
                name="endereco"
                required
                v-model="street"
                placeholder="Endereco da empresa"
                class="w-full px-4 py-2 border rounded-md bg-neutral-700 border-neutral-700"
                type="text"
              />
            </div>
            <div class="space-y-3">
              <label for="numero"> Número * </label>
              <input
                id="numero"
                v-model="streetNumber"
                name="numero"
                required
                placeholder="Número da empresa"
                class="w-full px-4 py-2 border rounded-md bg-neutral-700 border-neutral-700"
                type="text"
              />
            </div>
            <div class="space-y-3">
              <label for="complement"> Complemento </label>
              <input
                id="complement"
                name="complement"
                v-model="complement"
                required
                placeholder="Complemento da empresa"
                class="w-full px-4 py-2 border rounded-md bg-neutral-700 border-neutral-700"
                type="text"
              />
            </div>
            <div class="space-y-3">
              <label for="razaoSocial"> CEP * </label>
              <input
                id="cep"
                name="cep"
                required
                v-model="zipCode"
                placeholder="CEP da empresa"
                class="w-full px-4 py-2 border rounded-md bg-neutral-700 border-neutral-700"
                type="text"
              />
            </div>
            <div class="space-y-3">
              <label for="bairro"> Bairro * </label>
              <input
                id="bairro"
                name="bairro"
                v-model="neighborhood"
                required
                placeholder="Bairro da empresa"
                class="w-full px-4 py-2 border rounded-md bg-neutral-700 border-neutral-700"
                type="text"
              />
            </div>

            <div class="space-y-3">
              <label for="city"> Cidade * </label>
              <input
                id="city"
                name="city"
                v-model="city"
                required
                placeholder="Cidade da empresa"
                class="w-full px-4 py-2 border rounded-md bg-neutral-700 border-neutral-700"
                type="text"
              />
            </div>
            <div class="space-y-3">
              <label for="state"> Estado * </label>
              <select
                id="state"
                name="state"
                v-model="state"
                required
                class="w-full px-4 py-2 border rounded-md bg-neutral-700 border-neutral-700"
              >
                <option value="">Selecione</option>
                <option
                  v-for="state in states"
                  :key="state.value"
                  :value="state.value"
                >
                  {{ state.label }}
                </option>
              </select>
            </div>
            <div class="space-y-3">
              <label for="country"> País *</label>
              <select
                id="country"
                name="country"
                required
                v-model="country"
                class="w-full px-4 py-2 border rounded-md bg-neutral-700 border-neutral-700"
              >
                <option
                  v-for="country in countries"
                  :key="country.value"
                  :value="country.value"
                >
                  {{ country.label }}
                </option>
              </select>
            </div>
            <div class="flex items-center justify-between">
              <button
                type="submit"
                class="px-4 py-2 text-white rounded-md bg-primary"
              >
                Atualizar informações da empresa
              </button>
              <a href="#" class="px-4 py-2 text-white rounded-md bg-primary">
                VER EXEMPLO DE NOTA FISCAL
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { client } from "../config/axios";
import AppLayout from "../layouts/AppLayout.vue";
import { ref } from "vue";
import { useToast } from "vue-toast-notification";

const countries = [
  {
    label: "Brasil",
    value: "BR",
  },
];
const states = [
  { label: "Acre", value: "AC" },
  { label: "Alagoas", value: "AL" },
  { label: "Amapá", value: "AP" },
  { label: "Amazonas", value: "AM" },
  { label: "Bahia", value: "BA" },
  { label: "Ceará", value: "CE" },
  { label: "Distrito Federal", value: "DF" },
  { label: "Espírito Santo", value: "ES" },
  { label: "Goiás", value: "GO" },
  { label: "Maranhão", value: "MA" },
  { label: "Mato Grosso", value: "MT" },
  { label: "Mato Grosso do Sul", value: "MS" },
  { label: "Minas Gerais", value: "MG" },
  { label: "Pará", value: "PA" },
  { label: "Paraíba", value: "PB" },
  { label: "Paraná", value: "PR" },
  { label: "Pernambuco", value: "PE" },
  { label: "Piauí", value: "PI" },
  { label: "Rio de Janeiro", value: "RJ" },
  { label: "Rio Grande do Norte", value: "RN" },
  { label: "Rio Grande do Sul", value: "RS" },
  { label: "Rondônia", value: "RO" },
  { label: "Roraima", value: "RR" },
  { label: "Santa Catarina", value: "SC" },
  { label: "São Paulo", value: "SP" },
  { label: "Sergipe", value: "SE" },
  { label: "Tocantins", value: "TO" },
];

const razaoSocial = ref("teste1");
const numeroDocumento = ref("numeromento");
const logoLoja = ref("logoLoja");
const phone = ref("phone");
const street = ref("teste");
const streetNumber = ref("teste");
const complement = ref("teste");
const zipCode = ref("teste");
const neighborhood = ref("teste");
const city = ref("teste");
const state = ref("MG");
const country = ref("BR");

const handleSubmitForm = async (e) => {
  const $toast = useToast();
  const data = {
    razaoSocial: razaoSocial.value,
    numeroDocumento: numeroDocumento.value,
    logoLoja: logoLoja.value,
    phone: phone.value,
    street: street.value,
    streetNumber: streetNumber.value,
    complement: complement.value,
    zipCode: zipCode.value,
    neighborhood: neighborhood.value,
    city: city.value,
    state: state.value,
    country: country.value,
  };

  try {
    const response = await client.post("/api/dadosnfe", data);
    $toast.success("Dados atualizados com sucesso");
  } catch (error) {
    $toast.error("Erro ao atualizar os dados");
  } finally {
    e.target.reset();
  }
};
</script>
