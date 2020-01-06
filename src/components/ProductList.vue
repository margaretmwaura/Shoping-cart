<template>
  <div>
    <h1>Product list</h1>

    <h1 v-if="loading">The product are loading</h1>
    <ul v-else>
      <li v-for="product in products">{{product.title}} - {{product.price}} - {{product.inventory}}
      <button @click="addProductToCart(product)">Add to cart</button>
      </li>
    </ul>
  </div>

</template>

<script>
  import shop from "../api/shop";
  // import store from "../store/index"
    export default {
        name: "ProductList",

      data()
      {
        return{
          loading : false
        }
      },

      methods :
        {
          addProductToCart(product)
          {
            this.$store.dispatch('addProductToCart' , product)
          }
        },
      computed : {
          products()
          {
            return this.$store.getters.availableProducts
          }
       },

      created() {

          this.loading = true;
         this.$store.dispatch('fetchproducts')
        .then(() => this.loading = false)
      }
    }
</script>

<style scoped>

</style>
