import vuex from 'vuex'
import vue from 'vue'
import shop from "../api/shop";

 vue.use(vuex);

export default new vuex.Store({

  state:{
    products : [],
    cart: [],
    checkoutStatus : null
  },

  getters:{

    availableProducts(state,getters)
    {
      return state.products.filter(product => product.inventory > 0)
    },

    cartProducts(state){
      return state.cart.map(cartItem => {

        const product = state.products.find(product => product.id === cartItem.id)
        return{
          title : product.title,
          price : product.price,
          quantity : cartItem.quantity
        }
      })
    },

    cartTotal(state,getters)
    {
      let total = 0;
        getters.cartProducts.forEach(product =>
        {
          total += product.price * product.quantity
        });

      return total
    }
  },

  actions : {
    fetchproducts({commit}) {

      return new Promise((resolve ,reject) =>
      {
        shop.getProducts(products => {
          // console.log("The products" , products);
          commit('setproducts', products)
          resolve()
        });
      })
    },

      addProductToCart(context , product)
      {
        if(product.inventory > 0)
        {
          const cartitem = context.state.cart.find(item => item.id === product.id)
          if(!cartitem)
          {

            context.commit('pushProductToCart' , product.id)
          }
          else
          {
            context.commit('incrementItemQuantity' , cartitem)
          }

          context.commit('decrementProductInventory' , product)
        }

    },

    checkout({state,commit})
    {
       shop.buyProducts(state.cart,
         ()=>
         {
             commit('emptyCart'),
             commit('setCheckoutStatus','Success')
         },
       () =>
         {
           commit('setCheckoutStatus','Fail')
         }
       )
    }
  },


    mutations: {

      setproducts(state, products) {
        this.state.products = products;

        console.log("The prodcts :" + products);
      }
      ,
      pushProductToCart(state , productId)
      {
        state.cart.push({
          id : productId,
          quantity : 1
        })
      },

      incrementItemQuantity(state,cartItem)
      {

        cartItem.quantity++
      },

      decrementProductInventory(state,product)
      {
        product.inventory --
      },
      setCheckoutStatus(state,status)
      {
        state.checkoutStatus = status
      },
      emptyCart(state)
      {
        state.cart = []
      }
    }


});
