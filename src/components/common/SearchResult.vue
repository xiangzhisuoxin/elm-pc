<template>
    <div class="wrap">
        <!--搜索列表-->
        <div class="query-list">
            <loading v-if="isLoading"></loading>
            <ul v-else>
                <li v-for="(item,index) in shopList" :key="index">
                    <!--商家信息-->
                    <div class="list-item">
                        <div class="shop-title">
                            <div class="shop-info">
                                <div class="info-name">
                                    <span>{{item.name}}</span>
                                    <i v-for="(icon,index) in item.supports"
                                       :key="index"
                                       :style="'background-color:#'+icon.icon_color">{{icon.icon_name}}</i>
                                </div>
                                <div class="info-detail">
                                    <div class="rate">
                                        <el-rate
                                                v-model="item.rating"
                                                disabled
                                                text-color="#ff9900">
                                        </el-rate>
                                    </div>
                                    <div class="delivery-time">平均{{item.order_lead_time}}送达</div>
                                </div>
                            </div>
                            <div class="shop-doom">
                                可预订，10：00后送餐
                            </div>
                        </div>
                        <!--商家食品信息-->
                        <div class="food-list">
                            <ul>
                                <li v-for="(food, index) in item.hotFood"
                                    :key="index"
                                    :class="{'hide': index > hotFoodNum}"
                                >
                                    <div class="food-item">
                                        <div class="food-name">{{food.name}}</div>
                                        <div class="food-cost">¥{{food.specfoods[0].price}}</div>
                                        <div class="food-status">可预订</div>
                                        <div class="food-rate">
                                            <div class="rate">
                                                <el-rate
                                                        v-model="food.rating"
                                                        disabled
                                                        text-color="#ff9900">
                                                </el-rate>
                                            </div>
                                            <span>月售{{food.month_sales}}份</span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <div class="food-more"
                                 v-if="item.hotFood.length > 3"
                            >
                                本商家还有<span class="light-orange">{{item.hotFood.length - 3}}</span>份相关美食，
                                <span class="light-blue show-more-span"
                                      @click="showAllFood($event)"
                                >显示全部相关美食</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Loading from '../Loading'
    import {getShopsByKeyword} from "../../api/getData";
    import { mapState, mapMutations } from "vuex";


    export default {
        name: "SearchResult",
        components:{
            Loading,
        },
        data(){
            return {
                isLoading: false,
                rating:5,
                hotFoodNum:2,
                shopList: [],
            }
        },
        computed:{
            ...mapState(['latitude', 'longitude'])
        },
        props:['keyword'],
        mounted(){
            this.initData();
        },

        methods:{
            initData(keyword = this.keyword){
                this.isLoading = true;
                getShopsByKeyword({
                    latitude: this.latitude,
                    longitude: this.longitude,
                    keyword
                }).then((res) => {
                    if (res.data.status == 1) {
                        this.shopList = res.data.data;
                        console.log(this.shopList);
                    }
                    this.isLoading = false;
                })
            },

            showAllFood(e){
                $(e.target).parents('.food-more').hide().parents('.food-list').find('li.hide').show();
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin";

    .wrap{
        background: #f7f7f7;
        width: 100%;
        .query-list{
            >ul{
                >li{
                    margin-bottom: 20px;
                    border: 1px solid #ddd;
                    background-color: #fff;
                    .list-item{
                        width: 100%;
                        .shop-title{
                            background: #f9f9f9;
                            display: flex;
                            align-items: center;
                            padding: 10px;
                            border-bottom: 1px solid #f5f5f5;
                            .shop-info{
                                display: flex;
                                flex-direction: column;
                                .info-name{
                                    font-size: 18px;
                                    color:#333;
                                    padding-bottom:  5px;
                                    >i{
                                        background-color: #999;
                                        display: inline-block;
                                        vertical-align: middle;
                                        color: #fff;
                                        font-style: normal;
                                        font-size: 12px;
                                        line-height: 16px;
                                        overflow: hidden;
                                        text-align: center;
                                        width: 18px;
                                        border-radius: 2px;
                                        margin-left: 3px;
                                        margin-top: -1px;
                                        padding: 1px;
                                        white-space: nowrap;
                                    }
                                }
                                .info-detail{
                                    display: flex;
                                    .delivery-time{
                                        font-size: 12px;
                                        margin-right: 10px;
                                        margin-left: 10px;
                                        padding-left: 10px;
                                        border-left: 1px solid #ddd;
                                        color: #888;

                                    }
                                }
                            }
                            .shop-doom{
                                margin-left: auto;
                                background-color: #fff;
                                color: #14ae18;
                                border: 1px solid #14ae18;
                                line-height: 18px;
                                border-radius: 3px;
                                font-size: 12px;
                                padding: 1px 3px;
                            }
                        }
                        .food-list{
                            >ul{
                                >li{
                                    border-bottom: 1px solid #f5f5f5;
                                    .food-item{
                                        padding:10px;
                                        display: flex;
                                        font-size: 14px;
                                        align-items: center;
                                        height: 57px;
                                        .food-name{
                                            flex: 8;
                                        }
                                        .food-cost,
                                        .food-status,
                                        .food-rate{
                                            flex: 1;
                                            text-align: center;
                                        }
                                        .food-status{
                                            flex: 0.8;
                                            background-color: #fff;
                                            color: #14ae18;
                                            border: 1px solid #14ae18;
                                            border-radius: 3px;
                                            cursor: pointer;
                                            padding: 4px 0;
                                        }
                                        .food-rate{
                                            flex: 1;
                                        }
                                    }
                                }
                            }
                            .food-more{
                                padding: 10px;
                                font-size: 14px;
                                .show-more-span{
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }
            }
        }

        .light-blue{
            color:#409EFF;
        }
        .light-orange{
            color: #f80;
            font-weight: 700;
        }
    }
</style>
<style lang="scss">
    .rate .el-rate__icon {
        font-size: 14px;
        margin-right: 1px;
    }
</style>