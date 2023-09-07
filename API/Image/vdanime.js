exports.name = '/api/vdanime';
exports.index = async(req, res, next) => {
    try {
     if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
        const vdanime = require('./data/json/vdanime.json');
        var image = vdanime[Math.floor(Math.random() * vdanime.length)].trim();
        res.jsonp({
            data: image,
            count: vdanime.length,
            author: 'Minh Đồng'
        });
    } catch (e) {
        return res.jsonp({ error: e      });
   }
}