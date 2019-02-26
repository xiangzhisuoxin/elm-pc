import axios from 'axios';

/**
 * 获取当前城市
 * @returns {*}
 */
export const cityGuess = () => axios.get('/api/v1/cities', {
    params: {
        type: 'guess'
    }
});

/**
 * 获取热门城市
 * @returns {*}
 */
export const cityHot = () => axios.get('/api/v1/cities', {
    params: {
        type: 'cityHot'
    }
});

/**
 * 获取所有城市
 * @returns {*}
 */
export const cityGroup = () => axios.get('/api/v1/cities', {
    params: {
        type: 'cityGroup'
    }
});

/**
 * 获取验证码
 * @returns {*|void}
 */
export const getVerificationCode = () => axios.post('/api/v2/captchas');

/**
 * 账号密码登录
 * @param username {String} 账号
 * @param password {String} 密码
 * @param captchaCode {String} 验证码
 * @returns {*|void}
 */
export const accountLogin = (username, password, captchaCode) => axios.post('/api/v2/login', {
    type: 'account',
    username,
    password,
    captchaCode
});

/**
 * 选择地址页面 根据输入内容查询详细地址
 * @param cityId {Number} 当前城市id
 * @param keyword {String} 关键词
 * @returns {*}
 */
export const getDetailPlace = (cityId, keyword) => axios.get('/api/v1/pois', {
    params: {
        cityId,
        keyword,
    }
});

/**
 * 获取食物类别（总）
 * @returns {*}
 */
export const getFoodType = () => axios.get('/api/v1/foodType');

/**
 * 获取食物类别（详细）
 * @returns {*}
 */
export const getDetailFoodType = () => axios.get('/api/v1/getShopType');

/**
 * 获取商家列表
 * @param latitude {String} 纬度
 * @param longitude {String} 经度
 * @param offset {Number} 跳过多少条数据
 * @param limit {Number} 请求商店个数限制
 * @param order_by {Number} 排序方式id： 1：起送价、2：配送速度、3:评分、4: 智能排序(默认)、5:距离最近、6:销量最高|
 * @param delivery_mode {Array} 配送方式id
 * @param support_ids {Array} 餐馆支持特权的id
 * @param restaurant_category_id {Number} 餐馆分类id
 * @param restaurant_category_ids {Number} 餐馆小分类id
 * @returns {*}
 */
export const getShopList = ({
    latitude,
    longitude,
    offset = 0,
    limit = 20,
    order_by,
    delivery_mode,
    support_ids,
    restaurant_category_id,
    restaurant_category_ids,
}) => axios.get('/api/v1/shopList', {
    params: {
        latitude,
        longitude,
        offset,
        limit,
        order_by,
        delivery_mode,
        support_ids,
        restaurant_category_id,
        restaurant_category_ids,
    }
});

/**
 * 获取地址信息
 * @param geohash {String} 经纬度
 * @returns {*}
 */
export const getAddressInfo = (geohash) => axios.get('/api/v1/addressInfo', {
    params: {
        geohash
    }
});

/**
 * 根据关键词搜索店铺
 * @param latitude {String} 纬度
 * @param longitude {String} 经度
 * @param keyword {String} 关键词
 * @returns {*}
 */
export const getShopsByKeyword = ({
    latitude,
    longitude,
    keyword,
}) => axios.get('/api/v1/getShopsByKeyword', {
    params: {
        latitude,
        longitude,
        keyword,
    }
});

/**
 * 根据商家id获取商家信息
 *
 * @param {*} {
 *     resId,
 *     latitude,
 *     longitude,
 * }
 */
export const getShopById= ({
    resId,
    latitude,
    longitude,
}) => axios.get('/api/v1/getShopById', {
    params: {
        resId,
        latitude,
        longitude
    }
})

/**
 * 根据商家id获取商家食品列表
 * @param {*} param0 
 */
export const getMenuByShopId = ({
    resId
}) => axios.get('/api/v1/getMenuByShopId',{
    params:{
        resId
    }
})

/**
 * 根据商家id获取商家评论
 * @param {*} param0 
 */
export const getRatingByShopId = ({
    resId
}) => axios.get('/api/v1/getRatingByShopId',{
    params:{resId}
});