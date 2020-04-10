<template>
    <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    </div>
</template>

<script>
  import {getHomeMultidata,RECOMMEND,BANNER} from "../../network/home";
  import NavBar from "../../components/common/navbar/NavBar";
    export default {
        name: "Home",
        components:{
          NavBar
      },
      data(){
          return {
            banners :[],
            recommends:[]
          }
      },
      computed:{

      },
      created() {
        console.log('创建home');
        this.getMultiData()
      },
      methods:{

        //网络请求
        getMultiData(){
          getHomeMultidata().then(res =>{
            this.banners = res.data[BANNER].list
            this.recommends = res.data[RECOMMEND].list


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
</style>
