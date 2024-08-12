<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-max">
      <h3 class="text-lg font-semibold mb-4">{{ message }}</h3>
      <div class="flex justify-end">
        <button
          @click="confirm"
          class="px-4 py-2 bg-red-500 text-white rounded-lg mr-2"
        >
          Confirm
        </button>
        <button
          @click="cancel"
          class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps<{
  isVisible: boolean;
  message: string;
}>();

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "cancel"): void;
}>();

const confirm = () => {
  emit("confirm");
};

const cancel = () => {
  emit("cancel");
};
</script>
