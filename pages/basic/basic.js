Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    // 韵母
    list1: [{
      name: "a",
      value: "啊",
      flag: true
    }, {
      name: "o",
      value: "喔",
      flag: true
    }, {
      name: "e",
      value: "呃",
      flag: true
    }, {
      name: "i",
      value: "衣",
      flag: true
    }, {
      name: "u",
      value: "乌",
      flag: true
    }, {
      name: "ü",
      value: "迂",
      flag: true
    }, {
      name: "ai",
      value: "挨",
      flag: true
    }, {
      name: "ei",
      value: "诶",
      flag: true
    }, {
      name: "ui",
      value: "威",
      flag: true
    }, {
      name: "ao",
      value: "熬",
      flag: true
    }, {
      name: "ou",
      value: "欧",
      flag: true
    }, {
      name: "iu",
      value: "优",
      flag: true
    }, {
      name: "ie",
      value: "耶",
      flag: true
    }, {
      name: "üe",
      value: "约",
      flag: true
    }, {
      name: "er",
      value: "儿",
      flag: true
    }, {
      name: "an",
      value: "安",
      flag: true
    }, {
      name: "en",
      value: "恩",
      flag: true
    }, {
      name: "in",
      value: "因",
      flag: true
    }, {
      name: "un",
      value: "温",
      flag: true
    }, {
      name: "ün",
      value: "晕",
      flag: true
    }, {
      name: "ang",
      value: "昂",
      flag: true
    }, {
      name: "eng",
      value: "更",
      flag: true
    }, {
      name: "ing",
      value: "英",
      flag: true
    }, {
      name: "ong",
      value: "红",
      flag: true
    }],
    // 声母
    list2: [{
      name: "b",
      value: "玻",
      flag: true
    }, {
      name: "p",
      value: "坡",
      flag: true
    }, {
      name: "m",
      value: "摸",
      flag: true
    }, {
      name: "f",
      value: "佛",
      flag: true
    }, {
      name: "d",
      value: "德",
      flag: true
    }, {
      name: "t",
      value: "特",
      flag: true
    }, {
      name: "n",
      value: "讷",
      flag: true
    }, {
      name: "l",
      value: "勒",
      flag: true
    }, {
      name: "g",
      value: "哥",
      flag: true
    }, {
      name: "k",
      value: "科",
      flag: true
    }, {
      name: "h",
      value: "喝",
      flag: true
    }, {
      name: "j",
      value: "基",
      flag: true
    }, {
      name: "q",
      value: "欺",
      flag: true
    }, {
      name: "x",
      value: "希",
      flag: true
    }, {
      name: "zh",
      value: "知",
      flag: true
    }, {
      name: "ch",
      value: "吃",
      flag: true
    }, {
      name: "sh",
      value: "诗",
      flag: true
    }, {
      name: "r",
      value: "日",
      flag: true
    }, {
      name: "z",
      value: "资",
      flag: true
    }, {
      name: "c",
      value: "雌",
      flag: true
    }, {
      name: "s",
      value: "思",
      flag: true
    }, {
      name: "y",
      value: "医",
      flag: true
    }, {
      name: "w",
      value: "乌",
      flag: true
    }],
    // 大小写
    list3: [{
      name: "a",
      value: "A",
      flag: true
    }, {
      name: "b",
      value: "B",
      flag: true
    }, {
      name: "c",
      value: "C",
      flag: true
    }, {
      name: "d",
      value: "D",
      flag: true
    }, {
      name: "e",
      value: "E",
      flag: true
    }, {
      name: "f",
      value: "F",
      flag: true
    }, {
      name: "g",
      value: "G",
      flag: true
    }, {
      name: "h",
      value: "H",
      flag: true
    }, {
      name: "i",
      value: "I",
      flag: true
    }, {
      name: "j",
      value: "J",
      flag: true
    }, {
      name: "k",
      value: "K",
      flag: true
    }, {
      name: "l",
      value: "L",
      flag: true
    }, {
      name: "m",
      value: "M",
      flag: true
    }, {
      name: "n",
      value: "N",
      flag: true
    }, {
      name: "o",
      value: "O",
      flag: true
    }, {
      name: "p",
      value: "P",
      flag: true
    }, {
      name: "q",
      value: "Q",
      flag: true
    }, {
      name: "r",
      value: "R",
      flag: true
    }, {
      name: "s",
      value: "S",
      flag: true
    }, {
      name: "t",
      value: "T",
      flag: true
    }, {
      name: "u",
      value: "U",
      flag: true
    }, {
      name: "v",
      value: "V",
      flag: true
    }, {
      name: "w",
      value: "W",
      flag: true
    }, {
      name: "x",
      value: "X",
      flag: true
    }, {
      name: "y",
      value: "Y",
      flag: true
    }, {
      name: "z",
      value: "Z",
      flag: true
    }],
    animation_list: [],
    bg1: false,
    bg2: false,
    bg3: false,
    display: false
  },

  reverse(e) {
    if (!this.data.display) {
      var list = this.data.list;
      var temp = e.currentTarget.dataset.myvalue;
      var map;
      for (var i = 0; i < list.length; i++) {
        map = list[i];
        if (map.value == temp) {

          this.animation_main = wx.createAnimation({ duration: 400, timingFunction: 'linear' })
          this.animation_back = wx.createAnimation({ duration: 400, timingFunction: 'linear' })

          // 点击正面
          if (map.flag == false) {
            this.animation_main.rotateY(180).step();
            this.animation_back.rotateY(0).step();
          }
          else {
            this.animation_main.rotateY(0).step()
            this.animation_back.rotateY(180).step()
          }
          map.ani_man = this.animation_main
          map.ani_back = this.animation_back

          // 更改flag
          list[i].flag = !map.flag;
          this.setData({
            list: list
          })
          break;
        }
      }
    }
  },

  shuffle() {
    var array = this.data.list;
    var currentIndex = array.length,
      temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    this.setData({
      list: array
    })
  },

  resume(v = false) {
    var list = this.data.list;
    var map;

    this.animation_main = wx.createAnimation({ duration: 400, timingFunction: 'linear' })
    this.animation_back = wx.createAnimation({ duration: 400, timingFunction: 'linear' })


    this.animation_main.rotateY(180).step();
    this.animation_back.rotateY(0).step();

    for (let i = 0; i < list.length; i++) {
      list[i].ani_man = this.animation_main
      list[i].ani_back = this.animation_back
    }

    this.setData({
      list: list
    })

  },

  choose(e) {
    var flag = e.target.id;
    var list;
    var bg1 = false;
    var bg2 = false;
    var bg3 = false;
    var length = this.data.list.length;

    if (flag == 1 && length != 34) {
      list = this.data.list1
      bg1 = true;
      if (list[0].ani_man == null) {
        console.log('init animation...');
        this.animation_main = wx.createAnimation({ duration: 400, timingFunction: 'linear' })
        this.animation_back = wx.createAnimation({ duration: 400, timingFunction: 'linear' })
        this.animation_main.rotateY(180).step();
        this.animation_back.rotateY(0).step();
        for (let i = 0; i < list.length; i++) {
          list[i].ani_man = this.animation_main
          list[i].ani_back = this.animation_back
        }
      }
    } else if (flag == 2 && length != 21) {
      list = this.data.list2
      bg2 = true;
    } else if (flag == 3 && length != 26) {
      list = this.data.list3
      bg3 = true;

      if (list[0].ani_man == null) {
        console.log('init animation list3...');
        this.animation_main = wx.createAnimation({ duration: 400, timingFunction: 'linear' })
        this.animation_back = wx.createAnimation({ duration: 400, timingFunction: 'linear' })
        this.animation_main.rotateY(180).step();
        this.animation_back.rotateY(0).step();
        for (let i = 0; i < list.length; i++) {
          list[i].ani_man = this.animation_main
          list[i].ani_back = this.animation_back
        }
      }
    }

    if ((flag == 1 && length == 34) || (flag == 2 && length == 21) || (flag == 3 && length == 26)) {

    } else {
      this.setData({
        list: list,
        bg1: bg1,
        bg2: bg2,
        bg3: bg3
      })
    }

  },

  displaybtn() {
    if (this.data.display == false) {
      this.resume(true);
    }
    this.setData({
      display: !this.data.display
    })
  },

  displaybtn_test() {
    wx.showToast({
      title: '功能开发中~',
      icon: 'none'
    });
  },


  formatTime() {
    var now = new Date(),
      hour = now.getHours()
    var greetText;
    if (hour < 6) {
      greetText = "凌晨好 "
    } else if (hour < 9) {
      greetText = "早上好 "
    } else if (hour < 12) {
      greetText = "上午好 "
    } else if (hour < 14) {
      greetText = "中午好 "
    } else if (hour < 17) {
      greetText = "下午好 "
    } else if (hour < 19) {
      greetText = "傍晚好 "
    } else if (hour < 22) {
      greetText = "晚上好 "
    } else {
      greetText = "夜里好 "
    }
    return greetText
  },

  onLoad: function (options) {
    var greetText = this.formatTime();

    let { list2 } = this.data;

    this.animation_main = wx.createAnimation({ duration: 400, timingFunction: 'linear' })
    this.animation_back = wx.createAnimation({ duration: 400, timingFunction: 'linear' })


    this.animation_main.rotateY(180).step();
    this.animation_back.rotateY(0).step();

    for (let i = 0; i < list2.length; i++) {
      list2[i].ani_man = this.animation_main
      list2[i].ani_back = this.animation_back
    }
    this.setData({
      list: list2,
      bg2: true,
      greet: greetText
    })
  },

  /**
* 用户点击右上角分享
*/
  onShareAppMessage: function () {

  }
})