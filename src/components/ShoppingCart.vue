<template>
<div>
  <h1>Shopping cart</h1>
  <ul>
    <li v-for="product in products">
      {{product.title}} - {{product.price}} - {{product.quantity}}
    </li>
  </ul>
  <p>{{total}}</p>
  <button @click="$store.dispatch('checkout')"> Checkout </button>
  <p v-if="$store.state.checkoutStatus">{{$store.state.checkoutStatus}}</p>
</div>

</template>

<script>
    export default {
        name: "ShoppingCart",
      computed:{
          products()
          {
            return this.$store.getters.cartProducts
          },
        total()
        {
          return this.$store.getters.cartTotal
        }
      }
    }
</script>

<style scoped>

</style>
