function draw() {
    var canvasData = "Not supported";
    var canvas = document.getElementById('tutorial');
    if (canvas.getContext){
        var canvasContext = canvas.getContext('2d');
        //canvasContext.style.display = "inline";
        canvasContext.textBaseline = "alphabetic";
        canvasContext.fillStyle = "#f60";
        canvasContext.fillRect(125,1,62,20);
        canvasContext.fillStyle = "#069";
        canvasContext.font = "11pt no-real-font-123";
        canvasContext.fillText("Cwm fjordbank glypas vext quiz, \ud83d\ude03",2,15);
        canvasContext.fillStyle = "rgba(102, 204, 0, 0.7)";
        canvasContext.font = "18pt Arial";
        canvasContext.fillText("Cwm fjordbank glypas vext quiz, \ud83d\ude03",4,45);
        canvasData = canvas.toDataURL();
    }
    return canvasData;
}