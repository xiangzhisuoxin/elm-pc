<!--  -->
<template>
  <div class="cart">
    <div class="cart-title">
      购物车<span class="clear">[清空]</span>
    </div>
    <div class="cart-list">
      <ul>
        <li>
          <div class="cart-item">
            <span>鲜嫩小红腰</span>
            <div class="num">
              <el-input-number size="mini" v-model="num7"></el-input-number>
            </div>
            <span>¥2.5</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="cart-sum">
      <div class="sum-l">
        <img src="" alt="">
        <span></span>
      </div>
      <div class="sum-r">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {
    CartItem,
  },

  computed: {},

  mounted() {},

  methods: {}
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
    .clear{
      color:#0089dc;
    }
  }
}
</style>