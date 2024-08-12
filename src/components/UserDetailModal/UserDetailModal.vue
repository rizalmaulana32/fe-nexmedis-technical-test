<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <h2 class="text-xl font-semibold mb-4">User Details</h2>
      <ul>
        <li><strong>ID:</strong> {{ user?.id }}</li>
        <li><strong>First Name:</strong> {{ user?.first_name }}</li>
        <li><strong>Last Name:</strong> {{ user?.last_name }}</li>
        <li><strong>Email:</strong> {{ user?.email }}</li>
        <li v-if="user?.avatar">
          <strong>Avatar:</strong>
          <img
            :src="user.avatar"
            alt="User Avatar"
            class="w-16 h-16 rounded-full"
          />
        </li>
      </ul>
      <div class="flex justify-end mt-4">
        <button
          @click="close"
          class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
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
