<template>
    <swiper ref="swiper" v-if="banners.length">
      <SwiperItem v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
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
      data(){
        return{
          isLoad:false
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
          },
          imgLoad(){
           if(!this.isLoad){
             this.$emit('swiperImgLoad')
             this.isLoad = true
           }
          }

      }
    }
</script>

<style scoped>

</style>
