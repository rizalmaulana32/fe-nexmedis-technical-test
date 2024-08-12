<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h1 class="mb-6 text-2xl font-semibold text-center text-gray-700">
        Login
      </h1>
      <LoginForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from "../components/Login/LoginForm.vue";
</script>
