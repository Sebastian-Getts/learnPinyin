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
    list3: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
    qwe: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    asd: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    zxc: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    exam: [],
    bingo: false,
    checkLetter: [],
    letterOrWord: true,
    tips: false,
    testSuccess: false,
    wordList: [],
    singlePinyin: [],
    openid: '',
    discoverIdx: 0
  },

  /**
   * 匹配目标字母
   * @param {} e 
   * @returns 
   */
  boardbtn(e) {
    let v = e.target.id;
    v = v.toLowerCase();
    const exam = this.data.exam;
    const checkLetter = this.data.checkLetter;
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
        checkLetter[i] = true;
        break;
      }
    }
    // 全部正确，用户按了其他按钮
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
        // console.log(v[j] + ", targt: " + target);
        if (v[j] == target) {
          exam[i].value = true; //更改判断标识
          this.setData({
            exam: exam,
          });
          if (flag) {
            var that = this;
            setTimeout(function() {
              that.setData({
                bingo: flag,
                checkLetter: []
              })
            }, 200); //延迟时间 这里是1秒
            setTimeout(function() {
              that.blankbtn();
            }, 1000)
          }
          return;
        }
      }
      // 九键中遍历了所有的字母 还是错的：
      this.setData({
        checkLetter: checkLetter,
      });
      var that = this;
      setTimeout(function() {
        that.setData({
          checkLetter: [],
        });
      }, 250);
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
    var list = this.getRandomArrayElements(this.data.list3);
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
        title: '天天开心，万事顺遂～',
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
  /**
   * 更换至挑战模式
   */
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
    const wordList = await request({
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

  /**
   * 判断用户按键字母是否正确
   * @param {*} e 
   */
  async challengeBoard(e) {
    // 获取键盘的字母。
    let v = e.target.id;
    v = v.toLowerCase();
    const singlePinyin = this.data.singlePinyin;
    let target = '';
    let i = 0;
    // 获取screen目标元素target
    for (; i < singlePinyin.length; i++) {
      if (singlePinyin[i].flag == false) {
        target = singlePinyin[i].name;
        break;
      }
    }
    // 匹配按键字母，九键就多循环两次
    for (var j = 0; j < v.length; j++) {
      if(v[j] != target) continue;
      singlePinyin[i].flag = true; //更改判断标识
      if (i == singlePinyin.length - 1) {
        setTimeout(function() {
          wx.showToast({
            title: '正确啦，很厉害哦~',
            icon: 'none'
          });
        }, 200); //延迟时间 这里是1秒

        this.setData({
          singlePinyin: singlePinyin,
          testSuccess: true
        });
      } else {
        this.setData({
          singlePinyin: singlePinyin,
        });
      }

      break;
    }

    if (target == '') {
      await showToast({
        title: '全部正确了哦~'
      });
    }

  },

  /**
   * 收藏
   */
  async collect() {
    // mongoDB暂定使用
    this.test();
    // try {
    //   let word_collection = this.data.wordList[0];
    //   const {
    //     openid
    //   } = this.data;
    //   let timestamp = new Date().getTime();
    //   timestamp = this.formatDate(timestamp);
    //   word_collection = { ...word_collection,
    //     openid,
    //     timestamp
    //   };
    //   const res = await request({
    //     url: 'collect/word',
    //     method: 'POST',
    //     data: word_collection
    //   });
    //   await showToast({
    //     title: res
    //   });
    // } catch (error) {
    //   await showModal({
    //     content: error
    //   });
    // }
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
   * 在挑战模式中，主动显示字符，大约2s后隐藏。
   * 长按显示，松手隐藏
   */
  async displayStart() {
    let singlePinyin = this.data.singlePinyin
    let start = 0
    for (let index = 0; index < singlePinyin.length; index++) {
      if(singlePinyin[index].flag == true) start++
      singlePinyin[index].flag = true
    }
    this.setData({
      singlePinyin: singlePinyin,
      discoverIdx: start
    });
  },

  /**
   * 长按松手时，复原
   */
  async displayEnd() {
    let start = this.data.discoverIdx
    let singlePinyin = this.data.singlePinyin
    for (let index = start; index < singlePinyin.length; index++) {
      singlePinyin[index].flag = false
    }
    this.setData({
      singlePinyin: singlePinyin
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    for (let index = 0; index < 26; index++) {
      let e
      e.target.id = lsit3[index];
      challengeBoard(e);
    }
  }
})