<!--  -->
<template>
  <div class="userinfo">
    <div class="welcome">
      <div class="avator">
        <i class="fa fa-user-circle-o"></i>
        <div class="info">
          <div class="name">{{username}}</div>
          <span class="des">你好</span>
        </div>
      </div>
      <div class="red-envelope">
        <span>我的红包</span>
        <span class="num">
          {{discountNum}}
          <span>个</span>
        </span>
      </div>
      <div class="coin">
        <span>我的金币</span>
        <span class="num">
          0
          <span>个</span>
        </span>
      </div>
      <div class="balance">
        <span>账户余额</span>
        <span class="num">
          0
          <span>个</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import gql from "graphql-tag";
import _ from "lodash";

export default {
  data() {
    return {
      username: "请登录",
      userId: "-1",
      orderList: [],
      discountNum: 0
    };
  },

  components: {},

  computed: {
    ...mapState(["userInfo"])
  },
  apollo: {
    //红包个数
    // discountOne: gql`
    //   {
    //     discountOne(userId: 1) {
    //       amount
    //     }
    //   }
    // `
  },
  watch: {
    // discountOne(val){
    //   this.discountNum=val.amount
    // }
  },

  mounted() {
    this.initData();
  },

  methods: {
    initData() {
      if (this.userInfo && this.userInfo.userId) {
        this.username = this.userInfo.username;
        this.userId = this.userInfo.userId;
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.userinfo {
  border: 1px solid #eee;
  background-color: #fff;
  // min-height: 680px;
  padding: 20px 18px;
  .welcome {
    display: flex;
    padding: 30px 0;
    .avator {
      margin-bottom: 20px;
      flex: 2;
      background-color: #fff;
      display: flex;
      align-items: center;
      > i {
        font-size: 100px;
        margin-left: 30px;
        color: #999;
      }
      .info {
        padding-left: 30px;
        .name {
          font-size: 18px;
        }
        .des {
          margin: 6px 0 10px;
          color: #999;
          font-size: 12px;
        }
      }
    }
    .red-envelope,
    .coin,
    .balance {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #eee;
      > span {
        &:nth-child(1) {
          font-size: 14px;
        }
        &:nth-child(2) {
          font-size: 30px;
          font-weight: 700;
          > span {
            font-size: 14px;
          }
        }
      }
    }
    .red-envelope {
      cursor: pointer;
      .num {
        color: #fc463f;
      }
    }
    .coin {
      .num {
        color: #5db423;
      }
    }
    .balance {
      .num {
        color: #ff9c00;
      }
    }
  }
}
</style>