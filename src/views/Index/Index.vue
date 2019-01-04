<template>
    <div class="wrap">
        <!--头部-->
        <header>
            <div class="top">
                <div class="top-left">
                    <img class="logo" src="../../assets/login-logo.svg" alt="">
                    <ul class="clear">
                        <li @click="topLinkClick(1)" :class="{'top-active':topActiveIndex===1}">首页</li>
                        <li @click="topLinkClick(2)" :class="{'top-active':topActiveIndex===2}">我的订单</li>
                        <li @click="topLinkClick(3)" :class="{'top-active':topActiveIndex===3}">加盟合作</li>
                        <li @click="topLinkClick(4)" :class="{'top-active':topActiveIndex===4}">我的客服</li>
                    </ul>
                </div>
                <div class="top-right">
                    <ul class="more clear">
                        <li>规则中心</li>
                        <li @mouseover="isShowQR=true" @mouseleave="isShowQR=false"><i class="el-icon-mobile-phone"></i>手机应用
                            <div class="phone" v-show="isShowQR">
                                <span>扫一扫，手机订餐更方便</span>
                                <img src="../../assets/qr-code.png" alt="">
                            </div>
                        </li>
                    </ul>
                    <div class="btn-login">登录/注册</div>
                </div>
            </div>
        </header>
        <!--主体部分-->
        <main>
            <div class="contain">
                <!--头部-->
                <div class="main-top">
                    <div class="current-place">
                        <span>当前位置：</span>
                        <span>玉龙小区</span>
                        <span>[切换地址]</span>
                    </div>
                    <div class="search-food">
                        <el-input  size="small" placeholder="请输入商家、美食...">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                </div>
                <!--商家分类-->
                <div class="category">
                    <div class="category-l">商家分类：</div>
                    <div class="category-r">
                        <ul class="clear">
                            <li v-for="item in foodTypeList">{{item.title}}</li>
                        </ul>
                    </div>
                </div>
                <!--商家列表-->
                <div class="shop-list">
                    <ul class="clear">
                        <li>
                            <div class="list-item-l">
                                <img src="../../assets/hanbao.webp"/>
                                <div class="list-item-l-span">22分钟</div>
                            </div>
                            <div class="list-item-r">
                                <div class="shop-title">汉堡王汉堡王汉堡王汉堡王汉堡王汉堡王</div>
                                <div class="star-level"></div>
                                <div class="delivery-cost">配送费¥5</div>
                                <div class="icon-list">
                                    <i>票</i><i>票</i>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="list-item-l">
                                <img src="../../assets/hanbao.webp"/>
                                <div class="list-item-l-span">22分钟</div>
                            </div>
                            <div class="list-item-r">
                                <div class="shop-title">汉堡王汉堡王汉堡王汉堡王汉堡王汉堡王</div>
                                <div class="star-level"></div>
                                <div class="delivery-cost">配送费¥5</div>
                                <div class="icon-list">
                                    <i>票</i><i>票</i>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="list-item-l">
                                <img src="../../assets/hanbao.webp"/>
                                <div class="list-item-l-span">22分钟</div>
                            </div>
                            <div class="list-item-r">
                                <div class="shop-title">汉堡王汉堡王汉堡王汉堡王汉堡王汉堡王</div>
                                <div class="star-level"></div>
                                <div class="delivery-cost">配送费¥5</div>
                                <div class="icon-list">
                                    <i>票</i><i>票</i>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="list-item-l">
                                <img src="../../assets/hanbao.webp"/>
                                <div class="list-item-l-span">22分钟</div>
                            </div>
                            <div class="list-item-r">
                                <div class="shop-title">汉堡王汉堡王汉堡王汉堡王汉堡王汉堡王</div>
                                <div class="star-level"></div>
                                <div class="delivery-cost">配送费¥5</div>
                                <div class="icon-list">
                                    <i>票</i><i>票</i>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="list-item-l">
                                <img src="../../assets/hanbao.webp"/>
                                <div class="list-item-l-span">22分钟</div>
                            </div>
                            <div class="list-item-r">
                                <div class="shop-title">汉堡王汉堡王汉堡王汉堡王汉堡王汉堡王</div>
                                <div class="star-level"></div>
                                <div class="delivery-cost">配送费¥5</div>
                                <div class="icon-list">
                                    <i>票</i><i>票</i>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="more-login" v-if="!isLogin">查看更多商家，请先<span class="highlight">登录</span></div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import {getFoodType} from '../../api/getData'
    export default {
        name: "Index",
        data(){
            return{
                isShowQR: false,
                topActiveIndex:1,
                isLogin:false,
                foodTypeList:[],
            }
        },
        mounted(){
            this.initData();
        },
        methods:{
            async initData(){
                if (!this.latitude) {
                    //获取位置信息
                    let res = await msiteAddress(this.geohash);
                    // 记录当前经度纬度进入vuex
                    this.RECORD_ADDRESS(res);
                }

                let res = await getFoodType();
                if (res.data.status = 1) {
                    this.foodTypeList = res.data.data;
                }
            },
            topLinkClick(index){
                this.topActiveIndex = index;
            },
        },

    }
</script>

