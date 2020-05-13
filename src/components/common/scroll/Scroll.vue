<template>
<div class="wrapper">
   <div class="a">
     <slot></slot>
   </div>
</div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
        name: "Scroll",
        props:{
          probeType:{
            type:Number,
            default() {
              return 0;
            }
          },
          pullUpLoad:{
            type: Boolean,
            default() {
              return false;
            }
          }
        },
        data(){
          return{
            scroll:null
          }
        },
      mounted() {
          //1.初始化BScroll
        this.scroll = new BScroll('.wrapper',{
          probeType: this.probeType,
          pullUpLoad: true,
          click:true
        })
        //回调监听的位置
        this.scroll.on('scroll',position=>{
          this.$emit('scroll',position)
        })

        this.scroll.on('pullingUp',()=>{
          console.log('上拉加载更多');
          this.$emit('pullingUp')
        })
      },
      methods:{

        finishPullUp(){
          this.scroll.finishPullUp()
        },

        scrollTo(x,y,t){
          this.scroll && this.scroll.scrollTo(x,y,t)
        },

        refresh(){
          this.scroll && this.scroll.refresh()
        },

        getScrollY(){
          return this.scroll ? this.scroll.y : 0
        }

      }
    }
</script>

<style scoped>

</style>
