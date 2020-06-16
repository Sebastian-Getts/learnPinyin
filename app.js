App({
  async onLaunch() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        const { base_url } = this.globalData;
        const { code } = res;
        wx.request({
          url: base_url + 'wx/userInfo/' + code,
          header: { 'content-type': 'application/json' },
          method: 'GET',
          dataType: 'json',
          success: (result) => {
            wx.setStorageSync("openid", result.data.data.openid);
          },
          fail: (err) => { console.log(err) },
        });
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    base_url: 'https://www.venezza.top/learnPinyin/',
    // base_url: 'http://localhost:8001/learnPinyin/',
  }
})