import { request } from "../../utils/request";
const { getRandomStrAndNum } = require('../../utils/commonUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserWordList();
  },

  async getUserWordList() {
    const openId = wx.getStorageSync("openid");
    console.log(openId);
    const word_list = await request({ url: 'collect/wordList', method: 'POST', data: { openId } });
    this.setData({
      word_list
    })
  }

})