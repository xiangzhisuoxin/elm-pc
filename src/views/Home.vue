<template>
<!--  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>{{msg}}</div>
  </div>-->
  <div class="home">
    <div class="home-top">
      <div class="container">
        <header>
          <div class="header-l">
            <span class="header-icon"></span>
          </div>
          <div class="header-r">
            <span class="btn-reg">注册</span>|
            <span class="btn-login">登录</span>|
            <span class="btn-open">我要开店</span>
          </div>
        </header>
        <main>
          <h2>
            <img src="../assets/map-logo-center.svg" alt="ele" class="main-icon">
          </h2>
          <span class="main-title"></span>
        </main>
      </div>

    </div>
    <footer></footer>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {cityGuess} from "../api/getData";

export default {
    name: 'home',
    data() {
        return {
            msg: 'not connect'
        }
    },
    components: {
      HelloWorld
    },
    async mounted() {
        let res = await cityGuess();
        this.msg = res.data.name || this.msg;
    }
}
</script>
<style lang="scss" scoped>
  @import "../style/mixin";
  .home{
    @include wh;
    overflow: hidden;
    .home-top{
      height: 60%;
      background-color: $blue;
      .container{
        width: 980px;
        @include marAuto;
        header{
          padding-top: 30px;
          @include fj();
          .header-l{
            .header-icon{
              @include fj;
              @include wh(303px,31px);
              @include bis('../assets/map-logo.png');
              @include box-sizing();
              padding-top: 30px;
            }
          }
          .header-r{
            margin-left: auto;
            @include sc(12px, #fff);
            >span{
              @include sc(12px, #fff);
              width: 50px;
              cursor: pointer;
              display: inline-block;
              text-align: center;
            }
          }
        }
        main{
          text-align: center;
          .main-icon{
            width: 280px;
          }
        }
      }
    }
  }
</style>