<template>
    <q-card class="text-center flex flex-center" >
        <div class="q-ma-lg">
            <q-img src="https://cdn.quasar.dev/img/non-existent-image-src.png" style="height: 140px; max-width: 150px">
                <template v-slot:error>
                    <div class="absolute-full flex flex-center bg-grey text-black">
                        Cannot load image
                    </div>
                </template>
            </q-img>
            <span class="row"> Name: {{ item.name }}</span>
            <span class="row"> Price: ₹ {{ item.price }}</span>
            <q-btn v-if="item.quantity == 0" @click="increaseCount" label="Add to cart" color="primary" style="height: 10px; " class="row"/>
            <div v-if="item.quantity > 0">
                <q-btn :disable="item.quantity <= 0" @click="decreaseCount"  label="-" color="primary" style="height: 10px; "/> 
                <q-btn :label="item.quantity" color="grey" class="q-ma-sm"></q-btn>
                <q-btn @click="increaseCount" label="+" color="primary" style="height: 10px; "/>
            </div>  
        </div>
        <q-inner-loading
          :showing="isLoaderVisible"
          style="color: deepskyblue"
          label="Please wait..."
          label-class="text-blue"
          label-style="font-size: 1.1em"
        />
    </q-card>
</template>
<script>
import axios from 'axios';

export default {
    props: {
        item: Object,
        cart: Array
    },
    data() {
        return {
            isLoaderVisible: false
        };
    },
    mounted() {
        let itemCnt = -1;
        console.log("Cart: ", this.cart);

        const item = this.cart.find( (cartItem) => { return cartItem.name == this.item.name; });
        console.log("itemIndex: ", item);
        itemCnt = (item)? item.quantity : 0;
        console.log("itemCnt: ", itemCnt);
        this.item.quantity = itemCnt;
        console.log("Item Qunatity: ", this.item.quantity);
    },
    methods: {
        increaseCount() {
            this.item.quantity++;
            let payload = {
                "operation": "add",
                "itemName": this.item.name
            }

            this.updateCart(payload);
        },
        decreaseCount() {
            this.item.quantity--;
            let payload = {
                "operation": "delete",
                "itemName": this.item.name
            }

            this.updateCart(payload);
        },
        updateCart(payload) {
            const axiosInstance = axios.create({
                baseURL: this.url,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('authToken')
                },
            });

            this.showLoader();

            axiosInstance.patch("/api/cart", payload)
            .then((response) => {
                this.hideLoader();
                if (response.data) {
                    let { cart } = response.data;

                    if(cart) {
                        this.$emit("update-cart", cart);
                    }

                    alert(response.data.message)
                }
            })
            .catch((error) => {
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
}
</script>