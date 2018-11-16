<template>
    <div class="container">
        <loading v-if="isLoading"></loading>
        <div v-else class="main">
            <img :src="verificationCode" alt="">
        </div>
    </div>
</template>

<script>
    import Loading from '../../components/Loading'

    import {getVerificationCode, accountLogin} from "../../api/getData";

    export default {
        data(){
            return{
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

            res = await accountLogin('1', '2', '3');
            console.log(res);

        }
    }
</script>

<style scoped>

</style>