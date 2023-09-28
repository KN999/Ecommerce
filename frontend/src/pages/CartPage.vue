<template>
  <div>
    <q-page class="text-center" style="min-height: 20vh; width: 100vw">
      <q-card-section style="min-width: 100vw; max-height: 400px; margin: auto;">
        <div class="text-center">
          <h3 class="text-center">Cart</h3>
          <q-btn @click="logout" label="Logout" color="deep-orange-6" style="height: 40px;" class="q-ma-sm"/> <br />
        </div>
      </q-card-section>
    </q-page>
    <!-- <div v-if="cart" v-for="(item, index) in cart" :key="index" class="row flex flex-center"> -->
      <!-- <item-component :item="item" :cart="cart" @update-cart="updateCart" :key="updateItemComp"></item-component> -->
    <!-- </div> -->
    <div v-if="cart" class="row flex flex-center">
      <q-table
          title="Estimates"
          :rows="cart"
          :columns="columns"
          row-key="name"
          hide-bottom
        />
      </div>
    <div v-else>
      Cart is Empty
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

export default {
  components: {
    ItemComponent
  },
  data() {
    return {
      cart: [],
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
      axiosInstance.get("/api/user/cart")
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
              name: 'Over All Cost',
              price: '-',
              quantity: '-',
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
    register() {
      this.showLoader();

      const axiosInstance = axios.create({
        baseURL: this.url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('authToken')
        },
      });

      axiosInstance.get(this.url)
      .then((response) => {
        this.data = response.data;
        console.log("Response: ",response);
        this.hideLoader();
      })
      .catch((error) => {
        console.error("Error fetching data: ",error);
        this.hideLoader();
      })

      console.log("username: "+this.email);
      console.log("password: "+this.password);
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