<style lang="scss" scoped >
    @import "../../style/mixin";
    .wrap{
        width:100%;
        header{
                width: 100%;
                .top{
                    width: 100%;
                    height: 60px;
                    min-width: 1080px;
                    background-color:$main-blue;
                    @include marAuto;
                    @include fj();
                    color:#fff;
                    line-height: 60px;
                    .top-left{

                        @include fj();
                        .logo{
                            height: 60px;
                            color:#fff;
                        }
                        >ul{
                            >li{
                                float: left;
                                cursor: pointer;
                                display: inline-block;
                                @include wh(130px, auto);
                                color:#fff;
                                text-align: center;
                                font-size: 16px;
                                &:hover{
                                    background: #0c77d1;
                                }
                                &.top-active{
                                    background-color: #006bc7;
                                }
                            }
                        }
                    }
                    .top-right{
                        @include fj();
                        .more{
                            margin-right: 80px;
                            >li{
                                float: left;
                                display: inline-block;
                                @include wh(110px, auto);
                                cursor: pointer;
                                text-align: center;
                                color:#fff;
                                font-size: 14px;
                                opacity: 0.8;
                                &:hover{
                                    opacity: 1;
                                }
                                >i{
                                    color: #fff;
                                    font-size: 22px;
                                    position: relative;
                                    top: 2px;
                                    margin-right: 5px;
                                }
                                >.phone{
                                    display: flex;
                                    flex-direction: column;
                                    width: 220px;
                                    @include fj(center);
                                    /*border:1px solid #aaa;*/
                                    box-shadow: 0 1px 2px rgba(0,0,0,.5);
                                    position: relative;
                                    top: -5px;
                                    background-color: #fff;
                                    cursor: auto;
                                    &::before{
                                        content: ' ';
                                        border: 5px solid #fff;
                                        display: block;
                                        position: absolute;
                                        top: -10px;
                                        border-color: transparent transparent #fff;
                                        right: auto;
                                        left: 20px;
                                    }
                                    >span{
                                        font-weight: bold;
                                        font-size: 16px;
                                        text-align: center;
                                        height: 30px;
                                        line-height: 30px;
                                    }
                                    >img{
                                        width: 200px;
                                        height: 200px;
                                        @include marAuto;
                                        margin-bottom: 10px;
                                    }
                                }
                            }
                        }
                        .btn-login{
                            color:#fff;
                            font-size: 14px;
                            cursor: pointer;
                            margin-right: 30px;
                        }
                    }
                }
    }
        main{
            .contain{
                width:100%;
                padding:0 20px;
                .main-top{
                    @include fj();
                    align-items: center;
                    height: 50px;
                    .current-place{
                        span{
                            color:#000;
                            font-size: 12px;
                            &:nth-child(1){
                                color: $gray;
                            }
                            &:nth-child(2){
                                cursor: pointer;
                                margin: 0 5px;
                                &:hover{
                                    color:$highlight;
                                }
                            }
                            &:nth-child(3){
                                cursor: pointer;
                                color:$highlight;
                            }
                        }

                    }
                }
                .category{
                    padding:10px;
                    @include fj();
                    @include bd;
                    background-color: #fff;
                    font-size: 14px;
                    .category-l{
                        color: $gray;
                        flex:1;
                        padding: 10px;
                    }
                    .category-r{
                        flex: 15;
                        >ul{
                            >li{
                                float: left;
                                padding:8px 10px;
                                color:#666;
                                cursor: pointer;
                                margin-right: 10px;
                                &:hover{
                                    background-color: #f6f6f6;
                                }
                            }
                        }
                    }
                }
                .shop-list{
                    margin-top: 30px;
                    @include bd;
                    background-color: #fff;
                    >ul{
                        >li{
                            float: left;
                            width:25%;
                            padding: 20px;
                            @include fj();
                            cursor: pointer;
                            border-bottom: 1px solid #e6e6e6;
                            &:hover{
                                background-color: $footer-color;
                            }
                            .list-item-l{
                                flex:1;
                                @include fj(center);
                                flex-direction: column;
                                align-items: center;
                                >img{
                                    @include wh(70px, 70px);
                                }
                                .list-item-l-span{
                                    display: block;
                                    margin-top: 10px;
                                    text-align: center;
                                    color: $gray;
                                    font-size: 12px;
                                }
                            }
                            .list-item-r{
                                flex:2;
                                flex-wrap: nowrap;
                                display: flex;
                                flex-direction: column;
                                padding-left: 15px;
                                .shop-title{
                                    width: 200px;
                                    font-size: 16px;
                                    padding-right: 30px;
                                    margin-bottom: 6px;
                                    font-weight: 600;
                                    overflow: hidden;
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    color: #333;
                                }
                                .star-level{

                                }
                                .delivery-cost{
                                    font-size: 12px;
                                    color: $gray;
                                    margin-top: 3px;
                                }
                                .icon-list{
                                    margin-top: 5px;
                                    >i{
                                        display: inline-block;
                                        background: #fff;
                                        color: #999999;
                                        border: 1px solid;
                                        vertical-align: middle;
                                        font-style: normal;
                                        font-size: 12px;
                                        line-height: 16px;
                                        overflow: hidden;
                                        text-align: center;
                                        width: 18px;
                                        border-radius: 2px;
                                        margin-right: 3px;
                                        white-space: nowrap;
                                    }
                                }
                            }
                        }
                    }
                    .more-login{
                        height: 50px;
                        line-height: 50px;
                        font-size: 18px;
                        color:#333;
                        border-top: 1px solid #e6e6e6;
                        text-align: center;
                        margin-top: -1px;
                        .highlight{
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
    .search-food{
        input{
            width: 180px;
            transition:all 0.3s;
            &:focus{
                width:300px;
            }
        }
    }
</style>