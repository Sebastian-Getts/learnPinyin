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
    showToast({ title: '开发中~' });
  },

  async shichang() {
    showToast({ title: '开发中~' });
  },

  async yijian() {
    showToast({ title: '开发中~' });
  }
})