<template>
  <div class="login">
    <div class="login-f">
      <div class="picture">
        <img src="/static/school.png" alt class="pic">
      </div>
      <div class="text-a">
        <div class="name">
          <input maxlength="12" placeholder="姓名/学号/工号">
        </div>
        <div class="section">
          <input type="idcard" placeholder="身份证/密码">
        </div>
      </div>
      <div class="ps">
        <p>新生首次登陆需输入姓名和身份证号</p>
      </div>
    </div>
    <button class="configer" type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">确认登陆</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods:{
    getUserInfo(e){
      //console.log(e.mp.detail.userInfo)
      if(e.mp.detail.userInfo){
        this.$store.dispatch("setInAuthenticated", true);
        this.$store.dispatch("setUser",e.mp.detail.userInfo);
        this.getCode();
      }
    },
    getCode(){
      wx.login({  //获取到code
        success:res => {
          console.log(res); //打印显示code
          this.getOpenid(res.code);
        }
      })
    },
    getOpenid(code) {
      //三个参数 appid secret code
      const appid = "wx18755699959d9fd1";
      const secret = "f4ad39f52232b0e9c003675b99c2eae2";

      


      this.$https.request({
        url: this.$interfaces.getOpenid + appid + "/" + secret + "/" + code,
        method:"get"
      }).then(res=>{
        console.log(res);
        //将Openid存储到vuex中
        this.$store.commit("setOpenId",res.openid);

        //请求课程数据
        this.isLearned(res.openid);

      }).catch(err => console.log(err));
    },
    isLearned(openid){
      this.$https.request({
        url:this.$interfaces.getMyLesson+openid,
        method:"get"
      }).then(res=>{
        console.log("已经回答过问题了");
        console.log(res);

        this.$store.dispatch("setLessonInfo",res);
        wx.switchTab({
          url:"../news/main"
        });
      })
      .catch(error => {
        console.log("还没有回答问题")
        wx.redirectTo({
          url:"../question/main"
        })
      })
    }
  }
};
</script>

<style scoped>
.login-f {
  position: absolute;
  top: 100px;
  left:20%;
}
.login .picture {
  display: flex;
  justify-content: center;
}
.picture .pic {
  width: 400rpx;
  height: 400rpx;
}
.text-a {
  position: absolute;
  margin-top: 40rpx;
  left: 100rpx;
}

.text-a input {
  justify-content: center;
  height: 100rpx;
  width: 500rpx;
  font-size: 40rpx;
}
.ps{
  margin-left: 8px;
  margin-top: 90%;
  font-size:14px;
  color:rgb(200, 41, 41);
}
.configer {
  position: absolute;
  top: 90%;
  left: 10%;
  width: 80%;
  background-color: #009eef;
  color: white;
}

</style>
