import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import vuexAlong from 'vuex-along'

Vue.use(Vuex);

const state = {
  latitude: '', // 当前位置纬度
  longitude: '', // 当前位置经度
  cartList: [], // 加入购物车的商品列表
  // shopDetail: {
  //   shopId:-1,
  //   shopName:'shopAdmin'
  // }, //商家详情信息
  shopDetail: null,
  userInfo: null, //用户信息
  // userInfo: {
  //   username:'admin',
  //   userId:-1
  // }, //用户信息
  invoice: false, //开发票
  searchAddress: null, //搜索并选择的地址
  geohash: '31.22299,121.36025', //地址geohash值
  addressIndex: null, //选择地址的索引值
  needValidation: null, //确认订单时是否需要验证
  cartId: null, //购物车id
  sig: null, //购物车sig
  orderParam: null, //订单的参数
  orderDetail: null, //订单详情
  isLogin: false, //是否登录

};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [vuexAlong],
})