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
const { generateRandomWords } = require("../../utils/wordGenerator");
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
    discoverIdx: 0,
    showOrNot: false,
    showSuccessAnimation: false,
    highlightKeyId: null, // 高亮的按键ID
    hintTimer: null // 提示定时器
  },

  /**
   * 匹配目标字母
   * @param {} e 
   * @returns 
   */
  boardbtn(e) {
    // 清除高亮
    if (this.data.hintTimer) {
      clearTimeout(this.data.hintTimer);
    }
    this.setData({
      highlightKeyId: null,
      hintTimer: null
    });
    
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
    // 确保在挑战模式和识键盘模式下都能切换键盘
    const newShowOrNot = !this.data.showOrNot;
    this.setData({
      showOrNot: newShowOrNot
    });
    console.log('键盘切换:', newShowOrNot ? '九键' : '全键');
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
      const newLetterOrWord = !this.data.letterOrWord;
      this.setData({
        letterOrWord: newLetterOrWord
      });
      
      // 动态切换页面背景色，优化视觉衔接
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      if (currentPage) {
        // 使用wx.nextTick确保页面渲染完成后再执行
        wx.nextTick(() => {
          if (!newLetterOrWord) {
            // 切换到挑战模式，添加挑战模式背景
            wx.setNavigationBarTitle({
              title: '挑战模式'
            });
          } else {
            // 切换回识键盘模式
            wx.setNavigationBarTitle({
              title: '识键盘'
            });
          }
        });
      }
    } catch (error) {
      await showToast({
        title: error
      });
    }
  },

  async getNewWord() {
    try {
      // 使用前端生成随机汉字，不再调用后端接口
      const wordList = generateRandomWords(5);
      this.nextWord_help(wordList);
    } catch (error) {
      console.error('生成随机汉字失败:', error);
      await showToast({
        title: '生成失败，请重试'
      });
    }
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
    // 清除高亮
    if (this.data.hintTimer) {
      clearTimeout(this.data.hintTimer);
    }
    this.setData({
      highlightKeyId: null,
      hintTimer: null
    });
    
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
        // 全部答对，先显示最后一个字母的正确状态，延迟后再显示成功动画
        const that = this;
        this.setData({
          singlePinyin: singlePinyin,
          testSuccess: true
        });
        
        // 延迟800ms，让用户看到全部拼音都选对了
        setTimeout(function() {
          that.setData({
            showSuccessAnimation: true
          });
          
          // 再延迟1.2秒后自动切换到下一题
          setTimeout(function() {
            that.setData({
              showSuccessAnimation: false
            });
            // 自动切换到下一题
            that.nextWord();
          }, 1200);
        }, 800);
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
   * 点击提示按钮，高亮显示需要按的按键
   */
  async displayStart() {
    const { letterOrWord, singlePinyin, exam, showOrNot, hintTimer } = this.data;
    
    // 清除之前的定时器
    if (hintTimer) {
      clearTimeout(hintTimer);
    }
    
    if (!letterOrWord) {
      // 挑战模式：找到下一个需要的字母
      let targetLetter = '';
      for (let index = 0; index < singlePinyin.length; index++) {
        if (singlePinyin[index].flag == false) {
          targetLetter = singlePinyin[index].name;
          break;
        }
      }
      
      if (targetLetter) {
        // 找到对应的按键并高亮
        this.highlightKey(targetLetter.toLowerCase(), showOrNot);
      } else {
        wx.showToast({
          title: '全部正确了哦~',
          icon: 'none'
        });
      }
    } else {
      // 识键盘模式：找到下一个需要的字母
      const nextIndex = exam.findIndex(item => !item.value);
      if (nextIndex !== -1) {
        const nextLetter = exam[nextIndex].name.toLowerCase();
        // 找到对应的按键并高亮
        this.highlightKey(nextLetter, showOrNot);
      } else {
        wx.showToast({
          title: '全部正确！请按空格键~',
          icon: 'none'
        });
      }
    }
  },

  /**
   * 高亮显示对应的按键
   * @param {string} letter 目标字母
   * @param {boolean} isNineKey showOrNot=false时是九键模式，showOrNot=true时是全键模式
   */
  highlightKey(letter, isNineKey) {
    let keyId = null;
    
    // isNineKey参数实际传入的是showOrNot的值
    // showOrNot=true 表示全键模式（26键，keyboard2）
    // showOrNot=false 表示九键模式（keyboard）
    
    if (!isNineKey) {
      // 九键模式（showOrNot=false）：找到包含该字母的按键组
      const list = this.data.list;
      for (let i = 0; i < list.length; i++) {
        const keyGroup = list[i].toLowerCase();
        if (keyGroup.includes(letter.toLowerCase())) {
          keyId = list[i]; // 使用原始格式，包含标点符号，如 ",/。", "ABC"
          break;
        }
      }
    } else {
      // 全键模式（showOrNot=true）：使用小写字母匹配（因为keyboard2使用小写字母数组qwe, asd, zxc）
      keyId = letter.toLowerCase();
    }
    
    if (keyId) {
      console.log('高亮按键:', keyId, '字母:', letter, '模式:', isNineKey ? '全键' : '九键');
      this.setData({
        highlightKeyId: keyId
      });
      
      // 3秒后自动取消高亮
      const timer = setTimeout(() => {
        this.setData({
          highlightKeyId: null,
          hintTimer: null
        });
      }, 3000);
      
      this.setData({
        hintTimer: timer
      });
    } else {
      console.log('未找到匹配的按键，字母:', letter, '模式:', isNineKey ? '全键' : '九键');
    }
  },

  /**
   * 长按松手时，复原（保留用于兼容，实际已改为点击）
   */
  async displayEnd() {
    // 保留空函数以兼容bindtouchend，如果需要可以在这里清除高亮
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