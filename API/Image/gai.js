exports.name = '/api/gai';
exports.index = async(req, res, next) => {
    try {
     if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
        const gai = require('./data/json/gai.json');
        var image = gai[Math.floor(Math.random() * gai.length)].trim();
        res.jsonp({
            data: image,
            count: gai.length,
            author: 'Minh Đồng'
        });
    } catch (e) {
        return res.jsonp({ error: e      });
   }
}