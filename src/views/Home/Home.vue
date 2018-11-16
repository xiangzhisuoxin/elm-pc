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
            <router-link to="/login/" tag="span" class="btn-reg">注册</router-link>|
            <span class="btn-login">登录</span>|
            <span class="btn-open">我要开店</span>
          </div>
        </header>
        <main>
          <h2>
            <img src="../../assets/map-logo-center.svg" alt="ele" class="main-icon">
          </h2>
          <div class="main-address">
            <div class="address-btn">
              <el-popover
                      placement="bottom-start"
                      width="730"
                      trigger="click">
                <div class="select">
                  <div class="select-title">
                    <span>请选择你所在的城市</span>
                    <span><span class="highlight">选城市</span> > 定位置 > 叫外卖</span>
                  </div>
                  <div class="select-guess">
                    <div class="guess-l">
                      <span class="guess-span highlight">猜你在</span>
                      <span class="guess-city">{{cityGuess}}</span>
                    </div>
                    <div class="guess-r">
                      <el-input v-model="searchCity" size="small" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                  <div class="select-group">
                    <div class="group-item" v-for="(value, key, index) in sortgroupcity" :key="index">
                      <div class="city-index">{{key}}</div>
                      <div class="city-list">
                        <ul>
                          <li v-for="item in value" :key="item.id">{{item.name}}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <el-button slot="reference">{{cityGuess}}</el-button>
              </el-popover>
            </div>
            <div class="address-input">
              <el-input placeholder="请输入内容" v-model="inputAddress" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </div>
        </main>
      </div>

    </div>
    <footer></footer>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {cityGuess, cityHot, cityGroup} from "../../api/getData";

export default {
    name: 'home',
    data() {
        return {
            msg: 'not connect',
            searchCity: '',
            cityGuess: '请选择',
            cityHot: [],
            cityGroup: {},
            inputAddress: '',
        }
    },
    components: {
      HelloWorld
    },
    mounted() {
        this.initData();
    },
    methods: {
        //初始化数据
        initData() {
            cityGuess().then((res) => {
                this.cityGuess = res.data.name || this.msg;
            });

            cityHot().then((res) => {
                this.cityHot = res.data || this.cityHot;
            })

            cityGroup().then((res) => {
                this.cityGroup = res.data || this.cityGroup;
                console.log(this.cityGroup);
            })
        },
    },
    computed: {
        //将获取的数据按照A-Z字母开头排序
        sortgroupcity(){
            let sortobj = {};
            for (let i = 65; i <= 90; i++) {
                if (this.cityGroup[String.fromCharCode(i)]) {
                    sortobj[String.fromCharCode(i)] = this.cityGroup[String.fromCharCode(i)];
                }
            }
            return sortobj
        }
    }
}
</script>
<style lang="scss" scoped>
  @import "../../style/mixin";
  .home{
    @include wh;
    overflow: hidden;
    .home-top{
      height: 600px;
      background-color: $main-blue;
      .container{
        width: 1180px;
        @include marAuto;
        header{
          padding-top: 30px;
          @include fj();
          .header-l{
            .header-icon{
              @include fj;
              @include wh(303px,31px);
              @include bis('../../assets/map-logo.png');
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
              font-size: 12px;
            }
            .btn-reg,.btn-login{
              font-size: 14px;
            }
          }
        }
        main{
          text-align: center;
          margin-top: 15%;
          h2{
            .main-icon{
              width: 280px;
            }
          }
          .main-address{
            @include marAuto;
            margin-top: 30px;
            width: 50%;
            @include fj();
            .address-btn{
              flex: 1;
              .el-button{
                width: 100%;
              }
            }
            .address-input{
              flex: 4;
            }
          }
        }
      }
    }
  }

  /*选择城市弹窗*/
  .select{
    @include box-sizing();
    max-height: 400px;
    overflow: auto;
    .select-title{
      @include fj();
      border-bottom: 1px solid $gray;
      >span{
        flex:1;
        height: 25px;
        line-height: 25px;
        text-align: center;
        font-size: 12px;
      }
      .highlight{
        color:$highlight;
      }
    }
    .select-guess{
      @include fj();
      @include box-sizing();
      padding:15px 0px;
      .guess-l{
        flex: 5;
        @include fj();
        >span{
          @include fontHei(32px);
        }
        .guess-city{
          width: 100px;
          background-color: #ff6000;
          text-align: center;
          color:#fff;
          margin-right: 20px;
        }
        .guess-span{
          width: 60px;
          margin-left: auto;
        }
      }
      .guess-r{
        flex: 6;
      }
    }
    .select-group{
      .group-item{
        @include fj();
        .city-index{
          flex:1;
          @include sc(14px, $highlight);
          padding-top: 10px;
        }
        .city-list{
          flex:10;
          >ul{
            >li{
              float: left;
              width: 80px;
              cursor: pointer;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              @include fontHei(30px);
            }
          }
        }
      }
    }
  }

  @include scrollbar(5px,#fff,$main-blue);

/*  !*elementui 样式*!
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .el-input-group {
    width: calc(100% - 110px);
  }*/


</style>