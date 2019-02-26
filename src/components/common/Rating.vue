<template>
  <div class="rating">
    <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all">
        <!-- 用户评论 -->
        <ul class="list">
          <li>
            <div class="content">
              <div class="avatar">
                <img src="../../assets/Avatar.png" alt>
              </div>
              <div class="content-r">
                <div class="userinfo">
                  <div class="username">4*******0</div>
                  <div class="moreinfo">
                    <el-rate
                      v-model="rating"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      disabled>
                    </el-rate>
                    <span class="time-cost">60分钟送达</span>
                  </div>
                  <div class="rating-con">好！！！</div>
                </div>
                <div class="order-time">2019-02-25 12:00:00</div>
              </div>
            </div>
          </li>
          <li>
            <div class="content">
              <div class="avatar">
                <img src="../../assets/Avatar.png" alt>
              </div>
              <div class="content-r">
                <div class="userinfo">
                  <div class="username">4*******0</div>
                  <div class="moreinfo">
                    <el-rate
                      v-model="rating"
                      :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                      disabled>
                    </el-rate>
                    <span class="time-cost">60分钟送达</span>
                  </div>
                  <div class="rating-con">好！！！</div>
                </div>
                <div class="order-time">2019-02-25 12:00:00</div>
              </div>
            </div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="满意" name="good">配置管理</el-tab-pane>
      <el-tab-pane label="不满意" name="bad">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getRatingByShopId } from "../../api/getData";
export default {
  data() {
    return {
      activeTab: "all",
      ratingList: [],
      rating:2,
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.initData();
  },

  methods: {
    initData() {
      getRatingByShopId({ resId: 1 }).then(res => {
        if (res.data.status === 1) {
          this.ratingList = res.data.data;
          console.log(res.data.data);
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang='scss' scoped>
.rating {
  background-color: #fff;
  .list {
    > li {
      .content {
        display: flex;
        padding: 20px 20px 0 20px;
        
        .avatar {
          > img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
          }
        }
        .content-r {
          display: flex;
          flex:1;
          padding-left: 20px;
          padding-bottom: 20px;
          font-size: 14px;
          border-bottom: 1px solid #eee;
          .userinfo{
            >div{
              padding: 4px 0;
            }
            .moreinfo{
              display: flex;
              .time-cost{
                margin-left: 15px;
                color: #999;
              }
            }
          }
          .order-time{
            margin-left: auto;    
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.el-rate__icon{
  margin-right: 2px;
}
</style>
