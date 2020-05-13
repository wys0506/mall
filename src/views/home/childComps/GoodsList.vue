<template>
  <div class="goodslist">
   <GoodsListItem  v-for="(item,index) in goodslist" :goods="item" :key="index" @itemLoad="itemLoad"></GoodsListItem>
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
    export default {
        name: "GoodsList",
        components:{
          GoodsListItem
        },
      props:{
          goodslist:{
            type:Array
            }
          },
      methods:{
          itemLoad(){
            this.$emit('itemLoad')
          }
      }
      }

</script>

<style scoped>
.goodslist{
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  justify-content: space-around;
}
</style>
