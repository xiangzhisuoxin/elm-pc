<template>
  <div>
    <loading v-if="isLoading"></loading>
    <div v-else class="shop-wrap">
      <div class="food-type">
        <ul class="clear">
          <li v-for="(item, index) in menuList" :key="index">{{item.name}}</li>
        </ul>
      </div>
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
                      <div class="item-r">
                        <el-button v-if="food.specfoods.length == 1" type="primary" round>选规格</el-button>
                        <el-button v-else type="primary" round>加入购物车</el-button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '../Loading'
import {getMenuByShopId } from "../../api/getData";
export default {
  name: "",
  components: {
    Loading
  },
  data() {
    return {
      menuList: [],
      isLoading:true,
    };
  },
  props: ["resId"],
  computed: {},
  mounted() {
    this.initData();
  },

  methods: {
    /**
     * 初始化数据
     */
    initData() {
      getMenuByShopId({
        resId: 1
      }).then(res => {
        if (res.data.status == 1) {
          this.menuList = res.data.data;
          console.log(res.data.data);
          this.isLoading = false;
        }
      });
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
}
</style>
<style lang="scss">
</style>