<!--  -->
<template>
  <section class="address">
    <div class="add-top">
      <div class="manage">地址管理</div>
    </div>
    <div class="add-list">
      <ul class="clear">
        <li v-for="(item, index) in addressList" :key="index">
          <div class="add-info">
            <div class="info-top">
              <div class="top-l">
                <span>{{item.name}}</span>
                <span>{{item.sex==1?' 先生':' 女士'}}</span>
              </div>
              <div class="top-r">
                <span @click="editAddress(index)">修改</span>
                <span @click="deleteAddress(index)">删除</span>
              </div>
            </div>
            <div class="add-detail">{{item.address}}</div>
            <div class="tel">{{item.phone}}</div>
          </div>
        </li>
        <li class="add-new" @click="addAddress">+增加新地址</li>
      </ul>
    </div>
    <!-- 编辑地址弹窗 -->
    <edit-address
      :popType="popType"
      :is-new="isNewAddress"
      :address-info="addressInfo"
      :is-show-model="isShowModel"
      @closeAddressModel="closeAddressModel"
      @refreshAddressList="getAddressList"
      v-if="isShowModel"
    ></edit-address>


  </section>
</template>

<script>
import { mapState } from "vuex";
import EditAddress from "../../../components/common/EditAddress";
import gql from "graphql-tag";
export default {
  components: {
    EditAddress
  },
  data() {
    return {
      popType:'新增',
      isShowModel: false,
      isNewAddress: false,
      addressList: undefined,
      addressOne: [],
      
      addressInfo: {
        name: "",
        sex: "",
        address: "",
        detailAddress: "",
        phone: ""
      },
      userId:0,
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    this.initData();
  },
  watch: {
    addressOne(val) {
      this.addressList = val;
    }
  },
  methods: {
    initData() {
      if (this.userInfo) {
        this.userId = this.userInfo.userId;
      }

      this.getAddressList();
    },
    closeAddressModel() {
      this.isShowModel = false;
    },
    editAddress(index) {
      if (this.isNewAddress) {
        this.addressInfo = {};
      } else {
        this.addressInfo = this.addressList[index];
      }
      this.popType='编辑';
      this.isShowModel = true;
    },
    deleteAddress(index) {
      this.$confirm('您确定删除该地址吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this);
          
          let tem = gql`mutation{
              addressRemove(addressId:"${this.addressList[index]._id}"){
              user_id
            }
          }`;
          this.$apollo.mutate({
            mutation:tem
          }).then(() =>{
            this.getAddressList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() =>{
            this.$message.error('删除失败');
          })
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    addAddress(){
      this.addressInfo={};
      this.popType='新增';
      this.isShowModel = true;
    },
    getAddressList(){
      let tem =gql`{
            addressOne(userId:${this.userId}) {
              _id,
              sex,
              address,
              phone,
              st_geohash,
              address_detail,
              name
            }
          }
        `;
      this.$apollo.addSmartQuery('addressOne',{
        query:tem,
        fetchPolicy: 'cache-and-network',
      })
    },
  }
};
</script>
<style lang='scss' scoped>
.address {
  border: 1px solid #eee;
  background-color: #fff;
  padding: 20px 18px;
  .add-top {
    border-bottom: 3px solid #ddd;
    display: flex;
    .manage {
      font-weight: 700;
      border-bottom: 3px solid #0089dc;
      height: 30px;
      margin-bottom: -3px;
      color: #666;
    }
  }
  .add-list {
    > ul {
      > li {
        float: left;
        border: 1px solid #eee;
        padding: 15px;
        color: #333;
        margin-top: 15px;
        font-size: 14px;
        width: 30%;
        height: 100px;

        &:nth-child(3n + 2) {
          margin-left: 5%;
          margin-right: 5%;
        }
        &:hover {
          border: 1px solid #0089dc;
          .top-r > span {
            color: #0089dc !important;
          }
        }
        .add-info {
          .info-top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            .top-l {
            }
            .top-r {
              font-size: 12px;
              cursor: pointer;
              span {
                color: #666;
                padding: 0 5px;
              }
            }
          }
        }
        .add-detail,
        .tel {
          color: #666;
        }
      }
      .add-new {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: #0089dc;
        }
      }
    }
  }
}
</style>