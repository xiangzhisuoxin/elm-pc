<template>
  <div class="shop-list">
    <loading v-if="isLoading"></loading>
    <ul class="clear">
      <li v-for="(item, index) in shopList"
        :key="index"
        @click="toShop(item.id)"
      >
        <el-popover placement="right" width="250" trigger="hover">
          <!--商品hover弹出详细信息-->
          <div class="shop-hover">
            <div class="shop-detail">
              <div class="detail-title">{{item.name}}</div>
              <div class="detail-type">{{item.category}}</div>
              <div class="detail-supports">
                <ul>
                  <li v-for="(icon,index) in item.supports" :key="index">
                    <i class="support-icon" :style="'color:#'+icon.icon_color">{{icon.icon_name}}</i>
                    <span>{{icon.description}}</span>
                  </li>
                </ul>
              </div>
              <div class="detail-minite">
                <div class="send-cost">{{item.piecewise_agent_fee.tips}}</div>
                <div class="distance">
                  平均
                  <span class="distance-light">{{item.order_lead_time}}</span>分钟到达
                </div>
              </div>
              <div class="detail-des">{{item.description}}</div>
            </div>
          </div>
          <!--商品列表-->
          <div slot="reference">
            <div class="list-item-l">
              <!--<img :src="'//elm.cangdu.org/img/' + item.image_path"/>-->
              <img src="//elm.cangdu.org/img/164ad0b6a3917599.jpg">
              <div class="list-item-l-span">22分钟</div>
            </div>
            <div class="list-item-r">
              <div class="shop-title">{{item.name}}</div>
              <div class="star-level">
                <el-rate v-model="item.rating" disabled show-score text-color="#ff9900"></el-rate>
                <!--<div class="star-dark">
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
                </div>-->
              </div>
              <div class="delivery-cost">{{item.piecewise_agent_fee.tips}}</div>
              <div class="icon-list">
                <i
                  class="support-icon"
                  v-for="(icon,index) in item.supports"
                  :style="'color:#'+icon.icon_color"
                  :key="index"
                >{{icon.icon_name}}</i>
              </div>
            </div>
          </div>
        </el-popover>
      </li>
    </ul>
    <router-link tag="div" 
    :to="{path:'/login'}"
    class="more-login" 
    v-if="!isLogin">
      查看更多商家，请先
      <span class="highlight">登录</span>
    </router-link>
  </div>
</template>

<script>
import { getShopList } from "../../api/getData";
import { mapState, mapMutations } from "vuex";
import Loading from "../../components/Loading";

export default {
  name: "ShopList",
  components: {
    Loading
  },
  data() {
    return {
      offset: 0,
      limit: 20,
      isLoading: true,
      shopList: []
    };
  },
  computed: {
    ...mapState(["latitude", "longitude", "isLogin"])
  },
  props: [
    "restaurantCategoryId",
    "restaurantCategoryIds",
    "sortByType",
    "deliveryMode",
    "supportIds",
    "confirmSelect"
  ],
  watch: {
    //监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
    restaurantCategoryIds: function(value) {
      this.listenPropChange();
    },
    //监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
    /*restaurantCategoryId: function (value) {
                this.listenPropChange();
            },*/
    //监听父级传来的排序方式
    sortByType: function(value) {
      this.listenPropChange();
    },
    //监听父级的确认按钮是否被点击，并且返回一个自定义事件通知父级，已经接收到数据，此时父级才可以清除已选状态
    confirmSelect: function(value) {
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
      this.isLoading = true;
      getShopList({
        latitude: this.latitude,
        longitude: this.longitude,
        offset: this.offset,
        limit: this.limit,
        restaurant_category_id: this.restaurantCategoryId,
        restaurant_category_ids: this.restaurantCategoryIds
      }).then(res => {
        if (res.data.status == 1) {
          this.shopList = [...res.data.data];
          this.isLoading = false;
        }
      });
    },
    async listenPropChange() {
      this.offset = 0;
      this.isLoading = true;
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
        this.isLoading = false;
      }
    },
    //跳转到商家页
    toShop(shopId){
      if(!this.isLogin){
        this.$message({
          message: '请您先登录',
          type: 'warning'
        });
        return;
      }
      this.$router.push({
        path:'/shop',
        query:{
          shopId
        }
      })
    },
  }
};
</script>

<style lang="scss">
.shop-list .el-popover__reference {
  display: flex;
}
</style>

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
          /*width: 80px;*/
          .star-dark {
            position: absolute;
            top: 0;

            > i::before {
              color: #d1d1d1;
            }
          }

          .star-light {
            position: absolute;
            top: 0;
            white-space: nowrap;
            overflow: hidden;

            > i::before {
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

/*商家详细信息 hover触发*/
.shop-hover {
  .shop-detail {
    display: flex;
    flex-direction: column;

    .detail-title {
      font-size: 18px;
      font-weight: bold;
      padding: 5px 0;
    }

    .detail-type {
      font-size: 12px;
      color: $gray;
      border-bottom: 1px solid $gray;
      padding-bottom: 8px;
    }

    .detail-supports {
      font-size: 12px;
      color: #666;

      > ul {
        padding-top: 5px;

        > li {
          padding: 5px 0;
          display: flex;
        }
      }
    }

    .detail-minite {
      background-color: #eee;
      color: #333;
      display: flex;
      padding: 8px 0;
      margin: 10px 0;

      .send-cost {
        flex: 1;
        text-align: center;
        font-size: 12px;
      }

      .distance {
        text-align: center;
        font-size: 12px;
        flex: 2;
        border-left: 2px solid #aaa;

        .distance-light {
          color: red;
        }
      }
    }

    .detail-des {
      font-size: 12px;
      color: $gray;
      padding-top: 10px;
    }
  }
}

/*商家支持icon样式*/
.support-icon {
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
  height: 18px;
  border-radius: 2px;
  margin-right: 3px;
  white-space: nowrap;
}
</style>
