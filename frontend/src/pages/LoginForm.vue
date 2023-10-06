<template>
  <div>
    <q-page>
      <q-card class="flex flex-center" style="height: 100vh; width: 100vw">
        <q-card-section style="max-width: 400px; max-height: 400px; margin: auto">
          <h3 class="text-center">Login</h3>
          <q-form @submit="validateForm">
            <q-input
              v-model="email"
              label="Email"
              outlined
              dense
              class="q-ma-sm"
            />
            <q-input
              v-model="password"
              label="Password"
              type="password"
              outlined
              dense
              class="q-ma-sm"
            />
            <div class="text-center">
              <q-btn :disable="!(email && password)" type="submit" label="Login" color="primary"/>
            </div>
            <div class="q-ma-sm">
              New here? <router-link :to="{ path: '/register' }">Register</router-link> with us
            </div>
          </q-form>
        </q-card-section>
        <q-inner-loading
          :showing="isLoaderVisible"
          style="color: deepskyblue"
          label="Please wait..."
          label-class="text-blue"
          label-style="font-size: 1.1em"
        />
      </q-card>
    </q-page>
  </div>
</template>

<script>
import axios from "axios";
import store from '../store';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: "",
      password: "",
      data: "",
      isLoaderVisible: false
    };
  },
  methods: {
    ...mapActions('auth', ['login']),
    validateForm() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailRegex.test(this.email)) {
        this.loginFn();
      } else {
        alert("Please enter correct email!");
      }
    },
    loginFn() {
      this.showLoader();
      axios.post("/api/auth/login", {
        username: this.email,
        password: this.password
      })
      .then((response) => {
        if(response.data.token) {
          this.data = response.data;
          localStorage.setItem('authToken', response.data.token)
          this.hideLoader();
          this.$router.push({ path: '/' });
        } else {
          alert(JSON.stringify(response.data.message));
          this.hideLoader();
        }
      })
      .catch((error) => {
        this.hideLoader();
      })
    },
    resetFormData() {
      this.email = "";
      this.password = "";
    },
    showLoader() {
      this.isLoaderVisible = true;
    },
    hideLoader() {
      this.isLoaderVisible = false;
    }
  },
};
</script>
