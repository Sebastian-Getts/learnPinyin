const app = getApp();
const { AesDecrypt, AesEncrypt } = require('../utils/aesUtil.js');
const { getRandomStrAndNum } = require('../utils/commonUtil.js');
var RSA = require('../utils/wxapp_rsa.js')

var PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgRREA0qlxBiNY2PkA56T12v7ek2E3voU3iY/2ZRmQjtggdcIFOQQfpy9j63F63avKwW1W1oJsA4LCskMZBNFtn3SEoXt+o8+KGnjkVKrHDp0vK8uo9oY+H+i3MhNfli6ImkaDE3IZBJZIFbsPoGY7+5R1goV9sbOApBTBwPkr1RmGh/3qxAKN4y+F48T7jSgAk8fFFTRtkMREajFACsY4meIBzZfHEVc3nFJdk3W+iRLp/frc7+nxmGw7FwJLn0fkVw1/gLnb3y4gtaraaZl/J0nN5Sz3K1zSJJ+XbrOfGAxAt3ToJJqCIkshSPC9Nl1DqSWE7klYuEUqFD8iqCsJQIDAQAB-----END PUBLIC KEY-----';
let ajaxTimes = 0;
export const requestPro = (params) => {
  ajaxTimes++;
  wx.showLoading({
    title: 'Loading',
    mask: true,
  });
  const { base_url } = app.globalData;
  let { data } = params.data;

  // aes encrypt
  const aesKey = getRandomStrAndNum(16).toUpperCase();
  console.log('=========generate key: ' + aesKey);
  data = { ...data, aesKey };
  console.log(data);
  let requestData = AesEncrypt(JSON.stringify(data), aesKey, aesKey);
  console.log('============after encrypt by aes ...');
  // rsa encrypt
  var encrypt_rsa = new RSA.RSAKey();
  encrypt_rsa = RSA.KEYUTIL.getKey(PUBLIC_KEY);
  console.log('加密RSA:')
  console.log(encrypt_rsa)
  var encStr = encrypt_rsa.encrypt(requestData)
  encStr = RSA.hex2b64(encStr);
  console.log("加密结果：" + encStr)
  requestData = encStr;


  const body = { requestData };
  return new Promise((resolve, reject) => {
    wx.request({
      data: { body },
      url: base_url + params.url,
      method: 'POST',
      success: (res) => {
        console.log(res);

        //解密
        console.log(AesDecrypt(res.data.body.responseData));
        resolve(AesDecrypt(res.data.body.responseData, aesKey, iv));

      },
      fail: (e) => {
        reject(e);
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes === 0) {
          wx.hideLoading();
        }
      }
    });

  })
}