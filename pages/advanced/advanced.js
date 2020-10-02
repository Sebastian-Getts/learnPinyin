import {
  request
} from "../../utils/request";
import {
  login,
  showToast,
  showModal
} from "../../utils/asyncwx";
import {
  requestPro
} from "../../utils/requestPro";
const app = getApp();
Page({


  data: {
    list: [",/。", "ABC", "DEF", "GHI", "JKL", "MNO", "PQRS", "TUV", "WXYZ"],
    list2: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    qwe: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    asd: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    zxc: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    exam: [],
    bingo: false,
    letterOrWord: true,
    tips: false,
    testSuccess: false,
    wordList: [],
    singlePinyin: [],
    openid: ''
  },

  boardbtn(e) {
    let v = e.target.id;
    v = v.toUpperCase();
    const exam = this.data.exam;
    var target;
    var i = 0;
    let flag = false;
    //获取screen目标元素
    for (i; i < exam.length; i++) {
      if (exam[i].value == false) {
        target = exam[i].name;
        if (i == (exam.length - 1)) {
          flag = true;
        }
        break;
      }
    }

    if (target == undefined) {
      wx.showToast({
        title: '全部正确！请按空格键~',
        icon: 'none'
      })
      this.setData({
        bingo: true
      })
    } else {
      //匹配按键字母
      for (var j = 0; j < v.length; j++) {
        if (v[j] == target) {
          exam[i].value = true; //更改判断标识
          this.setData({
            exam: exam,
          });
          if (flag) {
            var that = this;
            setTimeout(function() {
              that.setData({
                bingo: flag
              })
            }, 200); //延迟时间 这里是1秒
            setTimeout(function() {
              that.blankbtn();
            }, 1000)
          }
          return;
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
      exam: target,
      bingo: false
    })
  },

  blankbtn() {
    // console.log('blank btn clicked...');
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

  async test() {
    await showToast({
      title: '功能开发中~'
    });
  },

  onLoad: function(options) {
    this.generate();
    this.getUserBasicInfo();
  },

  getUserBasicInfo() {
    const openid = wx.getStorageSync("openid");
    this.setData({
      openid
    })

  },
  async changeScreen() {
    try {
      let {
        letterOrWord,
        wordList
      } = this.data;
      if (letterOrWord && (wordList.length == 0)) {
        this.getNewWord();
      }
      this.setData({
        letterOrWord: !this.data.letterOrWord
      })
    } catch (error) {
      await showToast({
        title: error
      });
    }
  },

  async getNewWord() {
    const {
      wordList
    } = await request({
      url: "pickOne/word/5",
      method: "GET"
    });
    this.nextWord_help(wordList);
  },

  //change target test group
  nextWord_help(wordList) {
    const theWord = wordList[0].pinyin;
    const array = theWord.split('');
    let singlePinyin = [];
    array.forEach(element => singlePinyin.push({
      name: element,
      flag: false
    }));
    let {
      testSuccess
    } = this.data;
    testSuccess = false;
    this.setData({
      wordList,
      singlePinyin,
      testSuccess
    })
    wx.setStorageSync("word_detail", []);

  },

  async nextWord() {
    let {
      wordList
    } = this.data;
    if (wordList.length == 1) {
      this.getNewWord();
    } else {
      wordList.splice(0, 1);
      this.nextWord_help(wordList);
    }

  },

  getmore() {
    const map = this.data.wordList[0];
    const {
      encode
    } = map;
    wx.navigateTo({
      url: '/pages/more/more' + '?encode=' + encode,
    });
  },

  async challengeBoard(e) {
    // 获取键盘的字母。
    let v = e.target.id;
    v = v.toLowerCase();
    const test = this.data.singlePinyin;
    let target = '';
    let i = 0;
    // //获取screen目标元素
    for (; i < test.length; i++) {
      if (test[i].flag == false) {
        target = test[i].name;
        break;
      }
    }

    //匹配按键字母
    for (var j = 0; j < v.length; j++) {
      if (v[j] == target) {
        test[i].flag = true; //更改判断标识
        if (i == test.length - 1) {
          setTimeout(function() {
            wx.showToast({
              title: '正确啦，很厉害哦~',
              icon: 'none'
            });
          }, 200); //延迟时间 这里是1秒

          this.setData({
            singlePinyin: test,
            testSuccess: true
          });
        } else {
          this.setData({
            singlePinyin: test,
          });
        }

        break;
      }
    }

    if (target == '') {
      await showToast({
        title: '全部正确了哦~'
      });
    }

  },

  async collect() {
    try {
      let word_collection = this.data.wordList[0];
      const {
        openid
      } = this.data;
      let timestamp = new Date().getTime();
      timestamp = this.formatDate(timestamp);
      word_collection = { ...word_collection,
        openid,
        timestamp
      };
      const res = await request({
        url: 'collect/word',
        method: 'POST',
        data: word_collection
      });
      await showToast({
        title: res
      });
    } catch (error) {
      await showModal({
        content: error
      });
    }
  },

  async challengeBlank() {
    const {
      singlePinyin
    } = this.data;
    let hereFlag = false;
    singlePinyin.forEach(v => v.flag == false ? hereFlag = false : hereFlag = true);
    if (!hereFlag) {
      await showToast({
        title: '要按字母哦~'
      });
    } else {
      this.nextWord();
    }
  },

  formatDate(time) {
    var date = new Date(time);

    var year = date.getFullYear(),
      month = date.getMonth() + 1, //月份是从0开始的
      day = date.getDate(),
      hour = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds();
    var newTime = year + '-' +
      (month < 10 ? '0' + month : month) + '-' +
      (day < 10 ? '0' + day : day) + ' ' +
      (hour < 10 ? '0' + hour : hour) + ':' +
      (min < 10 ? '0' + min : min) + ':' +
      (sec < 10 ? '0' + sec : sec);

    return newTime;
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})