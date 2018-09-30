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
import axios from 'axios'

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
        var res = await axios.get('/api');
        this.msg = res.data;
    }
}
</script>
