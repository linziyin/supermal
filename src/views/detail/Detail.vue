<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <good-list ref="recommend" :goods="recommends"></good-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <toast :message="message" :is-show="show"></toast>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodList from 'components/content/goods/GoodList'
import Toast from 'components/common/toast/Toast'

import { getDetail,Goods,Shop,GoodsParam,getRecommend } from "network/detail";
import { itemListenerMixin , backTopMixin} from "common/mixin";
import { debouce } from 'common/utils'
import {mapActions} from 'vuex'


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    GoodList,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Toast
  },
  mixins:[itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo: {},
      paramInfo: {},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      // themeTopYs:[0,1000,2000,3000]
      // getThemeTopY : null,
      currentindex:0,

      message:'',
      show:true,
    };
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid;

    //根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data=res.result;
      this.topImages = data.itemInfo.topImages;
      
      this.goods = new Goods (data.itemInfo,data.columns,data.shopInfo.services)

      this.shop = new Shop(data.shopInfo)

      this.detailInfo = data.detailInfo

      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      if(data.rate.cRate !==0){
        this.commentInfo=data.rate.list[0];
      }

        // 图片还没加载好
      this.$nextTick(() =>{
        this.themeTopYs =[]

        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        console.log(this.themeTopYs)
      })

    });

    // 请求推荐数据
    getRecommend().then(res => {
      // console.log(res)
       this.recommends =res.data.list
    });

  },
  mounted(){
    
  },
  methods:{
    ...mapActions(['addCart']),
    imageLoad(){
      this.$refs.scroll.refresh();
      // this.getThemeTopY();
    },
    titleClick(index){
      // console.log(index)
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position){
      // console.log(position)
      const positionY = -position.y;
      let length = this.themeTopYs.length
      for(let i = 0;i < length-1 ; i++){
        if(this.currentindex != i && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
          this.currentindex =i;
          // console.log(this.currentindex)
          this.$refs.nav.currentindex = this.currentindex
        }
      }
        
      this.listenShowBackTop(position)
    },
    addToCart(){
       const product = {}
        // 1.对象信息
        product.iid = this.iid;
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc;
        product.newPrice = this.goods.realPrice;
        // console.log(product)
        // this.$store.commit('addToCart',product)

        // this.$store.dispatch('addCart',product)
        // console.log(this.$store.state.cartList)
        // console.log(this.$store.state.cartList.length)
        // this.$store.dispatch('addCart',product).then(res =>{
        //   console.log(res)
        // })
        this.addCart(product).then(res =>{
          console.log(res)
          this.message=res;
          this.show=true
          setTimeout(() => {
            this.show=false
            this.message=''
          }, 2000);
          // console.log(this.$toast)
          // console.log(this.$toast.methods.show)

          // this.$toast.show()
        
          // this.$toast.methods.show( res , 10000)
          
          // this.$toast.show(res,2000)
        })
    }

  }
};
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}

.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content{
  height: calc(100% - 44px - 49px);
}
</style>
