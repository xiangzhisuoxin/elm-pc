<!--  -->
<template>
  <section class="order">
    <div class="order-top">
      <span class="latest">最近订单</span>
      <span class="all-list">查看所有订单</span>
    </div>
    <div class="order-list">
      <ul>
        <li>
          <img class="res-picture" src="../../../assets/shop.webp" alt>
          <div class="order-info">
            <span class="order-name">回味王麻辣烫麻辣香锅(友谊店)</span>
            <span class="order-detail">麻辣香锅一一微辣1份 / 麻辣香锅午餐肉双人餐＋矿泉水2瓶1份</span>
            <span class="order-num">共2个菜品></span>
          </div>
          <div class="order-time">2019-03-23 10:42</div>
          <div class="order-cost">¥13.40</div>
          <div class="order-state">订单已完成</div>
        </li>
      </ul>
    </div>
  </section>
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
            font-size:12px; 
          }
          .order-num {
            font-size:12px; 
            margin: 6px 0;
            color: #999;
          }
        }
        .order-time{
          color:#666;
          font-size: 12px;  
        }
        .order-cost{
          font-size: 16px;
        }
        .order-state{
          color:#666;
        }
      }
    }
  }
}
</style>