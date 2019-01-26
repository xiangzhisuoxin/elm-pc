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
                        <el-col>
                            <el-autocomplete
                                    size="small"
                                    class="inline-input"
                                    v-model="searchShop"
                                    :fetch-suggestions="getSearchHistory"
                                    placeholder="请输入商家、美食..."
                                    @select="selectSearchHistory"
                            >
                                <!--<el-button slot="append"
                                           icon="el-icon-search"
                                           @click="getSearchResult(searchShop)"
                                ></el-button>-->
                            </el-autocomplete>
                            <el-button icon="el-icon-search"
                                       size="small"
                                       @click="getSearchResult(searchShop)"
                            ></el-button>
                        </el-col>
                    </div>
                </div>
                <!--商家分类-->
                <div class="category" v-if="!isShowSearchResult">
                    <div class="category-l">商家分类：</div>
                    <div class="category-r">
                        <ul class="clear food-type">
                            <!--<li class="food-type-active" @click="foodTypeClick($event)">全部商家</li>-->
                            <!--<li v-for="item in foodTypeList" @click="foodTypeClick($event)">{{item.title}}</li>-->
                            <li v-for="(item, index) in detailFoodTypeList"
                                @click="foodTypeClick($event,item, index)"
                                :key="index"
                                :class="{'food-type-active': index == 0}"
                            >{{item.name}}</li>
                        </ul>
                        <ul class="type-detail clear" v-if="isShowTypeDetail">
                            <li v-for="(item, index) in selectDetailFoodTypeList.sub_categories"
                                @click="typeDetailClick($event, item)"
                                :class="{'type-detail-active': index == 0}"
                                :key="index">{{item.name}}</li>
                        </ul>
                    </div>
                </div>
                <!--商家列表-->
                <shop-list :restaurantCategoryId="restaurantCategoryId"
                           :restaurantCategoryIds="restaurantCategoryIds"
                           :sortByType='sortByType'
                           :deliveryMode="delivery_mode"
                           :confirmSelect="confirmStatus"
                           :supportIds="support_ids"
                           v-if="latitude && !isShowSearchResult"
                ></shop-list>
                <search-result
                        ref="searchResult"
                        :keyword="searchShop"
                        v-if="isShowSearchResult"></search-result>
            </div>
        </main>
    </div>
</template>

