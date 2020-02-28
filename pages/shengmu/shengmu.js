// pages/shengmu/shengmu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [",/。", "ABC", "DEF", "GHI", "JKL", "MNO", "PQRS", "TUV", "WXYZ"],
    list2: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    qwe: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    asd: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    zxc: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    exam: []
  },

  boardbtn(e) {
    var v = e.target.id;
    v = v.toUpperCase();
    var exam = this.data.exam;
    var target;
    var i = 0;
    //获取目标元素
    for (i; i < exam.length; i++) {
      if (exam[i].value == false) {
        target = exam[i].name;
        break;
      }
    }

    if (target == undefined) {
      wx.showToast({
        title: '全部正确！请按空格键~',
        icon: 'none'
      })
    } else {
      //匹配按键字母
      for (var j = 0; j < v.length; j++) {
        if (v[j] == target) {
          exam[i].value = true; //更改判断标识
          this.setData({
            exam: exam
          })
          break;
        }
      }
    }
  },

  getRandomArrayElements(arr) {
    var shuffled = arr.slice(0),
      i = arr.length,
      min = i - 5,
      temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  },

  generate() {
    var list = this.getRandomArrayElements(this.data.list2);
    var target = [];
    for (var i = 0; i < list.length; i++) {
      var map = {};
      map.name = list[i];
      map.value = false;
      target.push(map);
    }
    this.setData({
      exam: target
    })
  },

  blankbtn() {
    console.log('blank btn clicked...');
    var exam = this.data.exam;
    var flag = true;
    for (var i = 0; i < exam.length; i++) {
      if (exam[i].value == false) {
        flag = false;
        break;
      }
    }
    if (flag) {
      this.generate();
    } else {
      wx.showToast({
        title: '全部输入正确才行哦~',
        icon: 'none'
      })
    }
  },
  changekbor() {
    this.setData({
      showOrNot: !this.data.showOrNot
    })
  },

  test() {
    wx.showToast({
      title: '还在开发中~',
      icon: 'none'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.generate();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})