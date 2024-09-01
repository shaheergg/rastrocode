<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-900/80" />
        </TransitionChild>

        <div class="fixed inset-0 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel class="relative flex flex-1 w-full max-w-xs mr-16">
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div
                  class="absolute top-0 flex justify-center w-16 pt-5 left-full"
                >
                  <button
                    type="button"
                    class="-m-2.5 p-2.5"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="w-6 h-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <!-- Sidebar component, swap this element with another sidebar if you like -->
              <div
                class="flex flex-col px-6 pb-4 overflow-y-auto bg-neutral-800 grow gap-y-5"
              >
                <div class="flex items-center h-16 shrink-0">
                  <img
                    class="w-auto h-8"
                    src="https://tailwindui.com/img/logos/mark.svg?color=white"
                    alt="Your Company"
                  />
                </div>
                <nav class="flex flex-col flex-1">
                  <ul role="list" class="flex flex-col flex-1 gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <a
                            :href="item.href"
                            :class="[
                              $route.path === item.href
                                ? 'bg-neutral-700 text-white'
                                : 'text-neutral-200 hover:bg-neutral-700 hover:text-white',
                              'group flex gap-x-3 rounded-md py-2 px-3 text-sm font-semibold leading-6',
                            ]"
                          >
                            <span
                              class="flex items-center justify-between w-full gap-2"
                            >
                              <span>{{ item.name }}</span>
                              <span v-if="item.name === 'Afiliados'">
                                <TrophyIcon class="w-4 h-4 text-yellow-300" />
                              </span>
                            </span>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div
      class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"
    >
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div
        class="flex flex-col px-6 pb-4 overflow-y-auto bg-neutral-800 grow gap-y-5"
      >
        <div class="flex items-center h-16 shrink-0">
          <img
            class="w-auto h-8"
            src="https://tailwindui.com/img/logos/mark.svg?color=white"
            alt="Your Company"
          />
        </div>
        <nav class="flex flex-col flex-1">
          <ul role="list" class="flex flex-col flex-1 gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <RouterLink
                    :to="item.href"
                    :class="[
                      $route.path === item.href
                        ? 'bg-neutral-700 text-white'
                        : 'text-neutral-200 hover:bg-neutral-700 hover:text-white',
                      'group flex gap-x-3 rounded-md py-2 px-3 text-sm font-semibold leading-6',
                    ]"
                  >
                    <span
                      class="flex items-center justify-between w-full gap-2"
                    >
                      <span>{{ item.name }}</span>
                      <span v-if="item.name === 'Afiliados'">
                        <TrophyIcon class="w-4 h-4 text-yellow-300" />
                      </span>
                    </span>
                  </RouterLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="lg:pl-72">
      <div
        class="sticky top-0 z-40 flex items-center justify-between w-full h-16 px-4 border-b shadow-sm border-neutral-700 bg-neutral-800 gap-x-4 sm:gap-x-6 sm:px-6 lg:px-8"
      >
        <div class="flex items-center justify-between flex-1">
          <div>
            <h2 class="text-sm font-semibold">CRÉDITOS: {{ 15 }}</h2>
          </div>
          <div>
            <RouterLink
              to="/recharge"
              class="flex items-center px-4 py-2 text-xs font-semibold rounded shadow-sm text-neutral-100 bg-primary hover:bg-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <PlusIcon class="w-5 h-5 mr-2" aria-hidden="true" />
              Nova Recarga
            </RouterLink>
          </div>
        </div>
        <button
          type="button"
          class="-m-2.5 p-2.5 text-neutral-100 lg:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <Bars3Icon class="w-6 h-6" aria-hidden="true" />
        </button>
        <div class="flex self-stretch gap-x-4 lg:gap-x-6">
          <div class="flex items-center gap-x-4 lg:gap-x-6">
            <Menu as="div" class="relative">
              <MenuButton class="-m-1.5 flex items-center p-1.5">
                <span class="sr-only">Open user menu</span>
                <UserIcon class="w-5 h-5 text-neutral-100" aria-hidden="true" />
                <span class="hidden lg:flex lg:items-center">
                  <span
                    class="ml-4 text-sm font-semibold leading-6 text-neutral-100"
                    aria-hidden="true"
                    >{{ authStore?.user?.name }}</span
                  >
                </span>
              </MenuButton>
              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-neutral-900 py-2 shadow-lg ring-2 ring-neutral-600 focus:outline-none"
                >
                  <MenuItem
                    v-for="item in userNavigation"
                    :key="item.name"
                    v-slot="{ active }"
                  >
                    <RouterLink
                      :to="item.href"
                      v-if="!item.btn"
                      :class="[
                        active ? 'bg-neutral-700' : '',
                        'block px-3 py-1 text-sm leading-6 text-neutral-100',
                      ]"
                      >{{ item.name }}</RouterLink
                    >
                    <button
                      class="'block px-3 py-1 text-sm hover:bg-neutral-700 w-full text-left leading-6 text-neutral-100',"
                      @click="handleLogout()"
                      v-else
                    >
                      {{ item.name }}
                    </button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main class="py-10">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  Bars3Icon,
  PlusIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

import { TrophyIcon } from "@heroicons/vue/24/solid";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";
const authStore = useAuthStore();
const router = useRouter();

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Afiliados", href: "/affiliates" },
  { name: "Pedidos", href: "/orders" },
  { name: "Pagos", href: "#" },
  { name: "Clientes", href: "#" },
  {
    name: "Integração",
    href: "/gateway",
  },
  {
    name: "Dados NFE",
    href: "/dados-nf",
  },
  {
    name: "Postagem",
    href: "#",
  },
];

const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", btn: true },
];

const handleLogout = () => {
  authStore.logout();
  window.location.reload();
};

const sidebarOpen = ref(false);
</script>
