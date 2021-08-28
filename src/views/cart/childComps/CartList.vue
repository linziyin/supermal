<template>
    <div class="cart-list">
        <scroll class="content" ref="scroll">
            <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
        </scroll>
        <!-- <li v-for="(item,index) in cartList" :key="index">{{item}}</li> -->
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

export default {
   name: "CartList",
   components:{
       Scroll,
       CartListItem
   },
   activated(){
       this.$refs.scroll.refresh()
   },
   computed:{
       ...mapGetters(['cartList'])
   }
}
</script>

<style scoped>
.cart-list{
    position: relative;
    height: 100vh;
}

.content{
    height: calc(100% - 44px - 49px );
    overflow: hidden;
}
</style>
