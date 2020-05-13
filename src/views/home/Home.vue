<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <TabControl :titles="['流行','新款','精选']"
                  class="tabcontrol"
                  @itemClick="itemClick"
                  ref="tabControl1"
                  v-show="isTabFixed">

      </TabControl>
      <Scroll class="content"
              ref="scroll"
              @scroll="contentScroll"
              @pullingUp="loadMore"
              :pull-up-load="true"
              :probe-type="3">

        <home-swiper :banners="banners" ref="HSwiper" @swiperImgLoad="swiperImgLoad"></home-swiper>
        <feature-view :features="recommends"></feature-view>
        <recommend-view></recommend-view>
        <TabControl :titles="['流行','新款','精选']" @itemClick="itemClick" ref="tabControl2">

        </TabControl>
        <goods-list :goodslist="showGoodsList" @itemLoad="itemLoad"></goods-list>

      </Scroll>
      <BackTop @click.native="backTop" class="back-top" v-show="showBackTop"></BackTop>


    </div>
</template>

<script>
  import BackTop from "../../components/content/backTop/BackTop";
  import Scroll from "../../components/common/scroll/Scroll";
  import {getHomeMultidata,getHomeData,RECOMMEND,BANNER} from "../../network/home";
  import NavBar from "../../components/common/navbar/NavBar";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "./childComps/GoodsList";
    export default {
        name: "Home",
        components:{
          NavBar,
          HomeSwiper,
          FeatureView,
          RecommendView,
          TabControl,
          GoodsList,
          Scroll,
          BackTop

      },
      data(){
          return {
            banners :[],
            recommends:[],
            goodsList: {
              'pop': {page:1, list: []},
              'new': {page:1, list: []},
              'sell': {page:1, list: []}
            },
            currentType:'pop',
            showBackTop:false,
            tabOffsetTop:0,
            isTabFixed:false,
            saveY:0
          }
      },
      computed:{
          showGoodsList(){
            return this.goodsList[this.currentType].list
          }
      },
      created() {
        this.getMultiData();
        this.getHomeProducts('pop')
        this.getHomeProducts('new')
        this.getHomeProducts('sell')

      },
      mounted() {
          //所有的组件都有一个属性$el，用于获取组件中的元素
          this.tabOffsetTop = this.$refs.tabControl
      },
      activated() {
        this.$refs.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.refresh()
      },
      deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
      },
      methods:{

          //监听事件相关
          itemLoad(){
            this.$refs.scroll.refresh()

         },
          backTop(){
            this.$refs.scroll.scrollTo(0,0,300)
            },
          loadMore(){
            this.getHomeProducts(this.currentType)
          },
          contentScroll(position){
             //1.判断BackTop
             this.showBackTop = -position.y > 1000

              this.isTabFixed = -position.y > this.tabOffsetTop
           },
          itemClick(index){
            switch (index) {
              case 0:
                this.currentType = 'pop'
                    break
              case 1:
                this.currentType = 'new'
                    break
              case 2:
                this.currentType = 'sell'
                    break
            }
            this.$refs.tabControl1.currentIndex = index
            this.$refs.tabControl2.currentIndex = index
          },
          swiperImgLoad(){
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        },
       /* 网络请求相关*/
        getMultiData(){
          getHomeMultidata().then(res =>{
            this.banners = res.data[BANNER].list
            this.recommends = res.data[RECOMMEND].list
          })
        },
        getHomeProducts(type) {
          getHomeData(type,this.goodsList[type].page).then(res => {
            const goodsList = res.data.list
            this.goodsList[type].list.push(...goodsList)
            this.goodsList[type].page += 1

            this.$refs.scroll.finishPullUp()
          })
        }


      }
    }
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
  #home{
    height: 100vh;
  }
  .tabcontrol{
    /*position: sticky;
    top: 0px;*/

    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }

  .back-top{
    position: fixed;
    right: 10px;
    bottom: 60px;
  }
  .content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
</style>
