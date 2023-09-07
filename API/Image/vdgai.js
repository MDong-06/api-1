exports.name = '/api/vdgai';
exports.index = async(req, res, next) => {
    try {
     if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
        const vdgai = require('./data/json/vdgai.json');
        var image = vdgai[Math.floor(Math.random() * vdgai.length)].trim();
        res.jsonp({
            data: image,
            count: vdgai.length,
            author: 'Minh Đồng'
        });
    } catch (e) {
        return res.jsonp({ error: e      });
   }
}