import { showToast } from "../../utils/asyncwx";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  shuoming() {
    wx.navigateTo({
      url: '/pages/about/about',
    });
  },

  async shoucang() {
    showToast({ title: '维护中~'});
    // wx.navigateTo({
    //   url: '/pages/collection/collection'
    // });

  },

  async shichang() {
    showToast({ title: '开发中~' });
  },

  async yijian() {
    showToast({ title: '开发中~' });
  },

  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  }
})