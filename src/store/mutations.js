import {
    RECORD_USERINFO
} from "./mutation-types";

export default {
    //记录用户信息
    [RECORD_USERINFO](state, info) {
        state.userinfo = info;
        state.login = true;

    }
}