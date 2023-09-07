const router = require("express").Router();
const { readdirSync, readFileSync } = require('fs-extra');
const path = require('path');
const chalk = require('chalkercli');
try {
  console.log(`\x1b[36m[ VN ] →\x1b[37m API Project được điều hành bởi Hoài Thanh`), "";
    console.log(`\x1b[36m[ EN ] →\x1b[37m The API Project is run by Hoai Thanh\n`), "";
    const rainbow = chalk.rainbow(`◆━━━━━━━━━━━━◆◆━━━━━━━━━━━━◆◆━━━━━━━━━━━━◆
*                                        *
*    ▀█▀ █ █ ▄▀█ █▄ █ █ █   ▄▀█ █   █    *
*     █  █▀█ █▀█ █ ▀█ █▀█   █▀█ █▄▄ █    *
*                                        *
*   → API Project                      *
*   → Phiên bản: 1.2.15                  *
*   → Tên: Đặng Hoài Thanh - 26/12/2001  *
*   → FB: Hoài Thanh                     *
*   → SĐT/Zalo: 0865336826               *
*   → Email: danghoaithanh2018@gmail.com *
*   → Github: ThanhAli-Official          *
*                                        *
◆━━━━━━━━━━━━◆◆━━━━━━━━━━━━◆◆━━━━━━━━━━━━◆\n`).stop();

    rainbow.render();

    const frame = rainbow.frame();
    console.log(frame);
    console.log(`[ API Project đang tiến hành khởi chạy ]`), "";
  console.log(`\x1b[36m[ LOADING ] →\x1b[37m Hệ thống đang kết nối API cho bạn, vui lòng đợi trong giây lát...`), "";
  // ------------------------------------------------------------------------//
  // ------------------------/     Fodel public    /-------------------------//
  // ------------------------------------------------------------------------//
  var i, j;
  const srcPath = path.join(__dirname, "/API/");
  const hosting = readdirSync(srcPath).filter((file) => file.endsWith(".js"));
  for (i of hosting) {
    const { index, name } = require(srcPath + i);
    router.get(name, index);
    //console.log(i);
  }
  // ------------------------------------------------------------------------//
  // ----------------------------/     Fodel    /----------------------------//
  // ------------------------------------------------------------------------//
  const getDirs = readdirSync(srcPath).filter((file) => !file.endsWith(".js") && !file.endsWith(".json"));
  for (const dir of getDirs) {
    const fileName = readdirSync(path.join(__dirname, '/API/' + dir + '/')).filter((file) => file.endsWith(".js"));
    for (j of fileName) {
      const { index, name } = require(path.join(__dirname, '/API/' + dir + '/') + j);
      router.get(name, index);
      //console.log('\x1b[36m[ LOADING ] →\x1b[37m Đã tải thành công ' + j);
    }
  }

} catch (e) { console.log(e); }
console.log('\x1b[36m[ LOADING ] →\x1b[37m Đã kết nối thành công tất cả API, bạn có thể sử dụng ngay bây giờ');
// -------------------------->      END     <------------------------------//
module.exports = router;