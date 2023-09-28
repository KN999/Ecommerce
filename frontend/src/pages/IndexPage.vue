<template>
  <div>
    <q-page class="text-center" style="min-height: 20vh; width: 100vw">
      <q-card-section style="min-width: 100vw; max-height: 400px; margin: auto;">
        <div class="text-center">
          <h3 class="text-center">Inventory</h3>
        </div>
        <q-form @submit="search" class="row flex flex-center">
          <q-input v-model="query" label="Search" outlined dense class="q-ma-sm" style="width: 20vw"/>
          <q-btn :disable="query.length <= 0" type="submit" label="Search" color="primary" style="height: 40px;" no-caps/>
        </q-form>
      </q-card-section>
    </q-page>
  </div>
  <div v-if="items" v-for="(item, index) in items" :key="index" class="row flex flex-center">
    <item-component :item="item" :cart="cart" @update-cart="updateCart" :key="updateItemComp"></item-component>
  </div>
  <q-inner-loading
    :showing="isLoaderVisible"
    style="color: deepskyblue"
    label="Please wait..."
    label-class="text-blue"
    label-style="font-size: 1.1em"
  />
</template>
<script>
import axios from "axios";
import { mapGetters } from 'vuex';
import ItemComponent from '../components/ItemComponent.vue';
import router from "src/router";

export default {
  components: {
    ItemComponent
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
  },
  mounted() {
    this.getCart();
  },
  data() {
    return {
      query: "",
      data: "",
      items: [],
      cart: [],
      updateItemComp: 0,
      isLoaderVisible: false
    };
  },
  methods: {
    getCart() {
      const axiosInstance = axios.create({
        baseURL: this.url, 
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': localStorage.getItem('authToken')
        },
      });

      this.showLoader();
      axiosInstance.get("/api/user/cart")
        .then((response) => {
          let res = response.data;
          console.log(res)
          if(res)
            this.cart = res;
          
          this.hideLoader();
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          this.hideLoader();
        })
    },
    updateCart(cartRes) {
      debugger;
      this.cart = { ...cartRes };
    },
    search() {
      const axiosInstance = axios.create({
        baseURL: this.url, 
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': localStorage.getItem('authToken')
        },
      });

      this.showLoader();
      axiosInstance.get("http://localhost:3000/api/inventory/items/"+this.query)
      .then((response) => {
        debugger
        this.data = response.data;
        this.items = [];
        if(this.data) {
          this.items.push(this.data);
          this.updateItemComp++;
        }
        console.log("Response: ",response);
        this.resetFormData();
        this.hideLoader();
      })
      .catch((error) => {
        console.error("Error fetching data: ",error);
        this.hideLoader();
      })
    },
    resetFormData() {
      this.query = ""
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