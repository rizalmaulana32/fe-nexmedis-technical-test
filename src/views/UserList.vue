<template>
  <DashboardLayout>
    <h1 class="text-2xl font-semibold mb-4 text-center lg:text-left">
      User Management
    </h1>

    <button
      @click="openModal"
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
            <td class="py-2 px-4 border-b text-center space-x-2">
              <button @click="viewUser(user)" class="w-7">
                <img src="../assets/eye-svgrepo-com.svg" alt="" srcset="" />
              </button>
              <button @click="editUser(user)" class="w-7">
                <img
                  src="../assets/pencil-edit-svgrepo-com.svg"
                  alt=""
                  srcset=""
                />
              </button>
              <button @click="showDeleteConfirmation(user)" class="w-7">
                <img
                  src="../assets/trash-alt-svgrepo-com.svg"
                  alt=""
                  srcset=""
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal with UserForm -->
    <Modal :isVisible="showModal" :title="modalTitle" @close="closeModal">
      <UserForm
        :initialUser="selectedUser"
        @submit="handleSubmit"
        @cancel="handleCancel"
        @success="handleSuccess"
      />
    </Modal>

    <!-- Confirmation Dialog -->
    <ConfirmationDialog
      v-if="deleteConfirmationVisible"
      :isVisible="deleteConfirmationVisible"
      :message="'Are you sure you want to delete this user?'"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />

    <!-- User Detail Modal -->
    <UserDetailModal
      v-if="showUserDetailModal"
      :isVisible="showUserDetailModal"
      :user="selectedUser"
      @close="closeUserDetailModal"
    />
  </DashboardLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import UserForm from "../components/User/UserForm.vue";
import Modal from "../components/Modal/Modal.vue";
import ConfirmationDialog from "../components/ConfirmationDialog/ConfirmationDialog.vue";
import UserDetailModal from "../components/UserDetailModal/UserDetailModal.vue";
import userService from "../services/userService";
import type { User } from "../services/userService";

const users = ref<User[]>([]);
const showModal = ref(false);
const selectedUser = ref<User | null>(null);
const modalTitle = ref("");
const deleteConfirmationVisible = ref(false);
const userToDelete = ref<User | null>(null);
const showUserDetailModal = ref(false);

const loadUsers = async () => {
  try {
    const response: any = await userService.getUsers();
    users.value = response.data.data;
  } catch (error) {
    console.error("Failed to load users:", error);
  }
};

const openModal = () => {
  selectedUser.value = null;
  modalTitle.value = "Create New User";
  showModal.value = true;
};

const editUser = (user: any) => {
  selectedUser.value = {
    id: user.id,
    name: user.first_name,
    job: user.last_name,
  };
  modalTitle.value = "Edit User";
  showModal.value = true;
};

const showDeleteConfirmation = (user: User) => {
  userToDelete.value = user;
  deleteConfirmationVisible.value = true;
};

const confirmDelete = async () => {
  if (userToDelete.value) {
    try {
      await userService.deleteUser(userToDelete.value.id);
      users.value = users.value.filter(
        (user) => user.id !== userToDelete.value!.id
      );
      deleteConfirmationVisible.value = false;
      userToDelete.value = null;
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  }
};

const cancelDelete = () => {
  deleteConfirmationVisible.value = false;
  userToDelete.value = null;
};

const closeModal = () => {
  showModal.value = false;
  selectedUser.value = null;
};

const handleSubmit = async () => {
  await loadUsers();
};

const handleCancel = () => {
  closeModal();
};

const handleSuccess = async () => {
  await loadUsers();
  closeModal();
};

const viewUser = (user: User) => {
  selectedUser.value = user;
  showUserDetailModal.value = true;
};

const closeUserDetailModal = () => {
  showUserDetailModal.value = false;
  selectedUser.value = null;
};

onMounted(loadUsers);
</script>

<style scoped>
.editor_listing_table {
  @apply w-full;
}
</style>
