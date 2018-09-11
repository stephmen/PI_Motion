
const express = require('express');
const raspividStream = require('raspivid-stream');
const Base64Decode = require('base64-stream').decode;
const app = express();
const wss = require('express-ws')(app);


function StreamToCanvas2D() {
  const w = video.videoWidth;
  const h = video.videoHeight;
  canvasD.width = w;
  canvasD.height = h;
  ctxD.drawImage(video, 0, 0, w, h);
  // get the screen's pixels data
  let data = ctxD.getImageData(0, 0, w, h).data;
  // loop through rows and columns
  for (var y = 0; y < h; y += sample_size) {
      for (var x = 0; x < w; x += sample_size) {
          //Formula to get the pixel position in the array
          var pos = (x + y * w) * 4;
          //Getting pixel colors R G B
          var r = data[pos];
          var g = data[pos + 1];
          var b = data[pos + 2];
          // draw the pixels as blocks of colours
          // first check if it's not the first frame, but
          // seeing of when the previous_frame array
          // is not we empty, and then only draw something if there's

          if (previous_frame[pos] &&
              Math.abs(previous_frame[pos] - r) > threshold) {
              ctxD.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'
              ctxD.fillRect(x, y, sample_size, sample_size);
              alert = alert + 1
              // a significant colour difference
          }

          // store these colour values to compare to the next frame
          previous_frame[pos] = r;
      }
  }
  if (alert > 60) {
      console.log(alert)
      takePhoto()
  };
  alert = 0
};


app.use(express.static('dist'))
app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));
// app.use('/css',express.static(path.join(__dirname, + 'public/stylesheets')));

app.ws('/video-stream', (ws, req) => {
  console.log('Client connected');
  ws.send(JSON.stringify({
    action: 'init',
    width: '640',
    height: '480',
  }));

  const videoStream = raspividStream({ width: 640, height: 480, rotation: 180 });
  videoStream.on('data', (data) => {
    ws.send(data, { binary: true }, (error) => { if (error) console.error(error); });
  });

  ws.on('close', () => {
    console.log('Client left');
    videoStream.removeAllListeners('data');
  });
});

app.get('/watson', (req,res) => {
  res.console.log('Watson est ici')
}
)

//trying to resolve weback issue


app.use((err, req, res, next) => {
  console.error(err);
  next(err);
});

app.listen(80, () => console.log('Server started on 80'));
