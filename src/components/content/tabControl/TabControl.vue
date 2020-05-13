<template>
    <div class="tab-control">
      <div class="tab-control-item" v-for="(item,index) in titles"
           @click="itemClick(index)"
           :key="index"
           :class="{active:currentIndex === index}">
          <span>{{item}}</span>
      </div>
    </div>
</template>

<script>

    export default {
        name: "TabControl",
        props:{
          titles:{
            type:Array,
            default(){
              return []
            }
          }
        },
        data(){
          return {
            currentIndex:0
          }
        },
        methods:{
          itemClick(index){
            this.currentIndex = index

            //发出事件
            this.$emit('itemClick',index)
          }
        }
    }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    line-height: 40px;
    font-size:15px ;
    background-color: #fff;
    z-index: 9;
  }

  .tab-control-item{
    flex: 1;
  }

  .tab-control-item span{
    padding:5px;
  }
  .active span{
    border-bottom: 2px solid var(--color-high-text);
  }
</style>
