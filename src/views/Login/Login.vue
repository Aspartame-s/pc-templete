<template>
  <div class="container">
    <div class="left-img-container">
      <div class="top-container">
        <img src="../../assets/img/1.png" class="clock" alt="" />
        <img src="../../assets/img/图片 14@3x.png" alt="" class="school-img" />
      </div>
      <img
        src="../../assets/img/full-stack-developer-1946887-1651585 1.png"
        class="person"
        alt=""
      />
    </div>
    <div class="login-container">
      <div>
        <div class="login-title">数据中后台管理系统</div>
        <div class="login-tab">
          <div
            :class="['login-tab-item', item.active ? 'active-tab' : '']"
            v-for="(item, index) in tabs"
            :key="index"
            @click="selectLoginType(item.id)"
          >
            {{ item.type }}
          </div>
        </div>
        <div class="login-info">
          <div v-if="typeId == 1">
            <el-input v-model="userName" placeholder="用户名">
              <i
                slot="prefix"
                style="
                  display: flex;
                  align-items: center;
                  width: 20px;
                  height: 100%;
                "
              >
                <img
                  style="width: 20px; height: 20px; margin-left: 12px"
                  src="../../assets/img/Frame.png"
                  alt
                />
              </i>
            </el-input>
            <el-input v-model="passWord" placeholder="密码" show-password>
              <i
                slot="prefix"
                style="
                  display: flex;
                  align-items: center;
                  width: 20px;
                  height: 100%;
                "
              >
                <img
                  style="width: 20px; height: 20px; margin-left: 12px"
                  src="../../assets/img/Frame 1.png"
                  alt
                />
              </i>
            </el-input>
            <div class="login-btn" @click="login">登陆</div>
            <div class="handle-container">
              <el-switch
                v-model="value"
                active-color="#13ce66"
                active-text="记住密码"
              >
              </el-switch>
              忘记密码
            </div>
            <div class="handle-container">
              <div>创建账号</div>
              <div>其他帮助</div>
            </div>
          </div>
          <div class="qrcode" v-else>
            <qriously :value="qrcode" :size="180" />
          </div>
        </div>
      </div>
    </div>
    <img
      src="../../assets/img/school-alarm-5753328-4811786 1.png"
      alt=""
      class="right-img"
    />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tabs: [
        {
          id: 1,
          type: "账号登陆",
          active: 1,
        },
        {
          id: 2,
          type: "扫码登陆",
          active: 0,
        },
      ],
      userName: "",
      passWord: "",
      value: true,
      qrcode: "http://192.168.1.106:8080/index?name=jsh",
      typeId: 1,
    };
  },
  computed: {},
  watch: {},
  methods: {
    selectLoginType(id) {
      this.typeId = id;
      this.tabs.forEach((item) => {
        item.active = 0;
        if (item.id == id) {
          item.active = 1;
        }
      });
    },
    login() {
        this.$router.push('/index')
    }
  },
  created() {},
  mounted() {},
};
</script>
<style lang='scss' scoped>
.container {
  width: 1440px;
  //   min-height: 100vh;
  height: 900px;
  background-color: #fff;
  background-image: url("~@/assets/img/登录页背板_画板 1 2.png");
  background-repeat: no-repeat;
  background-size: 100%;
  padding-top: 248px;
  display: flex;
  .left-img-container {
    width: 631px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    margin-right: 9px;
    .top-container {
      height: 64px;
      display: flex;
      align-items: center;
      .clock {
        width: 58px;
        height: 48px;
        margin-right: 12px;
      }
      .school-img {
        width: 189px;
        height: 64px;
      }
    }
    .person {
      width: 631px;
      height: 421px;
    }
  }
  .login-container {
    width: 394px;
    height: 485px;
    padding-top: 52px;
    border-radius: 8px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 124px;
    .login-title {
      font-size: 22px;
      color: #00d88a;
      margin-bottom: 38px;
    }
    .login-tab {
      width: 296px;
      height: 38px;
      color: #333;
      font-size: 14px;
      margin-bottom: 32px;
      display: flex;
      .login-tab-item {
        cursor: pointer;
        flex: 1;
        border-bottom: 3.5px solid #ccc;
        @include center;
      }
      .active-tab {
        border-color: #00d88a;
      }
    }
    .login-info {
      width: 296px;
      min-height: 214px;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      /deep/ .el-input {
        margin-bottom: 24px;
        .el-input__inner {
          background-color: #e9e9e9;
          border-radius: 36px;
          font-size: 14px;
          color: #333;
          height: 35px;
          display: flex;
          align-items: center;
          padding-left: 44px;
          border-color: transparent;
          &::placeholder {
            color: #333;
          }
          .el-input__prefix {
            left: 16px !important;
          }
        }
      }
      .login-btn {
        width: 296px;
        height: 35px;
        border-radius: 36px;
        background-color: #00d88a;
        @include center;
        font-size: 14px;
        color: #fff;
        margin-bottom: 21px;
      }
      .handle-container {
        width: 296px;
        height: auto;
        @include between;
        margin-bottom: 12px;
        /deep/ .el-switch {
          .el-switch__label * {
            font-size: 10px;
            font-weight: 400;
          }
        }
      }
    }
  }
  .right-img {
    width: 225px;
    height: 225px;
    margin-top: 373px;
  }
}
</style>