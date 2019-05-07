import {
    RECORD_USERINFO,
    RECORD_ADDRESS,
    ADD_CART,
    QUIT_LOGIN,
    CLEAR_SHOPINFO,
    RECORD_SHOPINFO
} from "./mutation-types";
import { setStore } from "@/jsUtil/mUtils";

export default {
    //记录用户信息
    [RECORD_USERINFO](state, info) {
        state.userInfo = info;
        state.login = true;
    },
    //记录地址
    [RECORD_ADDRESS](state,{
        latitude,
        longitude
    }) {
        state.latitude = latitude;
        state.longitude = longitude
    },
    //记录购物车
    [ADD_CART](state,{
        resId,
        orderList
    }) {
        let arrCart=state.cartList;
        let isExist=false;
        let index = -1;
        arrCart.forEach((item,i)=>{
            if(item.resId==resId){
                index=i;
                isExist=true;
            }
        })
        if(isExist){
            state.cartList[index].orderList=orderList
        } else {
            state.cartList.push({resId,orderList});
        }

        setStore('buyCart',state.cartList);
    },
    //退出登录
    [QUIT_LOGIN](state){
        state.isLogin=false;
        state.userInfo=undefined;
    },

    //记录商家信息
    [RECORD_SHOPINFO](state,{shopId,shopName}){
        if(state.isLogin){
            state.shopDetail.shopId=shopId;
            state.shopDetail.shopName=shopName;
        }
    },

    //清楚商家信息
    [CLEAR_SHOPINFO](state){
        state.shopDetail=undefined;
    }
}