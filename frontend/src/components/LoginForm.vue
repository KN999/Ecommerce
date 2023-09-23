<template>
  <div>
    <q-page>
      <q-card class="q-ma-md" style="max-width: 400px;">
        <q-card-section>
          <q-form @submit="login">
            <q-input
              v-model="email"
              label="Email"
              outlined
              dense
            />
            <q-input
              v-model="password"
              label="Password"
              type="password"
              outlined
              dense
            />
            <q-btn type="submit" label="Login" color="primary" />
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      // Implement your login logic here
      // Example: Send a request to your server for authentication
      // If successful, navigate to the dashboard or perform other actions
    },
  },
};
</script>
