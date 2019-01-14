<template>
    <div class="shop-list">
        <ul class="clear">
            <li v-for="(item, index) in shopList"
                :key="index">
                <div class="list-item-l">
                    <!--<img :src="'//elm.cangdu.org/img/' + item.image_path"/>-->
                    <img src="//elm.cangdu.org/img/164ad0b6a3917599.jpg"/>
                    <div class="list-item-l-span">22分钟</div>
                </div>
                <div class="list-item-r">
                    <div class="shop-title">{{item.name}}</div>
                    <div class="star-level">
                        <div class="star-dark">
                            <i class="el-icon-star-on"></i>
                            <i class="el-icon-star-on"></i>
                            <i class="el-icon-star-on"></i>
                            <i class="el-icon-star-on"></i>
                            <i class="el-icon-star-on"></i>
                        </div>
                        <div class="star-light" :style="'width:'+(item.rating/5*100).toFixed(2)+'%'">
                            <i class="el-icon-star-on"></i>
                            <i class="el-icon-star-on"></i>
                            <i class="el-icon-star-on"></i>
                            <i class="el-icon-star-on"></i>
                            <i class="el-icon-star-on"></i>
                        </div>
                    </div>
                    <div class="delivery-cost">{{item.piecewise_agent_fee.tips}}</div>
                    <div class="icon-list">
                        <i v-for="icon in item.supports" :style="icon.icon_color">{{icon.icon_name}}</i>
                    </div>
                </div>
            </li>
        </ul>
        <div class="more-login" v-if="!isLogin">查看更多商家，请先<span class="highlight">登录</span></div>
    </div>
</template>

<script>
    import {getShopList} from '../../api/getData'
    import {mapState, mapMutations} from "vuex";

    export default {
        name: "ShopList",
        data() {
            return {
                offset: 0,
                limit: 20,
                isLogin: false,
                shopList: [],
            }
        },
        computed: {
            ...mapState(['latitude', 'longitude'])
        },
        props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect'],
        watch: {
            //监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
            restaurantCategoryIds: function (value) {
                this.listenPropChange();
            },
            //监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
            /*restaurantCategoryId: function (value) {
                this.listenPropChange();
            },*/
            //监听父级传来的排序方式
            sortByType: function (value) {
                this.listenPropChange();
            },
            //监听父级的确认按钮是否被点击，并且返回一个自定义事件通知父级，已经接收到数据，此时父级才可以清除已选状态
            confirmSelect: function (value) {
                this.listenPropChange();
            }
        },
        mounted() {
            this.initData();
        },
        methods: {
            /**
             * 数据初始化
             */
            initData() {
                getShopList({
                    latitude: this.latitude,
                    longitude: this.longitude,
                    offset: this.offset,
                    limit: this.limit,
                    restaurant_category_id: this.restaurantCategoryId,
                    restaurant_category_ids: this.restaurantCategoryIds,
                }).then((res) => {
                    if (res.data.status == 1) {
                        this.shopList = [...res.data.data];
                        console.log(res.data);
                    }
                })
            },
            async listenPropChange() {
                this.offset = 0;
                let res = await getShopList({
                    latitude: this.latitude,
                    longitude: this.longitude,
                    offset: this.offset,
                    limit: this.limit,
                    restaurant_category_id: this.restaurantCategoryId,
                    restaurant_category_ids: this.restaurantCategoryIds,
                    sortByType: this.sortByType,
                    deliveryMode: this.deliveryMode,
                    supportIds: this.supportIds
                });
                if (res.data.status == 1) {
                    this.shopList = [...res.data.data];
                    console.log(res.data);
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../style/mixin";

    .shop-list {
        margin-top: 30px;
        @include bd;
        background-color: #fff;

        > ul {
            > li {
                float: left;
                width: 25%;
                padding: 20px;
                @include fj();
                cursor: pointer;
                border-bottom: 1px solid #e6e6e6;

                &:hover {
                    background-color: $footer-color;
                }

                .list-item-l {
                    flex: 1;
                    @include fj(center);
                    flex-direction: column;
                    align-items: center;

                    > img {
                        @include wh(70px, 70px);
                    }

                    .list-item-l-span {
                        display: block;
                        margin-top: 10px;
                        text-align: center;
                        color: $gray;
                        font-size: 12px;
                    }
                }

                .list-item-r {
                    flex: 2;
                    flex-wrap: nowrap;
                    display: flex;
                    flex-direction: column;
                    padding-left: 15px;

                    .shop-title {
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

                    .star-level {
                        position: relative;
                        height: 20px;
                        width: 80px;
                        .star-dark{
                            position: absolute;
                            top: 0;
                            >i::before{
                                color: #d1d1d1;
                            }
                        }
                        .star-light{
                            position: absolute;
                            top: 0;
                            white-space: nowrap;
                            overflow: hidden;
                            >i::before{
                                color: #ff9a0d;
                            }
                        }
                    }

                    .delivery-cost {
                        font-size: 12px;
                        color: $gray;
                        margin-top: 3px;
                    }

                    .icon-list {
                        margin-top: 5px;

                        > i {
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

        .more-login {
            height: 50px;
            line-height: 50px;
            font-size: 18px;
            color: #333;
            border-top: 1px solid #e6e6e6;
            text-align: center;
            margin-top: -1px;

            .highlight {
                cursor: pointer;
            }
        }
    }
</style>