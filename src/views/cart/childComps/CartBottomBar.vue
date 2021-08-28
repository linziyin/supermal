<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
            <span>全选</span>
        </div>  
        <div class="price">
            合计:{{totalPrice}}
        </div>
        <div class="calculate">
            去计算:({{checkLength}})
        </div>
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters} from 'vuex'
export default {
   name: "CartBottomBar",
   components:{
       CheckButton
   },
   computed:{
       ...mapGetters(['cartList']),
       totalPrice(){
           return '￥' + this.cartList.filter( item => {
               return item.checked
           }).reduce((preValue,item) =>{
               return preValue + item.newPrice * item.count
           }, 0).toFixed(2)
       },
       checkLength(){
           return this.cartList.filter(item => item.checked).length
       },
       isSelectAll(){
           if(this.cartList.length === 0) return false
           else return !this.cartList.find( item => !item.checked)
        //    if(this.cartList.length === 0) return false
        //    else return !(this.cartList.filter(item => !item.checked).length)

       }
   },
   methods:{
       checkClick(){
           if(this.isSelectAll){
               this.cartList.forEach( item =>item.checked=false)
           }
           else this.cartList.forEach( item =>item.checked=true)

       }
   }
}
</script>

<style scoped>
.bottom-bar{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    display: flex;
}

.check-content{
    display: flex;
    align-items: center;
    margin-left: 5px;
    width: 70px;
}
.check-button{
    width: 22px;
    height: 22px;
    line-height: 20;
    margin-right: 5px;
}

.price{
    margin-left: 20px;
    flex:1
}
.calculate{
    background-color: orangered;
    color: #fff;
    width: 100px;
    text-align: center;
}
</style>
