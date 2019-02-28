<template>
  <div class="content">
    <div class="avatar">
      <img src="../../assets/Avatar.png" alt>
    </div>
    <div class="content-r">
      <div class="userinfo">
        <div class="username">{{username}}</div>
        <div class="moreinfo">
          <el-rate v-model="rate" 
          :colors="['#99A9BF', '#F7BA2A', '#FF9900']" 
          disabled></el-rate>
          <span class="time-cost">{{timecost}}</span>
        </div>
        <div class="rating-con">{{ratingText}}</div>
      </div>
      <div class="order-time">{{orderTime}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rating:2,
    };
  },
  props:['username','timecost','ratingText','orderTime','rate'],
  components: {},

  computed: {},

  mounted() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
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
    flex: 1;
    padding-left: 20px;
    padding-bottom: 20px;
    font-size: 14px;
    border-bottom: 1px solid #eee;
    .userinfo {
      > div {
        padding: 4px 0;
      }
      .moreinfo {
        display: flex;
        .time-cost {
          margin-left: 15px;
          color: #999;
        }
      }
    }
    .order-time {
      margin-left: auto;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>