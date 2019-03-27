<!--  -->
<template>
  <div class="userinfo">
    <div class="welcome">
      <div class="avator">
        <i class="fa fa-user-circle-o"></i>
        <div class="info">
          <div class="name">邓</div>
          <span class="des">你好</span>
        </div>
      </div>
      <div class="red-envelope">
        <span>我的红包</span>
        <span class="num">
          0
          <span>个</span>
        </span>
      </div>
      <div class="coin">
        <span>我的红包</span>
        <span class="num">
          0
          <span>个</span>
        </span>
      </div>
      <div class="balance">
        <span>我的红包</span>
        <span class="num">
          0
          <span>个</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
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