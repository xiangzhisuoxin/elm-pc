import {
    RECORD_USERINFO,
    RECORD_ADDRESS
} from "./mutation-types";

export default {
    //记录用户信息
    [RECORD_USERINFO](state, info) {
        state.userInfo = info;
        state.login = true;
    },
    RECORD_ADDRESS(state,{
        latitude,
        longitude
    }) {
        state.latitude = latitude;
        state.longitude = longitude
    }
}