import { request } from "../../utils/request";
import { showToast } from "../../utils/asyncwx";

// pages/more/more.js
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
    const { result } = await request({ url: 'juhe/dictionary/' + word, method: 'GET' })
    const { bihua, bushou, jijie, pinyin, zi } = result;
    this.setData({
      bihua,
      bushou,
      jijie,
      pinyin,
      zi
    })
  },
  async gethistory() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    console.log('========month:' + month + ', ' + day);
    const { result } = await request({ url: 'juhe/history/' + month + '/' + day, method: 'GET' });
    console.log(result);
    const history_dispaly = !this.history_dispaly;
    this.setData({
      history_list: result,
      history_dispaly: history_dispaly
    })
  },

})