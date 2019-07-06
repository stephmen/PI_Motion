const express = require('express');
const raspividStream = require('raspivid-stream');
const fs = require('fs');
const app = express();
const wss = require('express-ws')(app);
const path = require('path');
const spawn = require('child_process').spawn;


app.use(express.static('dist'))
app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));
app.use(express.static(path.join(__dirname, 'public')));

app.ws('/video-stream', (ws, req) => {
  console.log('Client connected');
  ws.send(JSON.stringify({
    action: 'init',
    width: '640',
    height: '480',
  }));

  // const videoStream = raspividStream({
  //   width: 640,
  //   height: 480,
  //   rotation: 180
  // });

  var videoStream = spawn('/opt/vc/bin/raspivid', ['-hf', '-w', '1280', '-h', '1024', '-t', '999999999', '-fps', '20', '-b', '5000000', '-o', '-']);


  videoStream.on('data', (data) => {
    ws.send(data, {
      binary: true
    }, (error) => {
      if (error) console.error(error);
    });
  });

  ws.on('close', () => {
    console.log('Client left');
    videoStream.removeAllListeners('data');
  });
});
/////////////////////////////////////////////////////////
/////https://stackoverflow.com/questions/31359006/html-canvas-output-jpg-image-to-server-when-button-is-pressed
///////Here we GO////////////////////////////////////////
// Handle POST from xxx/receive
app.post('/receive', function (request, respond) {
  // The image data will be store here
  console.log("The Image Was Triggered")
  var body = '';
  // Target file path
  var filePath = __dirname + '/Images/canvas.jpg';
  console.log(filePath)
  //
  request.on('data', function (data) {
    body += data;
  });

  // When whole image uploaded complete.
  request.on('end', function () {
    // Get rid of the image header as we only need the data parts after it.
    var data = body.replace(/^data:image\/\w+;base64,/, "");
    // Create a buffer and set its encoding to base64
    var buf = new Buffer(data, 'base64');
    // Write
    fs.writeFile(filePath, buf, function (err) {
      if (err) throw err
      // Respond to client that the canvas image is saved.
      var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');


      var visualRecognition = new VisualRecognitionV3({
        version: '2018-03-19',
        iam_apikey: '8-Rj9GT4s1zsvI3LDGvvKtuRulW86EmU2eSArET5QTRf'
      });

      var images_file = fs.createReadStream('./Images/canvas.jpg');
      //var owners = ["me"];
      //var threshold = 0.6;

      var params = {
        images_file: images_file,
        //owners: owners,
        //threshold: threshold
      };

      visualRecognition.classify(params, function (err, response) {
        if (err) {
          console.log(err);
        } else {
          console.log(JSON.stringify(response, null, 2))
        }
      });
      respond.end();
    });
  });
});
///////////////////////////////////////////////////////////
/////////////////END///////////////////////////////////////

app.use((err, req, res, next) => {
  console.error(err);
  next(err);
});

app.listen(8181, () => console.log('Server started on 8181'));
