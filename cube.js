document.write("<script language=javascript src='three/three.js'></script>");
var head = 'data:text/csv;charset=utf-8,';
var excel = '';
function drawCube() {
    //设置场景大小
    var width = 400;
    var height = 400;
    var scene = new THREE.Scene();

    //设置相机参数,相机开角，成像比例，相机能拍摄到的最近距离，相机能拍摄到的最远距离
    var camera = new THREE.PerspectiveCamera(45,width/height,1,1000);

    //新建渲染
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize(width,height);
    renderer.shadowMap.enabled = true;//支持阴影效果
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;//阴影类型

    //添加一个立方体
    var box = new THREE.Mesh(
        new THREE.BoxGeometry(2,2,2),
        new THREE.MeshLambertMaterial({
            color:0xffdd00
        }));

    //把立方体放到原点位置
    box.position.set(0,0,0);

    //在场景中添加立方体
    scene.add(box);

    //将相机放到立方体斜上方并对着立方体
    camera.position.set(5,5,5);
    camera.lookAt(box.position);

    //设置光源
    var light = new THREE.DirectionalLight(0xffffff,1);
    light.position.set(10,50,100);
    scene.add(light);

    //渲染场景
    document.getElementById('cube').appendChild(renderer.domElement);
    renderer.render(scene,camera);

    //转换为图片
    var d = renderer.domElement.toDataURL();
    let img = document.createElement('img');
    img.src = d;
    console.log(d);

    //复制图片并计算像素值的和
    img.onload = function () {
        //创建画布
        var canvas = document.getElementById('can2');
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img,0,0,width,height);
        var data = ctx.getImageData(0,0,width,height).data;
        console.log(data);

        //导出为csv文件
        //for (var i=0; i<300; i++){
        //    excel += 'R'+i.toString()+'\,G'+i.toString()+'\,B'+i.toString()+'\,A'+i.toString()+'\,';
        //}
        //excel += '\n';
        var numr = 0;
        var numg = 0;
        for (var i=0; i<height; i++){
            for (var j=0; j<width; j++){
                //excel += data[(i*300+j)*4].toString()+'\,'+data[(i*300+j)*4+1].toString()+'\,'+data[(i*300+j)*4+2].toString()+'\,'+data[(i*300+j)*4+3].toString()+'\,';
                if (data[(i*width+j)*4+2]!=255){
                    numr += data[(i*width+j)*4];
                    numg += data[(i*width+j)*4+1];
                }
            }
            //excel += '\n';
        }
        document.getElementById('number2R').value = numr;
        document.getElementById('number2G').value = numg;
    }
}
drawCube();
//function clickDownload(aLink) {
//    aLink.href = head + encodeURIComponent(excel);
//    aLink.click();
//}
