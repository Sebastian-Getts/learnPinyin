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
    wx.navigateTo({
      url: '/pages/collection/collection'
    });

  },

  async shichang() {
    showToast({ title: '开发中~' });
  },

  async yijian() {
    showToast({ title: '开发中~' });
  }
})