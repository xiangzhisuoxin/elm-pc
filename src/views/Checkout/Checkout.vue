<template>
  <div class="check">
    <header>
      <div class="top">
        <div class="position">
          当前位置:
          <span></span>
        </div>
        <div class="user"></div>
      </div>
      <div class="header-con">
        <div class="con-l">
          <div class="logo">
            <img class="logo" src="../../assets/login-logo.svg" alt>
            <span>订单信息</span>
          </div>
        </div>
      </div>
    </header>
    <div class="main">
      <!-- 左侧订单 -->
      <section class="main-l">
        <div class="order-top">
          <h2>订单详情</h2>
          <span class="back">返回商家修改</span>
        </div>
        <div class="order-list">
          <ul class="top">
            <li>
              <span>商品</span>
              <span>份数</span>
              <span>小计（元）</span>
            </li>
          </ul>
          <ul class="list">
            <li v-for="(item, index) in orderList" :key="index">
              <span>{{item.name}}</span>
              <span>{{item.num}}</span>
              <span>¥{{item.price*item.num}}</span>
            </li>
          </ul>
          <ul class="other">
            <li>
              <span>配送费</span>
              <span></span>
              <span>{{deliveryFee}}</span>
            </li>
          </ul>
        </div>
        <div class="sum">
          <span>¥</span>
          {{totalCost}}
        </div>
      </section>
      <!-- 右侧表单提交 -->
      <section class="main-r">
        <div class="info address">
          <div class="info-title">
            <span class="name">收货地址</span>
            <!-- <span class="link">添加新地址</span> -->
          </div>
          <div class="address-list">
            <ul v-if="addressOne">
              <li
                v-for="(item, index) in addressOne.slice(0,3)"
                :key="index"
                :class="{'address-list-active':index == 0}"
              >
                <i class="el-icon-location-outline"></i>
                <div class="detail">
                  <span class="person">{{`${item.name} ${item.sex==1?'先生':'女士'} ${item.phone}`}}</span>
                  <span class="addr">{{`${item.address} ${item.address_detail}`}}</span>
                </div>
              </li>
            </ul>
            <div v-if="addressOne&&addressOne.length>3" class="show-more">显示更多地址</div>
          </div>
        </div>
        <div class="info check">
          <div class="info-title">
            <span class="name">
              付款方式
              <small>推荐使用在线支付，不用找零，优惠更多</small>
            </span>
          </div>
          <div class="check-con">
            <ul>
              <li class="check-type-active">
                <span>在线支付</span>
                <span class="des">支持微信、支付宝、QQ钱包及大部分银行卡</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="info other-info">
          <div class="info-title">
            <span class="name">其他信息</span>
          </div>
          <div class="info-con">
            <div class="more">
              <span>订单备注</span>
              <el-input v-model="remark" placeholder="请输入内容"></el-input>
            </div>
          </div>
        </div>
        <el-button type="danger" @click="isShowBuyDialog=true">确认下单</el-button>
      </section>

      <!-- 确认下单弹窗 -->
      <section>
        <el-dialog title="下单提示" :visible.sync="isShowBuyDialog" width="30%">
          <span>您确定下单吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isShowBuyDialog = false">取 消</el-button>
            <el-button type="primary" @click="buy">确 定</el-button>
          </span>
        </el-dialog>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import gql from "graphql-tag";
