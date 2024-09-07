<template>
  <AppLayout>
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-semibold">Dashboard</h2>
      </div>
      <DashboardStats />
      <CreditHistory />
    </div>
  </AppLayout>
</template>
<script setup>
import AppLayout from "../layouts/AppLayout.vue";
import DashboardStats from "../components/DashboardStats.vue";
import CreditHistory from "../components/CreditHistory.vue";
import { baseUrl } from "../config/baseurl";
console.log(baseUrl);
</script>
