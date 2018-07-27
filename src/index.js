
const express = require('express');
const raspividStream = require('raspivid-stream');
const Base64Decode = require('base64-stream').decode;
const app = express();
const wss = require('express-ws')(app);
const path = require('path');



app.use(express.static('dist'))
app.get('/', (req, res) => res.sendFile(`${__dirname}/src/index.html`));
// app.use('/css',express.static(path.join(__dirname, + 'public/stylesheets')));
app.use('/src',express.static(path.join(__dirname, + 'src')));

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

// app.get('/watson', (req,res) => {
//   res.console.log('Watson est ici')
// }
//)

//trying to resolve weback issue


app.use((err, req, res, next) => {
  console.error(err);
  next(err);
});

app.listen(80, () => console.log('Server started on 80'));
