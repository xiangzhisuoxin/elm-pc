<template>
    <div>
        <footer>
            <div class="download-app" v-if="isShowDownloadApp">
                <div class="app-box">
                    <div class="app-picture">
                        <img src="../../assets/app.png"/>
                        <span>扫码下载 APP</span>
                    </div>
                    <div class="app-info">
                        <span>新用户首次下单</span>
                        <span>最高立减30元</span>
                        <span>立即下载APP，享更多优惠吧！</span>
                    </div>
                </div>
            </div>
            <div class="company-info" v-if="isShowCompanyInfo">
                <!-- <span class="owner">所有方：上海拉扎斯信息科技有限公司</span> -->
                <span class="copyright">备案号:</span>
                <a href="http://www.beian.miit.gov.cn">冀ICP备19020165号</a>
                <img class="num" src="../../assets/footer-num.jpg"/>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        data(){
            return{
                isShowDownloadApp:this.showDownloadApp || false,
                isShowCompanyInfo:this.showCompanyInfo || false,

            }
        },
        props:['showDownloadApp','showCompanyInfo']
    }
</script>

<style scoped lang="scss">
    @import "../../style/mixin";
    footer{
        position: relative;
        z-index: 2;
        @include fj(center);
        flex-direction: column;
        text-align: center;
        background-color:$footer-color;
        .download-app{
            width:600px;
            margin:0 auto;
            display: flex;
            justify-content: center;
            .app-box{
                padding:60px 0px;
                display:flex;
                .app-picture{
                    width: 160px;
                    height: 160px;
                    @include fj(center,center);
                    position: relative;
                    border: 1px solid #ddd;

                    >img{
                        @include wh(80%,80%);
                    }
                    >span{
                        position: absolute;
                        color:#999;
                        font-size: 12px;
                        bottom: 0;
                        left:50%;
                        transform: translate(-50%,50%);
                        background-color: $back-color;
                        width: 60%;
                        text-align: center;
                    }
                }
                .app-info{
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    padding-left: 10px;
                    >span{
                        display: block;
                        margin: 3px 0;
                        text-align: left;
                        &:nth-child(1){
                            font-size: 16px;

                        }
                        &:nth-child(2){
                            font-size: 30px;
                            font-weight: 600;
                            color: #f74342;
                        }
                        &:nth-child(3){
                            font-size: 16px;
                            color: #666;
                        }
                    }
                }
            }
        }
        .company-info{
            @include fj(center);
            flex-direction: column;
            text-align: center;
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