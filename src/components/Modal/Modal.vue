<!-- src/components/Modal.vue -->
<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">{{ title }}</h3>
        <button @click="closeModal" class="text-gray-600 hover:text-gray-900">
          &times;
        </button>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps<{ isVisible: boolean; title: string }>();
const emit = defineEmits<{ (e: "close"): void }>();

const closeModal = () => {
  emit("close");
};
</script>
