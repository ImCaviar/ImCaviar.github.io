document.write("<script language=javascript src='../three/three.js'></script>");
var head = 'data:text/csv;charset=utf-8,';
var excel = '';
function drawBall() {
    //设置场景大小
    var width = 200;
    var height = 150;

    //设置相机参数
    var view_angle = 45;
    aspect = width/height;
    near = 0.1;
    far = 10000;

    //新建一个WebGL渲染以及相机
    var renderer = new THREE.WebGLRenderer();
    var camera =
        new THREE.PerspectiveCamera(
            view_angle,aspect,near,far
        );
    var scene = new THREE.Scene();

    //把相机添加到场景里
    scene.add(camera);
    camera.position.z = 150;
    renderer.setSize(width,height);

    //设置球体的值
    var radius = 50, segment = 16, rings = 16;
    var sphereMaterial = new THREE.MeshLambertMaterial({color:0xCC0000});
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(radius,segment,rings),
        sphereMaterial
    );
    sphere.geometry.verticesNeedUpdate = true;
    sphere.geometry.normalsNeedUpdate = true;

    scene.add(sphere);
    var pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.x = 10;
    pointLight.position.y = 50;
    pointLight.position.z =100;
    scene.add(pointLight);

    //附加DOM元素
    document.getElementById('ball').append(renderer.domElement);

    //画图
    renderer.render(scene,camera);

    //转换为图片
    var d = renderer.domElement.toDataURL();
    let img = document.createElement('img');
    img.src = d;
    //document.body.appendChild(img);
    //console.log(img);

    //创建画布
    var canvas = document.getElementById('can');
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img,0,0,200,150);
    var data = ctx.getImageData(0,0,200,150).data;
    console.log(data);

    //导出为csv文件
    //for (var i=0; i<200; i++){
    //    excel += 'R'+i.toString()+'\,G'+i.toString()+'\,B'+i.toString()+'\,A'+i.toString()+'\,';
    //}
    //excel += '\n';
    for (var i=0; i<150; i++){
        for (var j=0; j<200; j++){
            excel += data[(i*200+j)*4].toString()+'\,';//+data[(i*200+j)*4+1].toString()+'\,'+data[(i*200+j)*4+2].toString()+'\,'+data[(i*200+j)*4+3].toString()+'\,';
        }
        excel += '\n';
    }
}
drawBall();
function clickDownload(aLink) {
    aLink.href = head + encodeURIComponent(excel);
    aLink.click();
}
