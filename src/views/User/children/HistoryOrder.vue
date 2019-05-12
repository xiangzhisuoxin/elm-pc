<!--  -->
<template>
  <section class="order">
    <div class="order-top">
      <span class="latest">最近订单</span>
      <span class="all-list" @click="pageSize=orderList.length;isShowAll=true;" v-if="!isShowAll">查看所有订单</span>
    </div>
    <div class="order-list">
      <ul v-if="orderList">
        <li v-for="(item, index) in orderList.slice(0,pageSize)" :key="index">
          <img class="res-picture" src="../../../assets/shop.webp" alt>
          <div class="order-info">
            <span class="order-name">{{item.restaurant_name}}</span>
            <span class="order-detail">{{parseBasket(item.basket.group[0])}}</span>
            <span class="order-num">共{{item.basket.group[0].length}}个菜品></span>
          </div>
          <div class="order-time">{{item.formatted_created_at}}</div>
          <div class="order-cost">{{item.total_amount}}¥</div>
          <div class="order-state">支付成功</div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
import gql from "graphql-tag";
import _ from "lodash";

export default {
  data() {
    return {
      userId: -999,
      orderList: undefined,
      pageSize:3,
      isShowAll:false,
      orderOne:[],
    };
  },

  components: {},

  computed: {
    ...mapState(["userInfo"])
  },

  watch: {
    orderOne(val) {
      // this.orderList = _.flatten(val.order.basket.group);
      this.orderList = val;
    }
  },

  mounted() {
    this.initData();
  },

  methods: {
    initData() {
      if (this.userInfo) {
        this.userId = this.userInfo.userId;
      }

      this.getOrderList(this.pageSize);
    },
    parseBasket(arr=[]) {
      let text = [];
      if (arr&&arr.length) {
        text = _.map(arr, item => {
          return item.name + "*" + item.quantity;
        });
      }
      return text.join(",");
    },
    getOrderList(){
      let query=gql`{
          orderOne(userId: ${this.userId}) {
            restaurant_name
            formatted_created_at
            total_amount
            status_bar {
              color
              sub_title
              title
            }
            basket {
              packing_fee {
                price
                quantity
                name
              }
              group {
                name
                price
                quantity
              }
            }
          }
        }
      `;

      this.$apollo.query({
        query
      }).then(res => {
        this.orderOne = res.data.orderOne;
      })
    }
  }
};
</script>
<style lang='scss' scoped>
.order {
  .order-top {
    border-bottom: 3px solid #ddd;
    display: flex;
    justify-content: space-between;
    .latest {
      font-weight: 700;
      border-bottom: 3px solid #0089dc;
      height: 30px;
      margin-bottom: -3px;
      color: #666;
    }
    .all-list {
      font-size: 12px;
      color: #666;
      cursor: pointer;
    }
  }
  .order-list {
    > ul {
      > li {
        padding: 20px 0;
        display: flex;
        border-bottom: 1px solid #eee;
        .order-info,
        .order-time,
        .order-cost,
        .order-state {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .res-picture {
          width: 70px;
          height: 70px;
        }
        .order-info {
          display: flex;
          flex: 4;
          flex-direction: column;
          align-items: flex-start;
          padding-left: 10px;
          overflow: hidden;
          text-overflow: ellipsis;

          .order-name {
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
          }
          .order-detail {
            margin: 6px 0;
            color: #999;
            font-size: 12px;
          }
          .order-num {
            font-size: 12px;
            margin: 6px 0;
            color: #999;
          }
        }
        .order-time {
          color: #666;
          font-size: 12px;
        }
        .order-cost {
          font-size: 16px;
        }
        .order-state {
          color: #666;
        }
      }
    }
  }
}
</style>