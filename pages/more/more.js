import { request } from "../../utils/request";
import { showToast } from "../../utils/asyncwx";

Page({

  data: {
    history_dispaly: false,
    history_list: []

  },

  onLoad: function (options) {
    const { word } = options;
    this.getXinhua(word);
  },

  async getXinhua(word) {
    try {
      let word_detail = wx.getStorageSync("word_detail") || [];
      if (word_detail.length == 0) {
        const { result } = await request({ url: 'juhe/dictionary/' + word, method: 'GET' })
        word_detail = result;
        wx.setStorageSync("word_detail", result);
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
      await showToast({ title: error });
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

})