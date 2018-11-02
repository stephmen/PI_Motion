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