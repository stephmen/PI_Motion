
const express = require('express');
const raspividStream = require('raspivid-stream');
const app = express();
const wss = require('express-ws')(app);


app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.ws('/video-stream', (ws, req) => {
    console.log('Client connected');
    ws.send(JSON.stringify({
      action: 'init',
      width: '640',
      height: '480'
    }));

    var videoStream = raspividStream({ width: 640, height: 480, rotation: 180 });
    videoStream.on('data', (data) => {
        ws.send(data, { binary: true }, (error) => { if (error) console.error(error); });
    });

    ws.on('close', () => {
        console.log('Client left');
        videoStream.removeAllListeners('data');
    });
});


app.use(function (err, req, res, next) {
  console.error(err);
  next(err);
})

app.listen(80, () => console.log('Server started on 80'));
