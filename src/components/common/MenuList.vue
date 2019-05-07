<template>
  <div>
    <loading v-if="isLoading"></loading>
    <div v-else class="shop-wrap">
      <!-- <div class="food-type">
        <ul class="clear">
          <li v-for="(item, index) in menuList" :key="index">{{item.name}}</li>
        </ul>
      </div> -->
      <div class="food-list">
        <ul class="clear">
          <li v-for="(item, index) in menuList" :key="index">
            <div class="food-item">
              <div class="food-title">
                <span class="food-type">{{item.name}}</span>
                <small class="food-des">{{item.description}}</small>
              </div>
              <div class="food-col">
                <ul class="clear">
                  <li v-for="(food, index) in item.foods" :key="index">
                    <div class="item">
                      <div class="item-l">
                        <img src="../../assets/food.webp" alt>
                      </div>
                      <div class="item-m">
                        <span class="m-name">{{food.name}}</span>
                        <span class="m-des">{{food.description}}</span>
                        <el-rate v-model="food.rating" disabled show-score text-color="#ff9900"></el-rate>
                        <span
                          v-if="food.specfoods.length == 1"
                          class="m-cost"
                        >¥{{food.specfoods[0].price}}</span>
                        <span v-else class="m-cost">
                          {{getMinPrice(food.specfoods)}}
                          <span class="m-cost-min">起</span>
                        </span>
                      </div>
                      <!-- 右侧加入购物车 -->
                      <div class="item-r">
                        <div class="item-r-b" v-if="!getFood(food.item_id)">
                          <el-button
                            v-if="food.specfoods.length == 1"
                            type="primary"
                            @click="addToCart({id:food.item_id,name:food.name,price:food.specfoods[0].price,firstAdd:true})"
                            round
                          >加入购物车</el-button>
                          <el-popover
                            v-else
                            placement="right"
                            width="300"
                            :popIndex="index"
                            :value="popIndex == index"
                            @show="showPop(index)"
                            trigger="click">
                            <div class="type">
                              <div class="top">
                                <div class="top-title">规格</div>
                                <div class="type-list">
                                  <el-button
                                   size="mini" 
                                   round 
                                   v-for="(type, specIndex) in food.specfoods" 
                                   :autofocus="typeIndex == specIndex"
                                   @click="foodTypeClick(specIndex)"
                                   :key="specIndex">{{type.specs_name ==''? '默认': type.specs_name}}</el-button>
                                </div>
                              </div>
                              <div class="choose-info">
                                <span>已选：默认</span>
                                <div class="cost">¥{{food.specfoods[typeIndex].price || 20}}</div>
                              </div>
                              <div class="add-btn">
                                <el-button type="primary" 
                                @click="popAddToCart({
                                  id:food.specfoods[typeIndex].item_id,
                                  name:food.specfoods[typeIndex].name,
                                  specs_name:food.specfoods[typeIndex].specs_name,
                                  price:food.specfoods[typeIndex].price
                                  })">选好了，加入购物车</el-button>
                                <span @click="popAddToCart({no:true})">不要啦</span>
                              </div>
                            </div>
                            <el-button slot="reference" type="primary" @click="chooseType" round>选规格</el-button>
                          </el-popover>
                        </div>
                        <el-input-number v-else size="mini" v-model="getFood(food.item_id).num"></el-input-number>
                        <!-- <el-input-number v-else size="mini" v-model="orderList.find(item=>{return item.id==food.item_id}).num"></el-input-number> -->
                        <!-- <el-input-number v-else size="mini" v-model="a"></el-input-number> -->
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 购物车 -->
      <div class="cart">
        <cart :resId="resId" :orderList="orderList" :deliveryFee="deliveryFee"></cart>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "../Loading";
