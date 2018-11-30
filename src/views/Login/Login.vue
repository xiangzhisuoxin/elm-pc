<template>
    <div class="container">
        <loading v-if="isLoading"></loading>
        <main v-else class="main">
            <div class="logo-box">
                <!--<img class="logo" src="../../assets/login-logo.svg" alt="">-->
            </div>
            <form action="">
                <el-input class="account" v-model="username" placeholder="请输入账号"></el-input>
                <el-input class="pwd" v-model="password" type="password" placeholder="请输入密码"></el-input>
                <div class="verification">
                    <el-input class="code-input" v-model="verification" placeholder="请输入验证码"></el-input>
                    <img class="code-img" :src="verificationCode" alt="">
                </div>
                <el-button class="login-btn" type="success" @click="login('accountLogin')">登录</el-button>
            </form>
        </main>
        <footer>
            <span class="owner">所有方：上海拉扎斯信息科技有限公司</span>
            <span class="copyright">增值电信业务许可证 :沪B2-20150033|沪ICP备 09007032|上海工商行政管理 Copyright ©2008-2017 ele.me, All Rights Reserved.</span>
            <img class="num" src="../../assets/footer-num.jpg"/>
        </footer>
    </div>
</template>

<script>
    import Loading from '../../components/Loading'
    import {mapMutations} from 'vuex'
    import {getVerificationCode, accountLogin} from "../../api/getData";

    export default {
        data(){
            return{
                username: '',
                password:'',
                verification: '',
                verificationCode: '',
                isLoading: false,
            }
        },
        name: "Login",
        components:{
            Loading,
        },
        async mounted(){
            let res = await getVerificationCode();
            this.verificationCode = res.data.code;

        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO'
            ]),
            async login(type = 'accountLogin'){
                console.log(type);
                switch (type) {
                    case 'accountLogin':
                        this.isLoading = true;
                        let res = await accountLogin(this.username,this.password,this.verification);
                        this.isLoading = false;
                        switch (res.data.status) {
                            case 0:
                                alert('登录失败');
                                break;
                            case 1:
                                alert('登录成功');
                                this.RECORD_USERINFO(res.data.data.userInfo);
                                // this.$router.go(-1);
                                break;
                            case 2:
                                alert('验证码错误');
                                break;
                            case 3:
                                alert('密码错误');
                                break;
                        }
                        break;
                }

            },
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../style/mixin";
    .container{
        @include wh();
        background-color: #fff;
        .main{
            @include wh(300px, calc(100% - 60px));
            @include marAuto;
            @include fj(center);
            flex-direction: column;
            .logo-box{
                text-align: center;
                margin-bottom: 10px;
                .logo{
                    @include wh(140px, 56px);
                }
            }
            form{
                .account,.pwd,.verification{
                    margin-bottom: 15px;
                }
                .verification{
                    @include fj();
                    .code-input{
                        flex:4;
                    }
                    .code-img{
                        flex: 2;
                    }
                }
                .login-btn{
                    width: 100%;
                    font-size: 16px;
                }
            }
        }
        footer{
            position: relative;
            z-index: 2;
            @include fj(center);
            flex-direction: column;
            text-align: center;
            height: 100px;
            background-color:$footer-color;
            .num{
                @include marAuto;
                width: 100px;
            }
            .owner,.copyright{
                font-size: 12px;
                margin-bottom: 5px;
            }
            .owner{
                color: #999999;
            }
            .copyright{
                color: #bbbbbb;
            }
        }
    }

</style>

<style>
    .login-btn span{
        color: #ffffff;
    }
</style>