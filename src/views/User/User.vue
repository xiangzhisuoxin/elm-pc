<template>
  <div class="user">
    <header>
      <div class="header-l">
        当前位置:
        <span class="position">1</span>
        <i class="el-icon-arrow-right"></i>
        <span class="current">我的收藏</span>
      </div>
    </header>
    <main>
      <!-- 侧边栏 -->
      <aside>
        <!-- 个人中心 -->
        <div class="side user-center side-active">
          <div class="side-title">
            <i class="el-icon-star-on"></i>
            <h2>个人中心</h2>
          </div>
        </div>

        <!-- 我的订单 -->
        <div class="side user-order">
          <div class="side-title">
            <i class="el-icon-star-on"></i>
            <h2>我的订单</h2>
          </div>
          <ul>
            <li>近三个月订单</li>
          </ul>
        </div>

        <!-- 我的资料 -->
        <div class="side user-info">
          <div class="side-title">
            <i class="el-icon-star-on"></i>
            <h2>我的资料</h2>
          </div>
          <ul>
            <li>地址管理</li>
          </ul>
        </div>

        <!-- 我的收藏 -->
        <div class="side user-save">
          <div class="side-title">
            <i class="el-icon-star-on"></i>
            <h2>我的收藏</h2>
          </div>
        </div>
      </aside>

      <!-- 右侧信息 -->
      <div class="main-r">
        <!-- 用户信息 -->
        <userinfo></userinfo>

        <!-- 订单详情 -->
        <history-order></history-order>
        <!-- 地址管理 -->
        <address-manager></address-manager>

        <!-- 我的收藏 -->
        <my-save></my-save>
      </div>
    </main>
  </div>
</template>

<script>
import Userinfo from './children/Userinfo.vue'
import HistoryOrder from './children/HistoryOrder.vue'
import AddressManager from './children/AddressManager.vue'
import MySave from './children/MySave.vue'
export default {
  data() {
    return {};
  },

  components: {
    Userinfo,
    HistoryOrder,
    AddressManager,
    MySave,
  },

  computed: {},

  mounted() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
.user {
  padding: 0 20px;
  header {
    display: flex;
    height: 54px;
    align-items: center;
    .header-l {
      color: #999;
      margin-right: 5px;
      font-size: 12px;
      > i {
        font-weight: 700;
        color: #999;
      }
    }
  }
  main {
    display: flex;
    aside {
      .side {
        margin-bottom: 32px;
        width: 170px;
        .side-title {
          display: flex;
          margin-bottom: 8px;
          align-items: center;
          > i {
            font-size: 20px;
            color: #aaa;
            margin-right: 10px;
          }
          > h2 {
            font-size: 18px;
            font-weight: 600;
          }
        }
        > ul {
          padding-left: 30px;
          > li {
            font-size: 14px;
            cursor: pointer;
          }
        }
      }
      .side-active{
        color:#0089dc;
        i{
          color:#0089dc!important;

        }
      }
      .user-center {
      }
    }
    .main-r {
      flex:1;
      > section {
        border: 1px solid #eee;
        background-color: #fff;
        // min-height: 680px;
        padding: 20px 18px;
      }
    }
  }
}
</style>