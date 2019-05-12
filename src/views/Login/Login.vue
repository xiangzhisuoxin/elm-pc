<template>
    <div class="container">
        <loading v-if="isLoading"></loading>
        <main v-else class="main">
            <div class="logo-box">
                <img class="logo" src="../../assets/login-logo.svg" alt="">
            </div>
            <form action="">
                <el-input class="account" v-model="username" placeholder="请输入账号" ></el-input>
                <el-input class="pwd" v-model="password" type="password" placeholder="请输入密码" ></el-input>
                <div class="verification">
                    <el-input class="code-input" v-model="verification" placeholder="请输入验证码"></el-input>
                    <img class="code-img" @click="getVerfication" :src="verificationCode" alt="">
                </div>
                <el-button class="login-btn" type="success" @click="login('accountLogin')">登录</el-button>
            </form>
        </main>
        <my-footer :showCompanyInfo="true"></my-footer>
    </div>
</template>

<script>
    import Loading from '../../components/Loading'
    import MyFooter from '../../components/Footer/MyFooter'
    import {mapMutations} from 'vuex'
    import {getVerificationCode, accountLogin} from "../../api/getData";

    export default {
        data(){
            return{
                username: 'xixi',
                password:'123456',
                verification: '',
                verificationCode: '',
                isLoading: false,
            }
        },
        name: "Login",
        components:{
            Loading,
            MyFooter,
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
                                this.$message.error('登录失败')
                                break;
                            case 1:
                                this.$message({
                                  message: '登录成功',
                                  type: 'success'
                                });
                                this.RECORD_USERINFO({userId:res.data.data.userInfo.user_id,username:
                                res.data.data.userInfo.username});
                                this.$router.go(-1);
                                break;
                            case 2:
                                this.$message.error('验证码错误')
                                break;
                            case 3:
                                this.$message.error('密码错误')
                                break;
                        }
                        break;
                }
            },
            async getVerfication(){
                let res = await getVerificationCode();
                this.verificationCode = res.data.code;
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../style/mixin";
    .container{
        display: flex;
        flex-direction: column;
        @include wh();
        background-color: #fff;
        .main{

            width:300px;
            flex:1 1 auto;
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
                  // display: none;
                    .code-input{
                        flex:4;
                    }
                    .code-img{
                        flex: 2;
                        border:1px solid #eee;
                        cursor: pointer;
                    }
                }
                .login-btn{
                    width: 100%;
                    font-size: 16px;
                }
            }
        }
    }

</style>

<style>
    .login-btn span{
        color: #ffffff;
    }
</style>