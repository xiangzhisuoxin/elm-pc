<template>
  <div>
    <el-input-number size="mini" :value="2" @change="handleChange"></el-input-number>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    handleChange(value) {
      console.log(value);
    }
  }
}

</script>
<style lang='scss' scoped>
</style>