<template>
    <swiper ref="swiper" v-if="banners.length">
      <SwiperItem v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </SwiperItem>
    </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from 'common/swiper'

    export default {
        name: "HomeSwiper",
        components:{
          Swiper,SwiperItem
        },
      props:{
          banners:{
            type:Array
          }
      },
      methods:{
          stopTimer(){
            this.$refs.swiper.stopTimer()
          },
          startTimer(){
            if (this.$refs.swiper) {
              this.$refs.swiper.startTimer()

            }
          }

      }
    }
</script>

<style scoped>

</style>
