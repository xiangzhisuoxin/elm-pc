<template>
  <header>
    <div class="top">
      <div class="top-left">
        <img class="logo" src="../../assets/login-logo.svg" alt>
        <ul class="clear">
          <li @click="topLinkClick(1)" >首页</li>
          <li @click="topLinkClick(2)" >我的订单</li>
          <!-- <li @click="topLinkClick(3)" :class="{'top-active':topActiveIndex===3}">加盟合作</li> -->
          <!-- <li @click="topLinkClick(4)" :class="{'top-active':topActiveIndex===4}">我的客服</li> -->
        </ul>
      </div>
      <div class="top-right">
        <ul class="more clear">
          <!-- <li>规则中心</li> -->
          <li @mouseover="isShowQR=true" @mouseleave="isShowQR=false">
            <i class="el-icon-mobile-phone"></i>手机应用
            <div class="phone" v-show="isShowQR">
              <span>扫一扫，手机订餐更方便</span>
              <img src="../../assets/qr-code.png" alt>
            </div>
          </li>
        </ul>
        <div class="user-con">
          <router-link to="/login" class="btn-login" v-if="!isLogin">登录/注册</router-link>
          <div class="user-info" v-else>
            <el-menu
              class="el-menu-demo"
              mode="horizontal"
            >
              <el-submenu index="2">
                <template slot="title">{{username}}</template>
                <router-link tag="el-menu-item" :to="{path:'/user'}" index="2-1"> 个人中心</router-link>
                <el-menu-item index="2-3" @click="QUIT_LOGIN()">退出登录</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { clickUtil, setStore, getStore } from "../../jsUtil/mUtils";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      topActiveIndex: 1,
      isShowQR: false,
      username:'',
      userId:0,
    };
  },
  computed:{
    ...mapState(['userInfo','isLogin','latitude','longitude']),
  },
  props:{
  },
  mounted(){
    this.init();
  },
  methods: {
    ...mapMutations(['QUIT_LOGIN']),
    init(){
      if(this.userInfo){
        this.username=this.userInfo.username;
        this.userId=this.userInfo.userId;
      }
    },
    topLinkClick(index) {
      this.topActiveIndex = index;
      switch (index){
        case 1:
          this.$router.push({path:'/index',query:{latitude:this.latitude,longitude:this.longitude}})
        break;
        case 2:
          this.$router.push('/user')
        break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin";
header {
  width: 100%;
  .top {
    width: 100%;
    height: 60px;
    min-width: 1080px;
    background-color: $main-blue;
    @include marAuto;
    @include fj();
    color: #fff;
    line-height: 60px;
    .top-left {
      @include fj();
      .logo {
        height: 60px;
        color: #fff;
        max-height: 100%;
      }
      > ul {
        display: flex;
        > li {
          float: left;
          cursor: pointer;
          display: inline-block;
          @include wh(130px, auto);
          color: #fff;
          text-align: center;
          font-size: 16px;
          &:hover {
            background: #0c77d1;
          }
          &.top-active {
            background-color: #006bc7;
          }
        }
      }
    }
    .top-right {
      @include fj();
      flex:1;
      .more {
        margin-left: 20%;
        > li {
          float: left;
          display: inline-block;
          @include wh(110px, auto);
          cursor: pointer;
          text-align: center;
          color: #fff;
          font-size: 14px;
          opacity: 0.8;
          &:hover {
            opacity: 1;
          }
          > i {
            color: #fff;
            font-size: 22px;
            position: relative;
            top: 2px;
            margin-right: 5px;
          }
          > .phone {
            display: flex;
            flex-direction: column;
            width: 220px;
            @include fj(center);
            /*border:1px solid #aaa;*/
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
            position: relative;
            top: -5px;
            background-color: #fff;
            cursor: auto;
            position: relative;
            z-index: 999;
            &::before {
              content: " ";
              border: 5px solid #fff;
              display: block;
              position: absolute;
              top: -10px;
              border-color: transparent transparent #fff;
              right: auto;
              left: 20px;
            }
            > span {
              font-weight: bold;
              font-size: 16px;
              text-align: center;
              height: 30px;
              line-height: 30px;
            }
            > img {
              width: 200px;
              height: 200px;
              @include marAuto;
              margin-bottom: 10px;
            }
          }
        }
      }
      .user-con{
        margin-right: 30px;
        /deep/ .el-submenu__title,.el-menu{
          background: transparent;
          color:#fff;
        }
        /deep/ .el-submenu__icon-arrow{
          color:#fff;
        }
      }
      .btn-login {
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        margin-right: 30px;
      }
    }
  }
}
</style>