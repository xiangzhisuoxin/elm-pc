<!--  -->
<template>
  <div class="cart">
    <div class="cart-title">
      购物车<span class="clear" @click="clearOrder">[清空]</span>
    </div>
    <div class="cart-list">
      <ul>
        <li v-for="(item, index) in activeOrder" 
        :key="index">
          <div class="cart-item">
            <span class="food-name">{{item.name}}</span>
            <div class="num">
              <el-input-number 
              size="mini" 
              v-model="item.num"></el-input-number>
            </div>
            <span class="food-cost">¥{{item.cost}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="cart-sum">
      <div class="sum-l">
        <div class="car">
          <div class="pop-num" v-if="totalNum > 0">{{totalNum}}</div>
          <i class="el-icon-tickets"></i>¥<span class="cost-all">{{totalCost}}</span>
        </div>
        <span class="delivary-cost">配送费¥2</span>
      </div>
      <div class="sum-r" :class="{'can-pay': !(totalCost <minOrderCost)}">
        <span v-if="totalCost <minOrderCost">还差¥{{minOrderCost-totalCost}}起送</span>
        <span v-else>去结算></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // orderList:[
      //   {
      //     name:'name',
      //     price:10,
      //     num:1,
      //     id:''
      //   }
      // ],
      minOrderCost:20,
    };
  },
  props:['orderList'],
  components: {
  },

  computed: {
    // 经过处理后的order
    activeOrder(){
      return this.orderList.filter((item) => {
        if(item.num > 0) {
          item.cost = item.num *item.price;
          return true;
        }
      })
    },
    // 总价
    totalCost(){
      let cost = 0;
      this.activeOrder.map((item) => {
        cost += item.cost
      })
      return cost;
    },
    totalNum(){
      let num = 0;
      this.orderList.map((item) => {
        if(item.num > 0) {
          num += item.num;
        }
      })
      return num;
    }
  },

  mounted() {},

  methods: {
    // 给父组件调用的方法 改变购物车里的内容
    changeOrder({id,flag}){
      this.orderList.find((item) => {
        if(item.id === id){
          if(flag) {
            item.num++
          } else {
            item.num--;
          }
          return true;
        }
      })
    },

    clearOrder(){
      this.orderList = [];
    }
  }
}

</script>
<style lang='scss' scoped>
.cart{
  box-shadow: 0 1px 15px #ccc;
  width: 320px;
  display: flex;
  flex-direction: column;
  border-top: 2px solid #0089dc;
  background-color: #fafafa;
  .cart-title{
    padding:10px;
    font-size: 14px;
    border-bottom: 1px solid #eee;
    .clear{
      color:#0089dc;
      cursor: pointer;
    }
  }
  .cart-list{
    transition: all 0.3;
    >ul{
      >li{
        .cart-item{
          display: flex;
          font-size: 14px;
          align-items: center;
          padding: 8px 10px;
          border-bottom: 1px solid #eee;
          &:hover{
            background-color: #F5F5F5;
          }
          .num,
          .food-cost{
            text-align: right;
          }
          .num{
            flex:3;
          }
          .food-name{
            color:#666;
          }
          .food-cost{
            color: #f17530;
            flex:2;
          }
        }
      }
    }
  }
  .cart-sum{
    display: flex;
    height: 50px;
    .sum-l{
      flex:4;
      display: flex;
      background-color: #2c2c2c;
      align-items: center;
          padding: 0 10px;
      .car{
        font-size: 14px;
        color: #fff;  
        position: relative;
        .pop-num{
          position: absolute;
          top: -6px;
          left: 22px;
          height: 16px;
          line-height: 14px;
          min-width: 16px;
          border-radius: 50%;
          font-size: 12px;
          text-align: center;
          background-color: #ff2828;
          color: #fff;
          font-weight: 700;
        }
        >i{
          color: #fff;
          font-size: 26px;
          margin-right: 4px;
        }
        .cost-all{
          font-size: 20px;
          color:#fff;
        }
      }
      .delivary-cost{
        font-size: 12px;
        border-left: 1px solid #555;
        margin-left: 2px;
        padding-left: 6px;
        color: #999;
      }
    }
    .sum-r{
      flex:3;
      display: flex;
      align-items: center;
      background-color: #e4e4e4;
      color: #333;
      justify-content: center;
      >span{
        font-weight: 700;
      }
    }
    .can-pay{
      background-color: #51d862;
      cursor: pointer;
      >span{
        color:#fff;
      }
    }
  }
}
</style>
<style lang="scss">
.cart-item{
  .el-input-number--mini{
    width: 65px;
    line-height: 18px;
  }
  .el-input-number--mini .el-input-number__decrease, .el-input-number--mini .el-input-number__increase{
    width: 20px;
  }
  .el-input-number--mini .el-input__inner{
    padding-left: 5px;
    padding-right: 5px;
  }
  .el-input--mini .el-input__inner{
    height: 20px;
    line-height: 20px;
  }
}
</style>
