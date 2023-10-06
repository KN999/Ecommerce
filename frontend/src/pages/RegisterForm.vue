<template>
  <div>
    <q-page>
      <q-card class="flex flex-center" style="height: 100vh; width: 100vw">
        <q-card-section style="max-width: 400px; max-height: 400px; margin: auto">
          <h3 class="text-center">Register</h3>
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
            <q-input
              v-model="confirmPassword"
              label="Confirm Password"
              type="password"
              outlined
              dense
              class="q-ma-sm"
            />
            <div class="text-center">
              <q-btn :disable="!(email && password && confirmPassword)" type="submit" label="Register" color="primary"/>
            </div>
            <div class="q-ma-sm">
              Already a user? <router-link :to="{ path: '/login' }">Login</router-link>
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

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      isLoaderVisible: false
    };
  },
  methods: {
    validateForm() {

      if(this.password !== this.confirmPassword) {
        alert("Password and confirm password should match")
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailRegex.test(this.email)) {
        this.register();
      } else {
        alert("Please enter correct email!");
      }
    },
    register() {
      this.showLoader();

      axios.post("/api/auth/register", {
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
        // console.error("Error fetching data: ",error);
        this.hideLoader();
      })
    },
    resetFormData() {
      this.email = "";
      this.password = "";
      this.confirmPassword = "";
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
