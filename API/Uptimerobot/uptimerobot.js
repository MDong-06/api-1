exports.name = '/uptimerobot/create';
exports.index = async (req, res, next) => {
	if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
	const name = req.query.name || Date.now();
	const url = req.query.url;
	if (!url) return res.json({
		error: 'Thiếu URL để uptime cho bạn'
	});
	const request = require("request");

	const options = {
		method: 'POST',
		url: 'https://api.uptimerobot.com/v2/newMonitor',
		headers:
		{
			'content-type': 'application/x-www-form-urlencoded',
			'cache-control': 'no-cache'
		},
		form:
		{
			api_key: 'u2091568-a7717d4b89f93bd4d842b720',
			format: 'json',
			type: '1',
			url: url,
			friendly_name: name
		}
	};

	request(options, function (error, response, body) {
		console.log(body);
		if (error) return res.json({ error });
		if (JSON.parse(body).stat == 'fail') return res.json({ error: 'Đã xảy ra lỗi, màn hình này đã tồn tại' });
		const data = JSON.parse(body).monitor;
		return res.json({
			data
		});
	});
}