import Cart from "./Cart";
import { getMenuByShopId } from "../../api/getData";
export default {
  name: "",
  components: {
    Loading,
    Cart
  },
  data() {
    return {
      menuList: [],
      isLoading: true,
      orderList: [],
      popIndex:-1,
      typeIndex:0,/* 默认选择第一个 */
    };
  },
  props: ["resId","deliveryFee"],
  computed: {
    a() {
      return 1;
    }
    // getFood(){
    //   return (id) => {
    //     this.orderList.find(item => {
    //       if(item.id == id) {
    //         return item.num >0
    //       }
    //     })
    //   }
    // },
  },
  mounted() {
    this.initData();
    this.initCart();
  },

  methods: {
    
    /**
     * 初始化数据
     */
    initData() {
      let resId=this.resId
      getMenuByShopId({
        resId
      }).then(res => {
        if (res.data.status == 1) {
          this.menuList = res.data.data;
          console.log(res.data.data);
          this.isLoading = false;
        }
      });
    },
    initCart(){

    },
    /**
     * 多种规格的食物返回价格最低的
     */
    getMinPrice(item) {
      let minPrice = Number.POSITIVE_INFINITY;
      item.forEach(value => {
        if (minPrice > value.price) {
          minPrice = value.price;
        }
      });
      return minPrice;
    },
    /**
     * 添加到购物车
     * id 商品id
     * price 商品价格
     * firstAdd 0-1
     */
    addToCart({ id, price, firstAdd, name }) {
      let isIn = false;
      this.orderList.find(item => {
        if (item.id == id) {
          item.num++;
          isIn = true;
          return true;
        }
      });
      if (!isIn) {
        this.orderList.push({ id, num: 1, price, name });
      }
    },

    /**
     * 选规格
     */
    chooseType() {},
    getFood(id) {
      return this.orderList.find(item => {
        if (item.id == id) {
          return item.num > 0;
        }
      });
    },
    /**
     * 显示多规格弹窗
     * index pop弹窗的索引
     */
    showPop(index){
      this.popIndex = index;
      this.typeIndex = 0;
    },
    /**
     * 多规格弹窗添加到购物车按钮
     */
    popAddToCart({no=false,id,name,price}){
      this.popIndex = -1;
      if(no) {
        return;
      }
      this.addToCart({id,name,price})
    },
    /**
     * 多规格食物按钮点击事件
     */
    foodTypeClick(index){
      this.typeIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin";
/*所有商品*/
.shop-wrap {
  .food-type {
    > ul {
      padding: 12px 16px 2px;
      background-color: #ffffff;
      border: 1px solid #eee;
      > li {
        float: left;
        margin-right: 10px;
        margin-bottom: 7px;
        color: #666;
        cursor: pointer;
        font-size: 14px;
        padding: 3px 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        border-radius: 2px;
        width: 18%;
        &:hover {
          background-color: #eee;
        }
      }
    }
  }
  .food-list {
    > ul {
      > li {
        float: left;
        width: 100%;
        .food-item {
          .food-title {
            padding: 20px 0 10px 15px;
            .food-type {
              font-size: 20px;
              color: #333;
            }
            .food-des {
              font-size: 12px;
              color: #999;
              padding-left: 10px;
            }
          }
          .food-col {
            display: flex;
            background-color: #fff;
            > ul {
              width: 100%;
              background-color: $back-color;
              > li {
                width: 49%;
                float: left;
                margin-bottom: 10px;
                &:nth-child(2n-1) {
                  margin-right: 2%;
                }
                .item {
                  display: flex;
                  background-color: #fff;
                  border: 1px solid #eee;
                  .item-l {
                    width: 100px;
                    height: 100px;
                    display: flex;
                    > img {
                      width: 100%;
                      height: 100%;
                      cursor: pointer;
                    }
                  }
                  .item-m {
                    flex: 3;
                    padding: 10px 10px 0;
                    display: flex;
                    flex-direction: column;
                    .m-name {
                      font-size: 16px;
                      font-weight: 700;
                    }
                    .m-des {
                      font-size: 12px;
                      color: #999;
                      padding: 5px 0;
                    }
                    .m-cost {
                      color: #f74342;
                      font-size: 14px;
                      font-weight: 700;
                      margin-top: auto;
                      margin-bottom: 2px;
                      .m-cost-min {
                        color: #888;
                        font-weight: 700;
                        font-size: 12px;
                        margin-left: 3px;
                      }
                    }
                    /deep/ .el-rate {
                      .el-rate__icon {
                        font-size: 12px;
                        margin-right: 2px;
                      }
                    }
                  }
                  .item-r {
                    flex: 2;
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-end;
                    padding: 0 6px 6px 0;
                    /deep/ .el-button.is-round {
                      padding: 5px 19px;
                      > span {
                        color: #fff;
                        font-size: 12px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .cart {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 3
    ;
  }
}
// 选规格弹出的弹窗
.type {
  display: flex;
  flex-direction: column;
  background-color: #fcfcfc;
  .top {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 1px solid #eee;
    .top-title {
      font-size: 14px;
      padding-bottom: 10px;
      color: #666;
      margin-left: 8px;
    }
  }
  .choose-info {
    font-size: 14px;
    color: #666;
    line-height: 23px;
    padding: 5px 0;
    .cost {
      font-size: 16px;
      font-weight: 700;
      color: #ff6000;
    }
  }
  .add-btn{
    display: flex;
    /deep/ .el-button{
      flex:3;
      >span{
        color:#fff;
      }
    }
    >span{
      flex:2;
      text-align: center;
      cursor: pointer;
      color:#aaa;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

<style lang="scss">
.item-r {
  .el-input-number--mini {
    width: 65px;
    line-height: 18px;
  }
  .el-input-number--mini .el-input-number__decrease,
  .el-input-number--mini .el-input-number__increase {
    width: 20px;
  }
  .el-input-number--mini .el-input__inner {
    padding-left: 5px;
    padding-right: 5px;
  }
  .el-input--mini .el-input__inner {
    height: 20px;
    line-height: 20px;
  }
}
</style>