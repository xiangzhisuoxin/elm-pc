<template>
  <div class="rating">
    <loading v-if="isLoading"></loading>
    <el-tabs v-else v-model="activeTab" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all">
        <!-- 用户评论 -->
        <ul class="list">
          <li v-for="(item, index) in ratingList.ratings" :key="index">
            <rating-item
              :timecost="item.time_spent_desc"
              :rate="item.rating_star"
              :orderTime="item.rated_at"
              :ratingText="item.rating_text"
              :username="item.username"
            ></rating-item>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="满意" name="good">
        <ul class="list">
          <li v-for="(item, index) in ratingList.ratings" :key="index">
            <rating-item
              :timecost="item.time_spent_desc"
              :rate="item.rating_star"
              :orderTime="item.rated_at"
              :ratingText="item.rating_text"
              :username="item.username"
            ></rating-item>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="不满意" name="bad">
        <ul class="list">
          <li v-for="(item, index) in ratingList.ratings" :key="index">
            <rating-item
              :timecost="item.time_spent_desc"
              :rate="item.rating_star"
              :orderTime="item.rated_at"
              :ratingText="item.rating_text"
              :username="item.username"
            ></rating-item>
          </li>
        </ul>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getRatingByShopId } from "../../api/getData";
import Loading from "../Loading";
import RatingItem from "./RatingItem";
export default {
  data() {
    return {
      activeTab: "all",
      ratingList: [],
      isLoading: true
    };
  },

  components: {
    RatingItem,
    Loading,
  },

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
          this.isLoading = false;
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
    }
  }
}
</style>
<style lang="scss">
.el-rate__icon {
  margin-right: 2px;
}
</style>
