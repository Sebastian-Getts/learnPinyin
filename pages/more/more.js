// pages/more/more.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //生命周期函数--监听页面加载
  onLoad: function (options) {
    const { word } = options;
    // this.getXinhua(word);
  },

  getXinhua(word) {
    wx.request({
      url: 'https://v.juhe.cn/xhzd/query?word=' + word + '&key=',
      success: (res) => {
        console.log(res.data);
        const { result } = res.data;
        const { bihua, bushou, jijie, pinyin } = result;
        this.setData({
          bihua,
          bushou,
          jijie,
          pinyin,
          word
        })
      },
      fail: (e) => { console.log(e) },
    });

  },
  gethistory() {
    var reqTask = wx.request({
      url: '',
      data: {},
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  }

})