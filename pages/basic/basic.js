// pages/yunmu/yunmu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
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
      name: "ao",
      value: "熬",
      flag: true
    }, {
      name: "ou",
      value: "欧",
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
      name: "ia",
      value: "呀",
      flag: true
    }, {
      name: "ie",
      value: "耶",
      flag: true
    }, {
      name: "iao",
      value: "腰",
      flag: true
    }, {
      name: "iou",
      value: "优",
      flag: true
    }, {
      name: "ian",
      value: "烟",
      flag: true
    }, {
      name: "in",
      value: "因",
      flag: true
    }, {
      name: "iang",
      value: "央",
      flag: true
    }, {
      name: "ing",
      value: "英",
      flag: true
    }, {
      name: "iong",
      value: "雍",
      flag: true
    }, {
      name: "ua",
      value: "蛙",
      flag: true
    }, {
      name: "uo",
      value: "窝",
      flag: true
    }, {
      name: "uai",
      value: "外",
      flag: true
    }, {
      name: "uen",
      value: "温",
      flag: true
    }, {
      name: "uang",
      value: "汪",
      flag: true
    }, {
      name: "ueng",
      value: "翁",
      flag: true
    }, {
      name: "üe",
      value: "约",
      flag: true
    }, {
      name: "üan",
      value: "冤",
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
      name: "ong",
      value: "红",
      flag: true
    }, {
      name: "uei",
      value: "威",
      flag: true
    }, {
      name: "uan",
      value: "弯",
      flag: true
    }],
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
    }],
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
    for (var i = 0; i < list.length; i++) {
      map = list[i];
      if (!map.flag) {
        map.flag = true;
        v = true;
      }
    }
    if (v == true) {
      this.setData({
        list: list
      })
    } else {
      wx.showToast({
        title: '全都是字母了哦~',
        icon: 'none'
      })
    }
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
    } else if (flag == 2 && length != 21) {
      list = this.data.list2
      bg2 = true;
    } else if (flag == 3 && length != 26) {
      list = this.data.list3
      bg3 = true;
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


  formatTime() {
    var now = new Date(),
      hour = now.getHours()
    var greetText;
    if (hour < 6) {
      greetText = "凌晨好, "
    } else if (hour < 9) {
      greetText = "早上好, "
    } else if (hour < 12) {
      greetText = "上午好, "
    } else if (hour < 14) {
      greetText = "中午好, "
    } else if (hour < 17) {
      greetText = "下午好, "
    } else if (hour < 19) {
      greetText = "傍晚好, "
    } else if (hour < 22) {
      greetText = "晚上好, "
    } else {
      greetText = "夜里好, "
    }
    return greetText
  },

  onLoad: function(options) {
    var greetText = this.formatTime();
    this.setData({
      list: this.data.list2,
      bg2: true,
      greet: greetText
    })
  },
})