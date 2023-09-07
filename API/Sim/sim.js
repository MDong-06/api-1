exports.name = '/sim';
exports.index = async (req, res, next) => {
	if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
	const fs = require('fs');
	const dataSim = require('./data/data.json');
	const stringSimilarity = require('string-similarity');
	if (!req.query.type) return res.json({ error: 'thiếu dữ liệu để khởi chạy ' });
	if (req.query.type == 'ask') {
		const ask = encodeURI(req.query.ask);
		if (!ask) return res.jsonp({ error: 'thiếu dữ liệu để khởi chạy chương trình' });
		const msg = [];
		for (const id of dataSim) {
			const data = id.ask;
			msg.push(data);
		}

		const checker = stringSimilarity.findBestMatch(decodeURI(ask), msg);
		let search;
		if (checker.bestMatch.rating >= 0.5) {
			search = checker.bestMatch.target;
		}
		if (search == undefined) return res.jsonp({
			answer: 'Em hong hiểu gì hết!!!'
		});
		const find = dataSim.filter(i => i.ask.toLowerCase() == search.toLowerCase());
		const f2 = find[Math.floor(Math.random() * find.length)];
		const a = f2.ans[Math.floor(Math.random() * f2.ans.length)];
		return res.jsonp({
			answer: a
		});
	}
	if (req.query.type == 'teach') {
		const path = require('path').join(__dirname, 'data', 'data.json');
		const id = dataSim.length;
		const ask = req.query.ask;
		const ans = req.query.ans;
		if (!ask || !ans) return res.json({ error: 'thiếu dữ liệu để thực thi lệnh' });
		const f = dataSim.find(i => i.ask == ask);
		if (f != undefined) {
			if (f.ans.includes(ans)) return res.json({ error: 'Câu trả lời đã tồn tại!' });
			f.ans.push(ans);
		}
		else {
			dataSim.push({
				id,
				ask,
				ans: [
					ans
				]
			});
		}
		fs.writeFileSync(path, JSON.stringify(dataSim, null, 2), 'utf-8');
		return res.json({
			msg: 'Dạy sim thành công',
			data: {
				ask: ask,
				ans: ans
			}
		});
	}
};