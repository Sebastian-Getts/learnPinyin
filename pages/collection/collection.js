import { request } from "../../utils/request";
import { showToast } from "../../utils/asyncwx";
const { getRandomStrAndNum } = require('../../utils/commonUtil.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    delBtnWidth: 160,
    isScroll: true,
    windowHeight: 0,
    year: '',
    month: '全部',
    word_list: []
  },

  async bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    let { value } = e.detail;
    const month = value.split('-')[1];
    const year = value.split('-')[0];
    const openid = wx.getStorageSync("openid");
    const word_list = await request({ url: 'collect/filterWordByMonth', method: 'POST', data: { year, month, openid } });
    this.setData({
      year,
      month,
      word_list
    })
  },

  getEndDate() {
    let month = new Date().getMonth() + 1;
    if (month.toString().length == 1) {
      month = "0" + month;
    }
    let year = new Date().getFullYear();
    console.log(year);
    const end_date = year + "-" + month;
    this.setData({
      end_date
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserWordList();
    this.getEndDate();
  },

  async getUserWordList() {
    const openid = wx.getStorageSync("openid");
    let word_list = await request({ url: 'collect/wordList', method: 'POST', data: { openid } });
    // 默认每个选项都是关闭状态
    word_list.forEach(item => {
      item.isOpen = false
    });
    this.setData({
      word_list
    })
  },

  async deleteAll() {
    const { word_list, month, year } = this.data;
    if (word_list.length == 0) {
      await showToast({ title: '收藏列表已经是空空如也' });
      return;
    }
    var that = this;
    wx.showModal({
      title: '温馨提示',
      content: '你确定要删除所有收藏的文字吗？（删除后不可恢复）',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      async success(result) {
        if (result.confirm) {
          const openid = wx.getStorageSync("openid");
          let res;
          if (month == '全部') {
            res = await request({ url: 'collect/wordMinusAll', method: 'POST', data: { openid } });
          } else {
            res = await request({ url: 'collect/deleteByMonth', method: 'POST', data: { year, month, openid } });
          }
          await showToast({ title: res });
          const word_list = [];
          that.setData({
            word_list
          })
        }
      }
    });

  },

  getMore(e) {
    const encode = e.target.id;
    wx.navigateTo({
      url: '/pages/more/more' + '?encode=' + encode,
    });
  },

  async handleDelete(e) {
    let { word_list } = this.data;
    let parameter;
    word_list.forEach(item => {
      if (item.encode == e.target.id) {
        parameter = item;
      }
    });
    try {
      await request({ url: 'collect/wordMinus', method: 'POST', data: parameter });
      this.getUserWordList();
    } catch (error) {
      await showToast({ title: error });
    }

  },

  handleSliderLeftStart: function (e) {
    this.data.word_list.forEach(todoItem => {
      // 除了当前项，其它打开项的菜单都关闭，确保每次只有一个项可以左滑显示删除
      if (todoItem.encode !== e.target.id && todoItem.isOpen) {
        todoItem.isOpen = false
      }
    });
    this.setData({
      word_list: this.data.word_list
    })
  },

})