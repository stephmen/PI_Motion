var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
//var fs = require('fs');

var visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  iam_apikey: '{8-Rj9GT4s1zsvI3LDGvvKtuRulW86EmU2eSArET5QTRf}'
});

var images_file= fs.createReadStream('./Images/canvas.jpg');
//var owners = ["me"];
//var threshold = 0.6;

var params = {
  images_file: images_file,
  //owners: owners,
  //threshold: threshold
};

visualRecognition.classify(params, function(err, response) {
  if (err) {
    console.log(err);
  } else {
    console.log(JSON.stringify(response, null, 2))
  }
});



/////////TESTED Successfulll 07/11/2018
//curl -X POST -u "apikey:8-Rj9GT4s1zsvI3LDGvvKtuRulW86EmU2eSArET5QTRf" --form "images_file=@./testWrite/canvas.png" "https://gateway.watsonplatform.net/visual-recognition/api/v3/classify?version=2018-03-19"
//////////////////////////////////////


{ Error: {"context":{"requestId":"583ab17ab34d44fe890aef44f9fbee0b","requestType":"incoming.Identity_Token","userAgent":"watson-developer-cloud-nodejs-3.13.0;","clientIp":"70.80.204.99","url":"https://iam.bluemix.net","instanceId":"iamid-7568c4648f-m8fz7","threadId":"133f29","host":"iamid-7568c4648f-m8fz7","startTime":"07.11.2018 23:24:55:486 UTC","endTime":"07.11.2018 23:24:55:551 UTC","elapsedTime":"65","locale":"en_US","clusterName":"iam-id-prlon02-tjwu"},"errorCode":"BXNIM0415E","errorMessage":"Provided API key could not be found"}
    at Request._callback (/home/pi/PI_Motion/node_modules/watson-developer-cloud/lib/requestwrapper.js:113:21)
    at Request.self.callback (/home/pi/PI_Motion/node_modules/request/request.js:185:22)
    at emitTwo (events.js:126:13)
    at Request.emit (events.js:214:7)
    at Request.<anonymous> (/home/pi/PI_Motion/node_modules/request/request.js:1157:10)
    at emitOne (events.js:116:13)
    at Request.emit (events.js:211:7)
    at IncomingMessage.<anonymous> (/home/pi/PI_Motion/node_modules/request/request.js:1079:12)
    at Object.onceWrapper (events.js:313:30)
    at emitNone (events.js:111:20) code: 400, 'x-global-transaction-id': undefined }






