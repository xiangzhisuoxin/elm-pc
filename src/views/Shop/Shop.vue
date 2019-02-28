<template>
  <div class="wrap">
    <header>
      <nav>
        <my-header></my-header>
      </nav>
      <!--商家信息-->
      <div class="shop-info">
        <!--左侧标题-->
        <div class="info">
          <img class="img" src="../../assets/shop.webp" alt>
          <div class="info-name">
            <span>{{shopInfo.name}}</span>
            <el-rate v-model="shopInfo.rating" disabled show-score text-color="#ff9900"></el-rate>
          </div>
          <div class="info-status"></div>
        </div>
        <!--头部右侧-->
        <div class="min-price">
          <span class="info-title">起送价</span>
          <span class="info-con">¥{{shopInfo.float_delivery_fee}}</span>
        </div>
        <div class="deli-cost">
          <span class="info-title">配送费</span>
          <span class="info-con">¥{{shopInfo.float_delivery_fee}}</span>
        </div>
        <div class="speed">
          <span class="info-title">平均送达时间</span>
          <span class="info-con">{{shopInfo.order_lead_time}}</span>
        </div>
        <div class="save">收藏</div>
      </div>
    </header>
    <main>
      <!--主要部分头部-->
      <div class="main-nav">
        <ul class="nav-tab" @click="navTabClick($event)">
          <li class="nav-tab-active">所有商品</li>
          <li>评价</li>
          <li>商家资质</li>
        </ul>
        <ul class="nav-sort">
          <li class="nav-sort-active">默认排序</li>
          <li>评分</li>
          <li>销量</li>
          <li>价格</li>
        </ul>
        <div class="nav-btn">
          <span></span>
          <span></span>
        </div>
      </div>
      <!--主要部分 内容-->
      <div class="main-con">
        <div class="main-left">
          <!--所有商品tab页-->
          <menu-list v-if="tabIndex==0" :resId="1"></menu-list>
          <!-- 评价页 -->
          <rating v-if="tabIndex==1"></rating>
        </div>
        <div class="main-right">
          <div class="shop-ad">
            <div class="ad-title">商家公告</div>
            <div class="ad-con">
              <p class="ad-des">{{shopInfo.promotion_info}}</p>
              <div class="delivary">
                <span>配送说明：</span>
                <span v-if="shopInfo.piecewise_agent_fee">{{shopInfo.piecewise_agent_fee.tips}}</span>
              </div>
              <ul class="ad-acti">
                <li v-for="(item, index) in shopInfo.activities" :key="index">
                  <div class="activity">
                    <span
                      class="activity-icon"
                      :style="'background-color:#'+item.icon_color"
                    >{{item.icon_name}}</span>
                    <p>{{item.decription}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
    <my-footer :showCompanyInfo="true" :show-download-app="true"></my-footer>
  </div>
</template>

<script>
import MyHeader from "../../components/Header/Header";
import MyFooter from "../../components/Footer/MyFooter";
import MenuList from "../../components/common/MenuList";
import Rating from "../../components/common/Rating";
import { getShopById, getMenuByShopId } from "../../api/getData";
import {clickUtil} from '../../jsUtil/mUtils'
import { mapState, mapMutations } from "vuex";

export default {
  name: "Shop",
  components: {
    MyHeader,
    MyFooter,
    MenuList,
     Rating
  },
  data() {
    return {
      rating: 5,
      imgBac:
        "url(//shadow.elemecdn.com/faas/desktop/media/img/shop-bg.0391dd.jpg) no-repeat",
      shopInfo: {},
      tabIndex:0,
    };
  },
  computed: {
    ...mapState(["latitude", "longitude"])
  },
  mounted() {
    this.initData();
  },
  methods: {
    /**
     * 初始化数据
     */
    async initData() {
      let res = await getShopById({
        resId: 1,
        latitude: 23.12497,
        longitude: 113.26308
      });
      if (res.data.status == 1) {
        if (res.data.data.length) {
          this.shopInfo = res.data.data[0];
        }
        
      }
    },
    navTabClick(e){
      clickUtil({
        el:e.target,
        target:'li',
        callback:(el) => {
          $(el).siblings('li').removeClass('nav-tab-active');
          $(el).addClass('nav-tab-active')
          this.tabIndex = $(el).index();
        }
      })
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin";
.wrap {
  header {
    display: flex;
    flex-direction: column;
    background-image: url(//shadow.elemecdn.com/faas/desktop/media/img/shop-bg.0391dd.jpg);
    background-size: cover;

    nav {
      /deep/ header {
        .top {
          height: 48px;
          line-height: 48px;
          background-color: rgba(0, 0, 0, 0.6);
          .top-left {
            > ul > li {
              &.top-active {
                background-color: #000000;
              }
              &:hover {
                background: #0c0c0d;
              }
            }
          }
        }
      }
    }

    .shop-info {
      height: 150px;
      padding: 0 30px;
      display: flex;
      align-items: center;

      .info {
        display: flex;

        .img {
          width: 95px;
          height: 95px;
          border-radius: 50%;
          border: 4px solid rgba(255, 255, 255, 0.3);
        }

        .info-name {
          display: flex;
          flex-direction: column;
          max-width: 140px;
          justify-content: center;
          padding-left: 20px;

          > span {
            font-size: 20px;
            color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .info-status {
        }
      }

      .info-title {
        font-size: 14px;
        color: #fff;
      }

      .info-con {
        font-size: 18px;
        color: #fff;
      }

      .min-price,
      .deli-cost,
      .speed {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 40px;
        line-height: 35px;
      }

      .min-price {
        margin-left: auto;
      }

      .save {
        background: rgba(255, 255, 255, 0.1);
        width: 80px;
        height: 70px;
        border-radius: 5px;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: flex-start;
        cursor: pointer;
      }
    }
  }

  main {
    .main-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 40px;
      background-color: #fff;
      > ul {
        > li {
          float: left;
          color: #333;
          cursor: pointer;
        }
      }
      .nav-tab {
        > li {
          padding: 15px;
          width: 120px;
          text-align: center;
          &.nav-tab-active {
            color: #0089dc;
            border-bottom: 3px solid #0089dc;
          }
        }
      }
      .nav-sort {
        margin-left: auto;
        > li {
          width: 90px;
          text-align: center;
          font-size: 14px;
          &.nav-sort-active {
            color: #0089dc;
          }
        }
      }
    }
    .main-con {
      display: flex;
      padding: 20px 40px 0;
      .main-left {
        flex: 6;
        padding-right: 15px;
      }

      .main-right {
        flex: 2;
        .shop-ad {
          .ad-title {
            background-color: #0089dc;
            color: #ffffff;
            padding: 15px;
          }
          .ad-con {
            padding: 15px;
            line-height: 25px;
            background-color: #fff;
            font-size: 14px;
            border: 1px solid #eeeeee;
            border-top: 0;
            .ad-des {
              padding-bottom: 10px;
            }
            .delivary {
              display: flex;
              flex-direction: column;
              padding-bottom: 10px;
            }
            .ad-acti {
              .activity {
                display: flex;
                .activity-icon {
                  width: 21px;
                  height: 18px;
                  color: #fff;
                  font-size: 12px;
                  border-radius: 3px;
                  line-height: normal;
                  text-align: center;
                  margin-right: 3px;
                  margin-top: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.info .el-rate__icon {
  font-size: 12px;
}

.main-left {
  .el-tabs__nav-wrap {
    padding-left: 20px;
  }

  .el-tabs__item {
    height: 50px;
    line-height: 50px;
  }
}
</style>