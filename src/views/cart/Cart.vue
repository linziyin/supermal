<template>
   <div>
      <nav-bar class="nav-bar">
         <div slot="center">购物车({{cartLength}})</div>
      </nav-bar>
      
      <cart-list></cart-list>

      <cart-bottom-bar></cart-bottom-bar>
   </div>
   
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters} from 'vuex'

export default {
   name: "Cart",
   components:{
      NavBar,
      CartList,
      CartBottomBar
   },
   computed:{
      // cartLength(){
      //    return this.$store.getters.cartLength
      // }

      // 将getters里的方法转为计算属性
      ...mapGetters(['cartLength'])
      // ...mapGetters({
      //    length:'cartLength'
      // })
   }
}
</script>

<style scoped>
.nav-bar{
   background-color: var(--color-tint);
   color: #fff;
}
</style>
