function checkStatus(res) {
	if (res.status >= 200 && res.status <= 300) {
		// 未登录
		if (res.data.code === 403) {
			global.BUS.$message({
				type: 'error',
				message: res.data.msg
			});
			setTimeout(() => {
				global.router.replace('/login');
			}, 100);
		}
		return res.data;
	}
}

export function request(url, options) {
	return global.BUS.$axios(url, options)
					.then(checkStatus)
					.then((data) => data)
					.catch((err) => ({
						code: 500,
						err: err,
						msg: '网络异常'
					}));
};
