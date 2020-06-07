import { request } from "../../utils/request";
import { showToast } from "../../utils/asyncwx";
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
    const openid = wx.getStorageSync("openid");
    const word_list = await request({ url: 'collect/wordList', method: 'POST', data: { openid } });
    this.setData({
      word_list
    })
  },

  async deleteAll() {
    const openid = wx.getStorageSync("openid");
    const res = await request({ url: 'collect/wordMinusAll', method: 'POST', data: { openid } });
    await showToast({ title: res });
    this.onLoad();
  },

  getMore(e) {
    const  encode  = e.target.id;
    wx.navigateTo({
      url: '/pages/more/more' + '?encode=' + encode,
    });
  },

})