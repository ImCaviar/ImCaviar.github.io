var head = 'data:text/csv;charset=utf-8,';
var excel = '';
function drawSin() {
    var x = 1;
    var y = 100;
    var canvas = document.getElementById('sin');
    var content = canvas.getContext('2d');

    function moveSin() {
        content.beginPath();
        content.moveTo(x,y);
        for (var i=1; i<200; i +=0.1){
            x = i*10;
            y = Math.sin(i)*10+100;
            content.lineTo(x,y);
        }
        content.stroke();
        content.closePath();
    }
    //获取像素信息值
    function getRGB(){
        var d = content.getImageData(0,0,300,200).data;

        for (var i=0; i<200; i++){
            for (var j=0; j<300;j++){
                excel += d[(i*300+j)*4+3].toString()+'\,';
            }
            excel += '\n';
        }
    }
    moveSin();
    getRGB();
}
function clickDownload(aLink) {
    aLink.href = head + encodeURIComponent(excel);
    aLink.click();
}