<script>
    import {getFoodType, getDetailFoodType, getAddressInfo, cityGuess,getShopList} from '../../api/getData'
    import {clickUtil, setStore, getStore} from '../../jsUtil/mUtils';
    import { mapState, mapMutations } from "vuex";
    import ShopList from '../../components/common/ShopList';
    import SearchResult from '../../components/common/SearchResult'

    export default {
        name: "Index",
        components:{
            ShopList,
            SearchResult,
        },
        data() {
            return{
                latitude:'',
                longitude:'',
                isShowQR: false,
                topActiveIndex:1,
                isShowTypeDetail:false,
                foodTypeList:[],
                detailFoodTypeList:[],
                selectDetailFoodTypeList:{},
                sortByType: undefined,
                restaurantCategoryId: undefined,
                restaurantCategoryIds: undefined,
                confirmStatus: undefined,
                support_ids: undefined,
                delivery_mode: undefined,
                searchShop: '',
                searchHistory: [],//搜索历史
                isShowSearchResult: false,
            }
        },
        async beforeMount() {
            if (!this.$route.query.latitude || !this.$route.query.longitude) {
                const address = await cityGuess();
                this.latitude = address.data.latitude;
                this.longitude = address.data.longitude;
            } else {
                this.latitude = this.$route.query.latitude;
                this.longitude = this.$route.query.longitude;
                this.RECORD_ADDRESS({latitude:this.latitude, longitude: this.longitude});
            }
        },
        mounted(){
            this.initData();
        },
        methods:{
            ...mapMutations(['RECORD_ADDRESS']),

            initData(){
                getDetailFoodType().then((res) => {
                    if (res.data.status == 1) {
                        this.detailFoodTypeList = res.data.data;
                        console.log(this.detailFoodTypeList);
                    }
                });

                if (getStore('search_food')) {
                    this.searchHistory = JSON.parse(getStore('search_food'));
                }
            },
            topLinkClick(index){
                this.topActiveIndex = index;
            },

            //商家列表点击事件
            foodTypeClick(e, item, index){
                clickUtil({
                    el:e.target,
                    activeClass:'food-type-active',
                    callback: (el) => {
                        if (this.detailFoodTypeList[index].sub_categories.length) {
                            this.isShowTypeDetail = true;
                            this.selectDetailFoodTypeList = this.detailFoodTypeList[index];
                            $('.type-detail li').removeClass('type-detail-active').eq(0).addClass('type-detail-active');
                            this.restaurantCategoryId = item.id || undefined;
                            this.restaurantCategoryIds = item.sub_categories[0].id;

                        } else {
                            //改变店铺类型
                            if (this.detailFoodTypeList[index].id) {
                                this.restaurantCategoryId = this.detailFoodTypeList[index].id;
                                this.restaurantCategoryIds = undefined;
                            } else {
                                this.restaurantCategoryIds = undefined;
                                this.restaurantCategoryId = undefined;
                            }
                            this.isShowTypeDetail = false;
                        }

                        /*let elIndex = $(el).index();
                        if (elIndex == 0) {
                        } else {
                            this.isShowTypeDetail = true;
                            this.selectDetailFoodTypeList = this.detailFoodTypeList[index];
                            console.log(this.selectDetailFoodTypeList);
                            if (!this.selectDetailFoodTypeList) {
                                this.isShowTypeDetail = false;
                            }
                        }*/
                    }
                })
            },

            typeDetailClick(e, item){
                clickUtil({
                    el:e.target,
                    activeClass: 'type-detail-active',
                    callback: (el) => {
                        this.restaurantCategoryIds = item.id || undefined;
                    }
                })
            },


            /**
             * 获取商家搜索输入框内容
             * @param str 搜索框内容
             * @param cb 渲染内容回调
             */
            getSearchHistory(str, cb) {
                let arrHistory = this.searchHistory.map((item) => {
                    return {"value": item}
                });
                cb(arrHistory);
            },

            /**
             * 选择商家搜索输入框内容
             * @param item 选中的项
             */
            selectSearchHistory(item){
                this.getSearchResult(item.value);
            },

            /**
             * 根据搜索内容获取商家列表
             * @param searchStr
             */
            getSearchResult(searchStr){
                //将搜索历史载入当地缓存
                if (!this.searchHistory.includes(searchStr)) {
                    this.searchHistory.push(searchStr);
                    setStore('search_food', this.searchHistory);
                }

                //关键词不为空 打开搜索结果组件 否则关闭组件
                if (searchStr) {
                    //如果已经显示搜索结果组件，触发组件里的查询方法
                    if (this.isShowSearchResult) {
                        this.$refs.searchResult.initData(searchStr);
                    } else {
                        this.isShowSearchResult = true;
                    }
                } else {
                    this.isShowSearchResult = false;
                }
            }
        },

    }
</script>

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
                        .food-type{
                            >li{
                                float: left;
                                padding:8px 10px;
                                color:#666;
                                cursor: pointer;
                                margin-right: 10px;
                                &:hover,
                                &.food-type-active{
                                    background-color: #f6f6f6;
                                }
                            }
                        }
                        .type-detail{
                            background-color: #f6f6f6;
                            padding:8px 4px;
                            margin-top: 10px;
                            >li{
                                float: left;
                                color:#666;
                                cursor: pointer;
                                margin:3px 5px;
                                padding:3px 6px;
                                &.type-detail-active{
                                    color:#fff;
                                    background-color: #0089dc;
                                    border-radius: 5px;
                                }
                            }
                        }
                    }
                }

            }
        }
    }
</style>
