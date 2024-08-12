<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Hamburger Button -->
    <button
      @click="toggleSidebar"
      class="lg:hidden p-4 text-black fixed top-0 left-0 z-10 mt-3"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <!-- Sidebar -->
    <aside
      :class="{
        'translate-x-0': isSidebarOpen,
        '-translate-x-64': !isSidebarOpen,
      }"
      class="lg:translate-x-0 lg:relative lg:w-64 w-64 lg:block fixed inset-y-0 left-0 bg-blue-800 text-white p-4 transform transition-transform duration-300"
    >
      <h2 class="text-lg font-semibold lg:mt-0 mt-12">Dashboard</h2>
      <nav class="mt-4">
        <ul>
          <li>
            <router-link to="/dashboard/user" class="block py-2"
              >User Profile</router-link
            >
          </li>
          <li><button @click="logout" class="block py-2">Logout</button></li>
        </ul>
      </nav>
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-6 w-full">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import authService from "../services/authService";
import { useRouter } from "vue-router";

const router = useRouter();
const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const logout = () => {
  authService.logout();
  router.push("/login");
};
</script>

<style scoped>
@media (min-width: 1024px) {
  .lg\:translate-x-0 {
    transform: translateX(0);
  }
  .lg\:relative {
    position: relative;
  }
}
</style>
