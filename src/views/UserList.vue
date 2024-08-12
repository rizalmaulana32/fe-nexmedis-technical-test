<!-- src/views/UserList.vue -->
<template>
  <DashboardLayout>
    <h1 class="text-2xl font-semibold mb-4 text-center lg:text-left">
      User Management
    </h1>

    <button
      @click="showCreateForm = true"
      class="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
    >
      Create New User
    </button>
    <div class="overflow-x-auto">
      <table class="editor_listing_table bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">ID</th>
            <th class="py-2 px-4 border-b">First Name</th>
            <th class="py-2 px-4 border-b">Last Name</th>
            <th class="py-2 px-4 border-b">Email</th>
            <th class="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="py-2 px-4 border-b text-center">{{ user.id }}</td>
            <td class="py-2 px-4 border-b text-center">
              {{ user.first_name }}
            </td>
            <td class="py-2 px-4 border-b text-center">{{ user.last_name }}</td>
            <td class="py-2 px-4 border-b text-center">{{ user.email }}</td>
            <td class="py-2 px-4 border-b text-center">
              <button @click="editUser(user)" class="px-2 py-1 text-blue-500">
                Edit
              </button>
              <button
                @click="deleteUser(user.id)"
                class="px-2 py-1 text-red-500"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <UserForm
      v-if="showCreateForm || selectedUser"
      :initialUser="selectedUser"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import UserForm from "../components/User/UserForm.vue";
import userService from "../services/userService";
import type { User } from "../services/userService";

const users = ref<User[]>([]);
const showCreateForm = ref(false);
const selectedUser = ref();

const loadUsers = async () => {
  try {
    const response: any = await userService.getUsers();
    users.value = response.data.data;
  } catch (error) {
    console.error("Failed to load users:", error);
  }
};

const editUser = (user: User) => {
  selectedUser.value = {
    id: user.id,
    name: user.first_name,
    job: user.last_name,
  };
};

const deleteUser = async (id: number) => {
  try {
    await userService.deleteUser(id);
    users.value = users.value.filter((user) => user.id !== id);
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};

const handleSubmit = async () => {
  await loadUsers();
  showCreateForm.value = false;
  selectedUser.value = null;
};

const handleCancel = () => {
  showCreateForm.value = false;
  selectedUser.value = null;
};

onMounted(loadUsers);
</script>

<style scoped>
.editor_listing_table {
  @apply w-full;
}
</style>
