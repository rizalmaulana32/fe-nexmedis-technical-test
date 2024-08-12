<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
      <h2 class="text-2xl font-semibold mb-4">User Details</h2>
      <div class="flex items-center mb-4">
        <img
          v-if="user?.avatar"
          :src="user.avatar"
          alt="User Avatar"
          class="w-24 h-24 rounded-full border-2 border-gray-200"
        />
        <div class="ml-4">
          <h3 class="text-xl font-semibold">
            {{ user?.first_name }} {{ user?.last_name }}
          </h3>
          <p class="text-gray-600">{{ user?.email }}</p>
        </div>
      </div>
      <ul class="list-disc ml-6">
        <li><strong>ID:</strong> {{ user?.id }}</li>
        <li><strong>First Name:</strong> {{ user?.first_name }}</li>
        <li><strong>Last Name:</strong> {{ user?.last_name }}</li>
        <li><strong>Email:</strong> {{ user?.email }}</li>
      </ul>
      <div class="flex justify-end mt-4">
        <button
          @click="close"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { User } from "../../services/userService";

defineProps<{ isVisible: boolean; user: User | null }>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const close = () => {
  emit("close");
};
</script>
