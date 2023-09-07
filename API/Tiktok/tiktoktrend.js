exports.name = '/tiktok/trending';
const axios = require('axios');
exports.index = async (req, res, next) => {

   if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return; 
 const resp = await axios          .post('https://www.tikwm.com/api/feed/list', {
            region: 'VN',
            'count': 20,
            hd: 1
          });
  if (resp.status == 200) {
    const ress = resp.data
    return res.jsonp( ress );
  } 
  else{
    return res.jsonp({ error: "đã xảy ra lỗi" });
  }
}