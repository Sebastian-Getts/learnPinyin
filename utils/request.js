let ajaxTimes = 0;
export const request = (params) => {
    ajaxTimes++;
    wx.showLoading({
        title: 'Loading',
        mask: true,

    });

    const baseUrl = "https://www.venezza.top/learnPinyin/";
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (res) => {
                if (res.data.code == 200) {
                    resolve(res.data.data);
                } else {
                    reject(res.message);
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