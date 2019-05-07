<template>
  <!-- <div class="address"> -->
  <el-dialog title="收货地址" :visible.sync="isShowNewModel" @close="closeAddressModel">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="姓名" :label-width="formLabelWidth" required prop="name">
        <el-input v-model="form.name" placeholder="请输入您的名字"></el-input>
      </el-form-item>
      <el-form-item prop="sex" label="性别" :label-width="formLabelWidth" required>
        <el-radio v-model="form.sex" :label="1">男</el-radio>
        <el-radio v-model="form.sex" :label="0">女</el-radio>
      </el-form-item>
      <el-form-item prop="address" label="位置" :label-width="formLabelWidth" required>
        <el-input v-model="form.address" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" :label-width="formLabelWidth">
        <el-input v-model="form.address_detail" placeholder="单元、门号"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机号" :label-width="formLabelWidth" required>
        <el-input v-model="form.phone" placeholder="请输入您的手机号"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeAddressModel">取 消</el-button>
      <el-button type="primary" @click="confirmAdd('form')">确 定</el-button>
    </div>
  </el-dialog>
  <!-- </div> -->
</template>

<script>
import { mapState } from "vuex";
import gql from "graphql-tag";
export default {
  name: "",
  components: {},
  data() {
    return {
      isShowNewModel: this.isShowModel,
      formLabelWidth: "80px",
      rules: {
        name: [{ required: true, message: "未输入" }],
        sex: [{ required: true, message: "未输入" }],
        address: [{ required: true, message: "未输入" }],
        phone: [{ required: true, message: "未输入" }]
      }, //表单验证
      form: {
        name: "",
        sex: "",
        address: "",
        address_detail: "",
        phone: ""
      } //新地址弹窗表单
    };
  },
  props: {
    addressInfo: {
      type: Object,
      default: {}
    },
    isNew: {
      type: Boolean,
      default: false
    },
    isShowModel: {
      type: Boolean,
      default: false
    },
    popType: {
      type: String,
      default: "新增"
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    if (!this.isNew) {
      this.form = {...this.addressInfo};
    }
  },
  methods: {
    closeAddressModel() {
      this.$emit("closeAddressModel");
    },
    confirmAdd(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          switch (this.popType) {
            case "新增":
              let tem = gql`mutation{
                addressAdd(
                  userId:${this.userInfo.userId},
                  address:"${this.form.address}",
                  phone:"${this.form.phone}",
                  name:"${this.form.name}",
                  addressDetail:"${this.form.address_detail || ""}",
                  sex:${this.form.sex},
                ){
                  user_id
                }
              }`;
              this.$apollo
                .mutate({ mutation: tem })
                .then(() => {
                  this.$message({
                    message: "增加成功",
                    type: "success"
                  });
                  this.closeAddressModel();
                  this.$emit("refreshAddressList");
                })
                .catch(() => {
                  this.$message.error("增加失败");
                });
              break;
            case "编辑":
              let tem2 = gql`mutation{
                addressUpdate(
                  address:"${this.form.address}",
                  phone:"${this.form.phone}",
                  addressId:"${this.form._id}",
                  name:"${this.form.name}",
                  addressDetail:"${this.form.address_detail || ""}",
                  sex:${this.form.sex},
                ){
                  user_id
                }
              }`;
              this.$apollo.mutate({
                mutation:tem2
              }).then(() => {
                  this.$message({
                    message: "修改成功",
                    type: "success"
                  });
                  this.closeAddressModel();
                  this.$emit("refreshAddressList");
                })
                .catch(() => {
                  this.$message.error("修改失败");
                });
              break;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.address {
  display: flex;
}
</style>