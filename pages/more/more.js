import { request } from "../../utils/request";
import { showToast, showModal } from "../../utils/asyncwx";

Page({

  data: {
    history_dispaly: false,
    history_list: []

  },

  onLoad: function (options) {
    const { encode } = options;
    this.getXinhua(encode);
  },

  async getXinhua(encode) {
    try {
      let word_detail = wx.getStorageSync("word_detail") || [];
      console.log(word_detail);
      if (word_detail.length == 0 || word_detail.encode != encode) {
        const { result } = await request({ url: 'juhe/dictionary/' + encode, method: 'GET' })
        word_detail = { ...result, encode };
        wx.setStorageSync("word_detail", word_detail);
      }
      const { bihua, bushou, jijie, pinyin, zi } = word_detail;
      this.setData({
        bihua,
        bushou,
        jijie,
        pinyin,
        zi
      })
    } catch (error) {
      await showModal({ content: error.toString() });
    }
  },

  async gethistory() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const today = now.getDate();
    try {
      let history_list = wx.getStorageSync("historical_today") || [];
      if (history_list.length == 0 || history_list[0].day != today) {
        const { result } = await request({ url: 'juhe/history/' + month + '/' + today, method: 'GET' });
        history_list = result;
        wx.setStorageSync("historical_today", result);
      }
      const history_dispaly = !this.history_dispaly;
      this.setData({
        history_list,
        history_dispaly
      })
    } catch (error) {
      await showToast({ title: error });
    }
  },

  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  }

})