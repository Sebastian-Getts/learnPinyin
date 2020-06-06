const app = getApp();
let ajaxTimes = 0;
export const request = (params) => {
    ajaxTimes++;
    wx.showLoading({
        title: 'Loading',
        mask: true,

    });

    const { base_url } = app.globalData;
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: base_url + params.url,
            success: (res) => {
                console.log(res);
                if (res.data.code == 200) {
                    resolve(res.data.data);
                } else {
                    reject(res.data.message);
                }

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