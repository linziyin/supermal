import { debouce } from './utils'
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
    mounted() {
        const refresh = debouce(this.$refs.scroll.refresh, 200)
        this.$bus.$on("itemImageLoad", () => {
            refresh()
        })
        // console.log("我是混入中的内容")
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop:false
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500);
        },
        listenShowBackTop(position) {
            this.isShowBackTop = (-position.y) > 500;
        },
    },
}