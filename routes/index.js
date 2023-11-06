var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('*', function (req, res, next) {
  
  // res.setHeader("Access-Control-Allow-Origin", "*"); 
  // 다른 서버에서 api요청시allow 해주는용도!!! 근데 이 해줘도 안되서 그ㅇ 주ㄱ..
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "OPTIONS,GET,POST,PUT,PATCH,DELETE"
  // );
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  res.sendFile(path.join(__dirname, '../public/index.html')); 
  //이게 Vue로 빌드된 파일이래..... backend에 있는 파일이 아니고..
  // 아니야 잘못알고 있는거야. index.html이 아니고 public 밑에 있는 파일들 전체가. vue.js로 빌드된 파일이야. 위 코드 주석해도 문제없어. 
  // index.html이 다른 모든 css, js를 import하므로 index.html을 제공하는것. 아니야 import는 맞는데 먼저 브라우저에 보내야되 html / css / js 모두다
  // 다른 router에서 새로고침하면 not found 뜨는데 이건 index.html 을 못찾아서.. 그래서 '*'로 ..어디서든 index.html을 찾을 수 있도록..
 
  console.log('express에서 router directory : ', __dirname)

  // res.render('index', { title: 'Express' }); // 기존 파일
});

module.exports = router;
