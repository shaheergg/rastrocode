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
                  <Logo />
                </div>
                <nav class="flex flex-col flex-1">
                  <ul role="list" class="flex flex-col flex-1 gap-y-7">
                    <li>
                      <ul role="list" class="-mx-2 space-y-1">
                        <li v-for="item in navigation" :key="item.name">
                          <RouterLink
                            :to="item.href"
                            v-if="!item.children"
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
                          <Disclosure as="div" v-else v-slot="{ open }">
                            <DisclosureButton
                              :class="[
                                $route.path === item.href
                                  ? 'bg-neutral-700'
                                  : 'hover:bg-neutral-700',
                                'flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-neutral-100',
                              ]"
                            >
                              <ChevronRightIcon
                                :class="[
                                  open
                                    ? 'rotate-90 text-neutral-500'
                                    : 'text-neutral-400',
                                  'h-4 w-4 shrink-0',
                                ]"
                                aria-hidden="true"
                              />
                              {{ item.name }}
                            </DisclosureButton>
                            <DisclosurePanel as="ul" class="px-2 mt-1">
                              <li
                                v-for="subItem in item.children"
                                :key="subItem.name"
                              >
                                <DisclosureButton as="div">
                                  <RouterLink
                                    :class="[
                                      $route.params.type === subItem.param
                                        ? 'bg-neutral-700'
                                        : 'hover:bg-neutral-700',
                                      'block rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-white-100',
                                    ]"
                                    :to="subItem.href"
                                    >{{ subItem.name }}</RouterLink
                                  ></DisclosureButton
                                >
                              </li>
                            </DisclosurePanel>
                          </Disclosure>
                        </li>
                      </ul>
                    </li>
                    <li class="pt-2">
                      <a
                        href="https://api.whatsapp.com/send?phone=5518981074447&text=Vim%20pelo%20site%20e%20preciso%20de%20suporte"
                        target="_blank"
                        class="flex items-center justify-center px-4 py-2 text-xs font-semibold text-white transition-all bg-green-500 rounded-full hover:scale-105"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12.001 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.95 9.95 0 0 1-5.03-1.355L2.005 22l1.352-4.968A9.95 9.95 0 0 1 2.001 12c0-5.523 4.477-10 10-10M8.593 7.3l-.2.008a1 1 0 0 0-.372.1a1.3 1.3 0 0 0-.294.228c-.12.113-.188.211-.261.306A2.73 2.73 0 0 0 6.9 9.62c.002.49.13.967.33 1.413c.409.902 1.082 1.857 1.97 2.742c.214.213.424.427.65.626a9.45 9.45 0 0 0 3.84 2.046l.568.087c.185.01.37-.004.556-.013a2 2 0 0 0 .833-.231a5 5 0 0 0 .383-.22q.001.002.125-.09c.135-.1.218-.171.33-.288q.126-.13.21-.302c.078-.163.156-.474.188-.733c.024-.198.017-.306.014-.373c-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.402-.621a.5.5 0 0 0-.176-.041a.48.48 0 0 0-.378.127c-.005-.002-.072.055-.795.931a.35.35 0 0 1-.368.13a1.4 1.4 0 0 1-.191-.066c-.124-.052-.167-.072-.252-.108a6 6 0 0 1-1.575-1.003c-.126-.11-.243-.23-.363-.346a6.3 6.3 0 0 1-1.02-1.268l-.059-.095a1 1 0 0 1-.102-.205c-.038-.147.061-.265.061-.265s.243-.266.356-.41c.11-.14.203-.276.263-.373c.118-.19.155-.385.093-.536q-.42-1.026-.868-2.041c-.059-.134-.234-.23-.393-.249q-.081-.01-.162-.016a3 3 0 0 0-.403.004z"
                          />
                        </svg>
                        <span class="ml-2">Suporte</span>
                      </a>
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
          <Logo />
        </div>
        <nav class="flex flex-col flex-1">
          <ul role="list" class="flex flex-col flex-1 gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-for="item in navigation" :key="item.name">
                  <RouterLink
                    v-if="!item.children"
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
                  <Disclosure as="div" v-else v-slot="{ open }">
                    <DisclosureButton
                      :class="[
                        $route.path === item.href
                          ? 'bg-neutral-700'
                          : 'hover:bg-neutral-700',
                        'flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-neutral-100',
                      ]"
                    >
                      <ChevronRightIcon
                        :class="[
                          open
                            ? 'rotate-90 text-neutral-500'
                            : 'text-neutral-400',
                          'h-4 w-4 shrink-0',
                        ]"
                        aria-hidden="true"
                      />
                      {{ item.name }}
                    </DisclosureButton>
                    <DisclosurePanel as="ul" class="px-2 mt-1">
                      <li v-for="subItem in item.children" :key="subItem.name">
                        <DisclosureButton as="div">
                          <RouterLink
                            :class="[
                              $route.path === subItem.href
                                ? 'bg-neutral-700'
                                : 'hover:bg-neutral-700',
                              'block rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-white-100',
                            ]"
                            :to="subItem.href"
                            >{{ subItem.name }}</RouterLink
                          ></DisclosureButton
                        >
                      </li>
                    </DisclosurePanel>
                  </Disclosure>
                </li>
                <li class="pt-2">
                  <a
                    href="https://api.whatsapp.com/send?phone=5518981074447&text=Vim%20pelo%20site%20e%20preciso%20de%20suporte"
                    target="_blank"
                    class="flex items-center justify-center px-4 py-2 text-xs font-semibold text-white transition-all bg-green-500 rounded-full hover:scale-105"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12.001 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.95 9.95 0 0 1-5.03-1.355L2.005 22l1.352-4.968A9.95 9.95 0 0 1 2.001 12c0-5.523 4.477-10 10-10M8.593 7.3l-.2.008a1 1 0 0 0-.372.1a1.3 1.3 0 0 0-.294.228c-.12.113-.188.211-.261.306A2.73 2.73 0 0 0 6.9 9.62c.002.49.13.967.33 1.413c.409.902 1.082 1.857 1.97 2.742c.214.213.424.427.65.626a9.45 9.45 0 0 0 3.84 2.046l.568.087c.185.01.37-.004.556-.013a2 2 0 0 0 .833-.231a5 5 0 0 0 .383-.22q.001.002.125-.09c.135-.1.218-.171.33-.288q.126-.13.21-.302c.078-.163.156-.474.188-.733c.024-.198.017-.306.014-.373c-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.402-.621a.5.5 0 0 0-.176-.041a.48.48 0 0 0-.378.127c-.005-.002-.072.055-.795.931a.35.35 0 0 1-.368.13a1.4 1.4 0 0 1-.191-.066c-.124-.052-.167-.072-.252-.108a6 6 0 0 1-1.575-1.003c-.126-.11-.243-.23-.363-.346a6.3 6.3 0 0 1-1.02-1.268l-.059-.095a1 1 0 0 1-.102-.205c-.038-.147.061-.265.061-.265s.243-.266.356-.41c.11-.14.203-.276.263-.373c.118-.19.155-.385.093-.536q-.42-1.026-.868-2.041c-.059-.134-.234-.23-.393-.249q-.081-.01-.162-.016a3 3 0 0 0-.403.004z"
                      />
                    </svg>
                    <span class="ml-2">Suporte</span>
                  </a>
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
        <div class="flex items-center justify-end flex-1">
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

import { TrophyIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";
import { useAuthStore } from "../store/auth";
import { RouterLink, useRouter } from "vue-router";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import Logo from "../components/Logo.vue";

const authStore = useAuthStore();
const router = useRouter();

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Afiliados", href: "/affiliates" },
  {
    name: "Pedidos",
    children: [
      { name: "Todos", href: "/orders/all", param: "all" },
      { name: "Aguardando envio", href: "/orders/awaited", param: "awaited" },
      { name: "Postados", href: "/orders/posted", param: "posted" },
    ],
  },
  {
    name: "Integração",
    children: [
      {
        name: "Checkout",
        href: "/integration/checkout",
      },
      { name: "Gateway", href: "/integration/gateway" },
    ],
  },
  {
    name: "Dados NFE",
    href: "/dados-nf",
  },
  {
    name: "Postagem",
    href: "/postagem",
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
