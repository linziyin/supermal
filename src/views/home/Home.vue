<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control 
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick" ref="tabControl1"  class="tab-control" v-show="isTabFixed">
    </tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true" @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view></feature-view>

      <tab-control 
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick" ref="tabControl2" 
      >
      </tab-control>
      <good-list :goods="goods[currentType].list"></good-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { itemListenerMixin, backTopMixin } from "common/mixin";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodList,
    Scroll,
    // BackTop,
  },
  mixins:[itemListenerMixin,backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      // isShowBackTop: false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
    };
  },
  
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 防抖动，图片加载完成的事件监听
    // const refresh = debouce(this.$refs.scroll.refresh, 200)

    // this.$bus.$on("itemImageLoad", () => {
    //   // console.log("417!")
    //   refresh()
    // })

    // 组件无offsettop属性，元素才有
    // console.log(this.$refs.tabControl.offsetTop)

    // 获取tabControl的offsetTop
    // 所有组件都有一个属性$el,用于获取组件中的元素
    // console.log(this.$refs.tabControl.$el.offsetTop)

  },
  destroyed(){
    console.log("home destoryed")
  },
  activated(){
    // console.log("activated")
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    // console.log("deactivated")
    this.saveY=this.$refs.scroll.getScrollY()
    // console.log(this.saveY)
  },
  methods: {
    /**
     * 事件监听相关
     */
    tabClick(index) {
      //  console.log(index)
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentindex = index;
      this.$refs.tabControl2.currentindex = index;

    },

    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // },
    
    contentScroll(position) {
      //  console.log(position)
      // 判断backTop是否显示
      // this.isShowBackTop = (-position.y) > 1000;
        this.listenShowBackTop(position)
      // 决定tabControl是否吸顶(position:fixed)
      this.isTabFixed= (-position.y) > this.tabOffsetTop

    }, 
    // listenShowBackTop(position){
    //   this.isShowBackTop = (-position.y) > 1000;
    // },
    
    loadMore(){
      //  console.log("wybxz!")
      this.getHomeGoods(this.currentType)

      // this.$refs.scroll.scroll.refresh()
    },

    swiperImageLoad(){
      // console.log(this.$refs.tabControl.$el.offsetTop)
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
    },

    /**
     * 网络请求相关
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res)
        // this.result=res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        // console.log(res.data.list)
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 上拉加载更多
        this.$refs.scroll.finishPullUp()
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  position: relative;
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 使用浏览器原生滚动时，为了不让导航栏一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 10; */
}

/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */

/* .content{
  height: calc(100% - 93px);
  margin-top: 44px;
  overflow: hidden;
} */
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control{
  position: relative;
  z-index: 9;
}

</style>