export default {
  data() {
    return {
      remark: "",
      orderList: [],
      deliveryFee: 0,
      userId: 0,
      shopId: 0,
      shopName: "",
      addressId: 0,
      // addressList,
      isShowBuyDialog: false
    };
  },

  components: {},

  computed: {
    ...mapState(["userInfo", "shopDetail"]),
    totalCost() {
      let cost = 0;
      this.orderList.forEach(item => {
        cost += item.num * item.price;
      });
      cost += +this.deliveryFee;
      return cost;
    }
  },
  created() {
    this.orderList = this.$route.query.orderList;
    this.deliveryFee = this.$route.query.deliveryFee;
    if (!Array.isArray(this.orderList)) {
      this.orderList = [];
    }
  },
  apollo: {
    addressOne: {
      query() {
        return gql`{
          addressOne(userId:${this.userId}){
            name,
            sex,
            phone,
            address,
            address_detail
          }
        }`;
      }
    }
  },
  mounted() {
    if (this.userInfo) {
      this.userId = this.userInfo.userId;
    }
  },

  methods: {
    async buy() {
      this.isShowBuyDialog = false;
      let cart = [];
      this.orderList.forEach(item => {
        cart.push({
          name: item.name,
          quantity: item.num,
          price: item.price
        });
      });

      //做的很粗糙 不知道怎么写 json转字符串 怎么去掉key的"?
      let cartText=[]
      cart.forEach((item => {
        let text = `{name:"${item.name}"},{quantity:${item.quantity}},{price:${item.price}}`;
        cartText.push(text);
      }));
      cartText=`[${cartText.join(',')}]`;
      let tem = gql`mutation{
                      orderAdd(
                        shopId:${this.shopDetail.shopId},
                        shopName:"${this.shopDetail.shopName}",
                        userId:${this.userInfo.userId},
                        addressId:${this.addressId},
                        orderTime:"${new Date().getTime()}",
                        deliveryFee:{price:${this.deliveryFee}},
                        totalCost:10,
                        cart:${cartText}
                      ){

                        user_id
                      }
                    }`;
      this.$apollo.mutate({
        mutation:tem
      }).then(() => {
        this.$message({
          message: '下单成功',
          type: 'success'
        });
        setTimeout(() => {
          this.$router.push({ path: "/index" });
        }, 3000);
      }).catch(() => {
        this.$message.error("下单失败");
      })
    }
  }
};
</script>
<style lang='scss' scoped>
.check {
  header {
    .top {
      height: 30px;
      background-color: #0089dc;
      border-bottom: 1px solid #027ecb;
      padding: 0 40px;
      display: flex;
      align-items: center;
      .position {
        font-size: 12px;
        color: #fff;
      }
    }
    .header-con {
      background-color: #0089dc;
      display: flex;
      padding: 0 20px;
      align-items: center;
      height: 100px;
      .con-l {
        .logo {
          display: flex;
          align-items: center;
          > img {
            width: 150px;
            height: 50px;
          }
          > span {
            font-size: 26px;
            color: #fff;
            padding-left: 15px;
            border-left: 1px solid #fff;
          }
        }
      }
    }
  }
  .main {
    padding: 0 30px;
    display: flex;
    .main-l,
    .main-r {
      border: 1px solid #e0e0e0;
      background-color: #fff;
    }
    .main-l {
      flex: 1;
      .order-top {
        display: flex;
        padding: 20px;
        justify-content: space-between;
        border-bottom: 1px solid #e0e0e0;
        h2 {
          font-size: 16px;
          font-weight: 700;
        }
        .back {
          font-size: 12px;
          color: #666;
          cursor: pointer;
        }
      }
      ul {
        display: flex;
        padding: 0 30px;
        li {
          display: flex;
          width: 100%;
          > span {
            text-align: center;
            &:nth-child(1) {
              flex: 1;
              text-align: left;
            }
            &:nth-child(2) {
              flex: 1;
            }
            &:nth-child(3) {
              flex: 1;
            }
          }
        }
      }
      .top {
        border-bottom: 1px solid #eaeaea;
        li {
          font-weight: 700;
          color: #999;
          font-size: 14px;
          padding: 10px 0;
        }
      }
      .list {
        background-color: #fcfaf8;
      }
      .list,
      .other {
        border-bottom: 1px solid #eaeaea;
        li {
          padding: 5px 0;
          > span {
            color: #666;
          }
        }
      }
      .sum {
        text-align: right;
        font-size: 46px;
        color: #f74342;
        padding: 0 30px;
        > span {
          color: #f74342;
          font-size: 28px;
        }
      }
    }
    .main-r {
      flex: 2;
      margin-left: 20px;
      padding: 25px 20px 150px 30px;
      .info {
        margin-bottom: 20px;
        .info-title {
          display: flex;
          .name {
            font-size: 16px;
            font-weight: 700;
            padding-bottom: 15px;
          }
          .link {
            margin-left: auto;
            color: #0089dc;
            cursor: pointer;
          }
          small {
            color: #ff9c00;
            margin-left: 16px;
            font-size: 12px;
            font-weight: 400;
          }
        }
      }
      .address {
        .address-list {
          border: 1px solid #eee;
          ul {
            li {
              display: flex;
              padding: 10px;
              align-items: center;
              border-bottom: 1px solid #eee;
              cursor: pointer;
              &.address-list-active {
                border: 1px solid #0089dc;
                background: url("../../assets/icon-check.png") right bottom
                  no-repeat;
              }
              > i {
                border-right: 1px solid #eee;
                font-size: 30px;
                color: #ccc;
                padding-right: 15px;
              }
              .detail {
                padding-left: 20px;
                > span {
                  display: block;
                }
                .addr {
                  color: #666;
                }
              }
            }
          }
          .show-more {
            color: #999;
            padding: 8px;
            cursor: pointer;
          }
        }
      }
      .check {
        .check-con {
          ul {
            li {
              border: 1px solid #ddd;
              width: 48%;
              display: flex;
              flex-direction: column;
              padding: 10px;
              cursor: pointer;
              > span {
                padding: 3px 0;
                font-size: 14px;
              }
              .des {
                color: #999;
              }
              &.check-type-active {
                border-color: #0089dc;
                background: url("../../assets/icon-check.png") right bottom
                  no-repeat;
              }
            }
          }
        }
      }
      .other-info {
        .info-con {
          .more {
            display: flex;
            align-items: center;
            > span {
              padding: 0 10px;
            }
            /deep/ .el-input {
              width: 300px;
            }
          }
        }
      }
    }
  }
}
</style>