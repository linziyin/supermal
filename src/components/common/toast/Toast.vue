<template>
    <div class="toast" v-show="isShow">
        <div>{{message}}</div>
    </div>
</template>

<script>
export default {
   name: "Toast",
   props:{
       message:{
           type:String,
           default:''
       },
       isShow:{
           type:Boolean,
           default:false
       }
   },
//    data(){
//        return {
//            message: '默认文字',
//            isShow: false,
//        }
//    },

   methods:{
       show(message,duration) {
        //    console.log("true")
           console.log(message)
           this.isShow = true;
           this.message = message
           console.log(this.message)
           
           setTimeout(() => {
            // console.log("false")

            this.isShow = false;
            this.message = 'kong';
            console.log(this.message)

           }, duration);
       }
   }
}
</script>

<style scoped>
.toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50%);
    padding: 18px 10px;
    color: #fff;
    background-color: rgba(0,0,0,.7);
    z-index: 999;
}

</style>
