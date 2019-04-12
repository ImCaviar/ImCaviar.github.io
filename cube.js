document.write("<script language=javascript src='three/three.js'></script>");
var head = 'data:text/csv;charset=utf-8,';
var excel = '';
function drawCube() {
    //设置场景大小
    var width = 1000;
    var height = 1000;
    var scene = new THREE.Scene();

    //设置相机参数,相机开角，成像比例，相机能拍摄到的最近距离，相机能拍摄到的最远距离
    var camera = new THREE.PerspectiveCamera(45,width/height,1,1000);

    //新建渲染
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width,height);

    //添加一个立方体
    var box = new THREE.Mesh(
        new THREE.BoxGeometry(2,2,2),
        new THREE.MeshBasicMaterial({
            color:0xffff00
        }));

    //把立方体放到原点位置
    box.position.set(0,0,0);

    //在场景中添加立方体
    scene.add(box);

    //将相机放到立方体斜上方并对着立方体
    camera.position.set(5,5,5);
    camera.lookAt(box.position);

    //渲染场景
    document.getElementById('cube').appendChild(renderer.domElement);
    renderer.render(scene,camera);

    //转换为图片
    var d = renderer.domElement.toDataURL();
    let img = document.createElement('img');
    img.src = d;
    //console.log(d);

    //复制图片并计算像素值的和
    img.onload = function () {
        //创建画布
        var canvas = document.getElementById('can2');
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img,0,0,1000,1000);
        var data = ctx.getImageData(0,0,1000,1000).data;
        console.log(data);

        //导出为csv文件
        //for (var i=0; i<300; i++){
        //    excel += 'R'+i.toString()+'\,G'+i.toString()+'\,B'+i.toString()+'\,A'+i.toString()+'\,';
        //}
        //excel += '\n';
        var num = 0;
        for (var i=0; i<1000; i++){
            for (var j=0; j<1000; j++){
                //excel += data[(i*300+j)*4].toString()+'\,'+data[(i*300+j)*4+1].toString()+'\,'+data[(i*300+j)*4+2].toString()+'\,'+data[(i*300+j)*4+3].toString()+'\,';
                if (data[(i*1000+j)*4]==255){
                    num ++;
                }
            }
            //excel += '\n';
        }
        console.log(num);
        document.getElementById('number2').value = num;
    }
}
drawCube();
//function clickDownload(aLink) {
//    aLink.href = head + encodeURIComponent(excel);
//    aLink.click();
//}
