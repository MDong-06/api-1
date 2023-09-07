exports.name = '/facebook/timejoine';
const axios = require('axios');

exports.index = async (req, res, next) => {
  try {
    const { data } = await axios.get(`https://graph.facebook.com/v17.0/${req.query.uid}?fields=id,name,created_time&access_token=EAAD6V7os0gcBO7nkmC3W4C4Tnymbu8ietAIxHKxOYQzZClQHg6TwDiccHRlhDHPy1hhNPHZAmHbFBaoTm5bnVfHroyJSgZCev0AD62BlyGVcpra45005HduuC0DWbgoETBT4VIb86QbAPQwsha0wkgtoS1TxW6p5AMsrIYmNRVLTIU8KSZCFkc9kMgZDZD`);
    const createdTime = data.created_time;
    const day = createdTime.split("-")[2].split("T")[0];
    const month = createdTime.split("-")[1].split("T")[0];
    const year = createdTime.split("-")[0];
    const hour = createdTime.split("T")[1].split(":")[0];
    const min = createdTime.split(":")[1].split("+")[0];
    const ss = createdTime.split(":")[2].split("+")[0];
    const date = `${day}/${month}/${year}`;
    const time = `${hour}:${min}:${ss}`;
    res.json({
      uid: data.id,
      name: data.name,
      day: `${date}`,
      time: `${time}`,
      author: 'Minh Đồng'
    });
  } catch (e) {
    console.log(e);
  }
};