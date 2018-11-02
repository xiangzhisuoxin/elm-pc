<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>{{msg}}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {cityGuess} from "../api/getData";

export default {
    name: 'home',
    data() {
        return {
            msg: 'not connect'
        }
    },
    components: {
      HelloWorld
    },
    async mounted() {
        // var res = await axios.get('/api');
        // this.msg = res.data;
        let res = await cityGuess();
        this.msg = res.data;
    }
}
</script>
