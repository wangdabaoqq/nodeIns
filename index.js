var http = require('http');			// http 网路
var cheerio = require('cheerio');	// html 解析
var fs = require("fs");				// 流
const request = require('request');
var baseUrl = 'https://api.instagram.com/v1/users/5601660036/media/recent/?access_token=5601660036.1677ed0.d36b1b706d704a3d972f2a588723cb94';
var mkdirp = require('mkdirp');
// 创建文件夹
mkdirp('./img/', (err) => {
  if (err) console.error(err)
  // console.log(111)
})
// 请求数据, 处理数据
function getHtml(href) {
	request({uri: href, 'proxy':'http://localhost:1087'}, function (error, response, body) {
        // console.log(body)
        // $ = cheerio.load(body);
        // console.log(body)
        let datas = JSON.parse(body).data
        // console.log(datas, 111)
        datas.forEach(element => {
          // console.log(element, 22)
            let imgCar = element.carousel_media
            // console.log(imgCar)
            if (imgCar) {
              imgCar.forEach(ele => {
                let imgSrc = ele.images.standard_resolution.url
                download(imgSrc, ele.id)
                i++;
                // console.log(ele)
                // let imgSrc = ele.images.
              })
            } else {
              let imgSrc = element.images.standard_resolution.url
              console.log('正在下载原图')
              downLoad(imgSrc, element.id)
            }
        });
        datas.forEach(function (value, index) {
          let imgCar = value.carousel_media;
          if(imgCar){
            imgCar.forEach(function (value1, index) {
            let thumbnailSrc = value1.images.thumbnail.url;
    
              console.log('正在下载压缩图' + thumbnailSrc);
              downLoad(thumbnailSrc, value.id + '.min');
              j++;
              console.log('下载完成');
              });
          } else {
            let thumbnailSrc = value.images.thumbnail.url;
    
              console.log('正在下载压缩图' + thumbnailSrc);
              downLoad(thumbnailSrc, value.id + '.min');
              console.log('下载完成');
          }
          
        });
        // 根据数组生成json
        fs.writeFile('./ins.json',body,function(err){
          if(err) throw err;
        });
	})
}
// 下载图片并保存到本地
function downLoad (url, file) {
  // request.head(url, function (err, res, body) {
  request({uri: url,'proxy':'http://localhost:1087'}).pipe(fs.createWriteStream('./img/' + "/" + file + ".jpg"))
  // })
}

function start(){
	console.log("开始获取图片连接");
	getHtml(baseUrl);
}

start();