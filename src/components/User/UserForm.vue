<!-- src/components/UserForm.vue -->
<template>
  <div class="bg-white p-4 shadow-md rounded-lg mb-4">
    <h2 class="text-xl font-semibold mb-4">
      {{ initialUser ? "Edit User" : "Create User" }}
    </h2>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="name" class="block mb-1 text-sm text-gray-600">Name:</label>
        <input
          type="text"
          v-model="name"
          id="name"
          class="w-full px-4 py-2 text-sm border rounded-lg"
        />
        <span v-if="nameError" class="text-sm text-red-500">{{
          nameError
        }}</span>
      </div>
      <div class="mb-4">
        <label for="job" class="block mb-1 text-sm text-gray-600">Job:</label>
        <input
          type="job"
          v-model="job"
          id="job"
          class="w-full px-4 py-2 text-sm border rounded-lg"
        />
        <span v-if="jobError" class="text-sm text-red-500">{{ jobError }}</span>
      </div>
      <div class="flex justify-end">
        <button
          type="button"
          @click="cancel"
          class="px-4 py-2 mr-2 border rounded-lg"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg"
          :disabled="loading"
        >
          {{ initialUser ? "Update" : "Create" }}
        </button>
      </div>
    </form>
    <p v-if="error" class="mt-4 text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { useUserForm } from "../../composables/useUserForm";
import type { User } from "../../services/userService";

const props = defineProps<{ initialUser: User | null }>();
const emit = defineEmits<{
  (e: "submit"): void;
  (e: "cancel"): void;
}>();

const { name, job, nameError, jobError, error, loading, submitForm } =
  useUserForm(props.initialUser);

const cancel = () => {
  emit("cancel");
};
</script>
