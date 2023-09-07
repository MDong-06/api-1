exports.name = '/api/phongcanh';
exports.index = async(req, res, next) => {
    try {
     if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
        const phongcanh = require('./data/json/phongcanh.json');
        var image = phongcanh[Math.floor(Math.random() * phongcanh.length)].trim();
        res.jsonp({
            data: image,
            count: phongcanh.length,
            author: 'Minh Đồng'
        });
    } catch (e) {
        return res.jsonp({ error: e      });
   }
}