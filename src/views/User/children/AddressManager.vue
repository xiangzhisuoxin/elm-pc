<!--  -->
<template>
  <section class="address">
    <div class="add-top">
      <div class="manage">地址管理</div>
    </div>
    <div class="add-list">
      <ul class="clear">
        <li>
          <div class="add-info">
            <div class="info-top">
              <div class="top-l">
                <span>deng</span>
                <span>先生</span>
              </div>
              <div class="top-r">
                <span>修改</span>
                <span>删除</span>
              </div>
            </div>
            <div class="add-detail">玉龙</div>
            <div class="tel">1313131331311</div>
          </div>
        </li>
        <li>
          <div class="add-info">
            <div class="info-top">
              <div class="top-l">
                <span>deng</span>
                <span>先生</span>
              </div>
              <div class="top-r">
                <span>修改</span>
                <span>删除</span>
              </div>
            </div>
            <div class="add-detail">玉龙</div>
            <div class="tel">1313131331311</div>
          </div>
        </li>
        <li>
          <div class="add-info">
            <div class="info-top">
              <div class="top-l">
                <span>deng</span>
                <span>先生</span>
              </div>
              <div class="top-r">
                <span>修改</span>
                <span>删除</span>
              </div>
            </div>
            <div class="add-detail">玉龙</div>
            <div class="tel">1313131331311</div>
          </div>
        </li>
        <li class="add-new">+增加新地址</li>
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
.address {
  border: 1px solid #eee;
  background-color: #fff;
  padding: 20px 18px;
  .add-top {
    border-bottom: 3px solid #ddd;
    display: flex;
    .manage {
      font-weight: 700;
      border-bottom: 3px solid #0089dc;
      height: 30px;
      margin-bottom: -3px;
      color: #666;
    }
  }
  .add-list {
    > ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      > li {
        float: left;
        border: 1px solid #eee;
        padding: 15px;
        color: #333;
        margin-top: 15px;
        font-size: 14px;
        width: 30%;
        height: 100px;
        
        &:hover {
          border: 1px solid #0089dc;
          .top-r >span{
            color: #0089dc !important;
          }
        }
        .add-info {
          .info-top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            .top-l {
            }
            .top-r {
              font-size: 12px;
              cursor: pointer;
              span {
                color: #666;
                padding: 0 5px;
              }
            }
          }
        }
        .add-detail,
        .tel {
          color: #666;
        }
      }
      .add-new{
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover{
          color:#0089dc;
        }
      }
    }
  }
}
</style>