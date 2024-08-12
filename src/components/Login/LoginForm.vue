<template>
  <form @submit.prevent="login" class="flex flex-col gap-4">
    <div class="mb-4">
      <label for="email" class="block mb-1 text-sm text-gray-600">Email:</label>
      <input
        type="email"
        v-model="email"
        id="email"
        class="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span v-if="emailError" class="text-sm text-red-500">{{
        emailError
      }}</span>
    </div>
    <div class="mb-4">
      <label for="password" class="block mb-1 text-sm text-gray-600"
        >Password:</label
      >
      <input
        type="password"
        v-model="password"
        id="password"
        class="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span v-if="passwordError" class="text-sm text-red-500">{{
        passwordError
      }}</span>
    </div>
    <button
      type="submit"
      :disabled="loading"
      class="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <span v-if="loading">Loading...</span>
      <span v-else>Login</span>
    </button>
    <p v-if="error" class="mt-4 text-sm text-center text-red-500">
      {{ error }}
    </p>
  </form>
</template>

<script setup lang="ts">
import { useLogin } from "../../composables/useLogin";

const { email, password, emailError, passwordError, error, loading, login } =
  useLogin();
</script>
