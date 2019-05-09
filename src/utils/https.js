const https = {
    request(options = {}) {
        const { url, method, data } = options;

        wx.showLoading({
            title: "请等一等哦！"
        });

        return new Promise((resolve, reject) => {
            wx.request({
                url,
                method,
                data,
                success: function(res) {
                    wx.hideLoading();

                    if (res.statusCode == 404) {
                        reject(); //reject 表示操作的最终状态为拒绝
                        return false;
                    } else if (res.statusCode != 200) {
                        wx.showToast({
                            title: '你的网络出错啦！',
                            icon: "none"
                        });
                        return false;
                    }
                    resolve(res.data); //成功的话返回数据
                },

                fail: function(error) {
                    wx.hideLoading();
                    reject(error);
                },
                complete: function() {
                    wx.hideLoading();
                }
            });
        });
    }
};

export default https;