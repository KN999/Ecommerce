<template>
  <div>
    <q-page class="text-center" style="min-height: 20vh; width: 100vw">
      <q-card-section style="min-width: 100vw; max-height: 400px; margin: auto;">
        <div class="text-center">
          <h3 class="text-center">Cart</h3>
          <!-- <q-btn label="Generate Estimate" @click="$router.push('/cart')" icon="bill" color="orange-6" style="height: 40px;" class="q-ma-sm"/> -->
          <div v-if="cart.length > 1">
            <q-btn @click="addEstimate" color="primary">Generate Estimate</q-btn>
          </div>
        </div>
      </q-card-section>
    </q-page>
    <!-- <div v-if="cart" v-for="(item, index) in cart" :key="index" class="row flex flex-center"> -->
      <!-- <item-component :item="item" :cart="cart" @update-cart="updateCart" :key="updateItemComp"></item-component> -->
    <!-- </div> -->
    <div v-if="cart.length > 1" class="row flex flex-center">
      <q-table
          title=""
          :rows="cart"
          :columns="columns"
          row-key="name"
          hide-bottom
        />
      </div>
    <div v-else class="text-center">
      <h3>Cart is Empty</h3>
    </div>
    <q-inner-loading
      :showing="isLoaderVisible"
      style="color: deepskyblue"
      label="Please wait..."
      label-class="text-blue"
      label-style="font-size: 1.1em"
    />
  </div>
</template>

<script>
import axios from "axios";
import ItemComponent from "src/components/ItemComponent.vue";
import { v4 as uuidv4 } from 'uuid';

export default {
  components: {
    ItemComponent
  },
  data() {
    return {
      cart: [],
      uuid: '',
      columns: [
        { name: 'name', align: 'center', label: 'Product Name', field: 'name', sortable: true },
        { name: 'price', align: 'center', label: 'Price', field: 'price', sortable: true },
        { name: 'quantity', align: 'center', label: 'Quantity', field: 'quantity', sortable: true },
        { name: 'overallPrice', align: 'center', label: 'Overall Price', field: 'overallPrice', sortable: true },
      ],
      rows: [],
      isLoaderVisible: false
    };
  },
  mounted() {
    this.getCart();
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
      axiosInstance.get("/api/cart")
        .then((response) => {
          let res = response.data;
          console.log(res)
          if(res) {
            this.cart = res;
            let cost = 0;
            this.cart.forEach((cartItem) => {
              cartItem.overallPrice = (cartItem.price * cartItem.quantity);
              cost += cartItem.overallPrice;
            })

            this.cart.push({
              name: '',
              price: '',
              quantity: 'Total',
              overallPrice: cost
            })
          }
          
          this.hideLoader();
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          this.hideLoader();
        })
    },
    generateUUID() {
      this.uuid = uuidv4().substr(0, 8);
    },
    async addEstimate() {
      let payload = {
        url: await uuidv4().substr(0, 8),
        cart: this.cart
      }

      const axiosInstance = axios.create({
        baseURL: this.url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('authToken')
        },
      });

      this.showLoader();
      axiosInstance.post("/api/estimate", payload)
      .then((response) => {
        if(response)
          this.$router.push('/estimate/'+payload.url);

        this.hideLoader();
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        this.hideLoader();
      })
    },
    showLoader() {
      this.isLoaderVisible = true;
    },
    hideLoader() {
      this.isLoaderVisible = false;
    }
  }
};
</script>
