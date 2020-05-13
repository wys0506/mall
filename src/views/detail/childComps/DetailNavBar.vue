<template>
  <NavBar class="detail-nav">
    <div slot="left" @click="backClick">
      <img src="~assets/img/common/back.svg" class="back">
    </div>
    <div slot="center" class="title">
    <div v-for="(item,index) in titleInfos"
         :key="index"
         class="title-item"
         :class="{'active':index === currentIndex}"
          @click="itemClick(index)">{{item}}
    </div>
  </div>
  </NavBar>
</template>

<script>
  import NavBar from "../../../components/common/navbar/NavBar";
    export default {
        name: "DetailNavBar",
      components:{
          NavBar
      },
      data(){
          return{
            titleInfos:['商品','参数','评论','推荐'],
            currentIndex:0

          }
      },
      methods:{
          itemClick(index){
            this.currentIndex = index
          },
          backClick(){
            this.$router.back()
          }
      }
    }
</script>

<style scoped>
  .detail-nav{
    background-color: #fff;
    font-weight: normal;
  }

  .title{
    display: flex;
    padding: 0 20px;
    font-size: 14px;
  }
.title-item {
  flex: 1;
}
  .title-item.active{
    color: var(--color-high-text);
  }
</style>
