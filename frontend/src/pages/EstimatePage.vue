<template>
  <div>
    <q-page class="text-center" style="min-height: 20vh; width: 100vw">
      <q-card-section style="min-width: 100vw; max-height: 400px; margin: auto;">
        <div>
            <h3 class="text-center">Estimate</h3>
            <q-btn v-if="pdfUrl" class="q-ma-sm" color="green" @click="shareViaWhatsApp" style="height: 20px;" no-caps>Share via Whatsapp</q-btn>
          <div>
            <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" height="600px"></iframe>
          </div>
        </div>
      </q-card-section>
    </q-page>
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
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import jsPDF from 'jspdf';

export default {
  data() {
    return {
      cart: [],
      pdfUrl: null,
      pdfBlobUrl: null,
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
    this.getEstimation();
  },
  methods: {
    getEstimation() {
      const axiosInstance = axios.create({
        baseURL: this.url, 
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': localStorage.getItem('authToken')
        },
      });

      this.showLoader();
      axiosInstance.get("/api/estimation/"+this.$route.params.estimation)
        .then((response) => {
          debugger;
          let res = response.data;
          console.log(response)
          if(res) {
            this.cart = res.cart;
            let estimateCart = [];

            this.cart.forEach((cartItem) => {
              let estimateCartItem = [];
              estimateCartItem.push(cartItem.name);
              estimateCartItem.push(String(cartItem.price));
              estimateCartItem.push(String(cartItem.quantity));
              estimateCartItem.push(String(cartItem.overallPrice));

              estimateCart.push(estimateCartItem);
            })

            this.generatePDF(estimateCart);
          }
          
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
    },
    async generatePDF(data) {
      try {
        const doc = new jsPDF();

        const headers = ['Product Name', 'Price', 'Quantity', 'Overall Price'];

        const x = 10;
        const y = 20;
        const tableWidth = 180;
        const tableHeight = 20;

        const cellWidth = tableWidth / headers.length;
        const cellHeight = tableHeight;

        headers.forEach((header, index) => {
          doc.setFillColor(150, 150, 150);
          doc.rect(x + index * cellWidth, y, cellWidth, cellHeight);
          doc.setTextColor(0);
          doc.text(header, x + index * cellWidth + 5, y + cellHeight / 2, { align: 'left', valign: 'middle' });
        });

        data.forEach((row, rowIndex) => {
          row.forEach((cell, cellIndex) => {
            doc.setDrawColor(0);
            doc.rect(x + cellIndex * cellWidth, y + (rowIndex + 1) * cellHeight, cellWidth, cellHeight);
            doc.setTextColor(0);
            doc.text(cell, x + cellIndex * cellWidth + 5, y + (rowIndex + 1.5) * cellHeight, { align: 'left', valign: 'middle' });
          });
        });

        const pdfBlob = doc.output('blob');

        this.pdfUrl = URL.createObjectURL(pdfBlob);
        console.log("pdfURL: ",this.pdfUrl)
        console.log("pdfBlob: ",JSON.stringify(pdfBlob))
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    },
    shareViaWhatsApp() {
      if (this.pdfUrl) {
        const text = `Check out this PDF!. Here is the link to access it. http://localhost:9000${this.$route.fullPath}`;
        const url = this.pdfUrl;

        const whatsappShareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}&amp;url=${encodeURIComponent(url)}`;

        window.open(whatsappShareLink, '_blank');
      }
    },
  },
  beforeDestroy() {
    if (this.pdfBlobUrl) {
      URL.revokeObjectURL(this.pdfBlobUrl);
    }
  },
};
</script>
