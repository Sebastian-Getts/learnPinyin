export const showModal = ({ content }) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '温馨提示',
            content: content,
            showCancel: false,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });

    })
}

export const showToast = ({ title }) => {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: 'none',
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });

    })
}

export const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            timeout: 10000,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });


    })
}

export const requestPayment = ({ pay }) => {
    wx.showLoading({
        title: "Loading",
        mask: true
    });
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            ...pay,
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            },
            complete: (com) => {
                wx.hideLoading();
            }
        });
    })
}

export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });

    })
}

export const openSetting = () => {
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result);
            },
            fail: (err) => {
                reject(err);
            }
        });

    })
}

var auxiliary = "auxiliary"
export const storageSyncPut = (k, v, t) => {
    wx.setStorageSync(k, v)
    var seconds = parseInt(t)
    if (seconds > 0) {
        var newtime = Date.parse(new Date())
        newtime = newtime / 1000 + seconds;
        wx.setStorageSync(k + auxiliary, newtime + "")
    } else {
        wx.removeStorageSync(k + auxiliary)
    }
}

export const storageSyncGet = (k) => {
    console.log(k);
    var deadtime = wx.getStorageSync(k + auxiliary) == '' ? '' : parseInt(wx.getStorageSync(k + auxiliary));
    if (deadtime) {
        if (parseInt(deadtime) < Date.parse(new Date()) / 1000) {
            wx.removeStorageSync(k);
            console.log("过期了");
            wx.redirectTo({
                url: '/quanyi/login/login',
            });
            return null;
        }
    } else if (deadtime == '') {
        wx.redirectTo({
            url: '/quanyi/login/login',
        });
    }
    var res = wx.getStorageSync(k);
    console.log(res);
    if (res) {
        return res;
    } else {
        return null;
    }
}

export const storageSyncRemove = (k) => {
    wx.removeStorageSync(k);
    wx.removeStorageSync(k + auxiliary);
}

export const storageSyncClear = () => {
    wx.clearStorageSync();
}