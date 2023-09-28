<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-toolbar class="bg-grey-9 text-white">
        <q-toolbar-title @click="$router.push('/')">
          Ecommerce
        </q-toolbar-title>
        <q-btn v-if="isCurrentRouteHome" @click="$router.push('/cart')" icon="shopping_cart" color="grey-6" style="height: 40px;" class="q-ma-sm"/>
        <q-btn @click="logout" label="Logout" color="deep-orange-6" style="height: 40px;" class="q-ma-sm"/> <br />
      </q-toolbar>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  computed: {
    isCurrentRouteHome() {
      return this.$route.path == '/';
    }
  },
  components: {},
  methods: {
    logout() {
      localStorage.setItem('authToken', '');
      this.$router.push('/login');
      return;
    }
  },
  setup () {
    return {}
  }
})
</script>
