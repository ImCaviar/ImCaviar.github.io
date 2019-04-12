document.write("<script language=javascript src='../three/three.js'></script>");
function drawMultimodel() {
    //设置场景大小
    var width = 600;
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

    //添加一个长方体
    var box = new THREE.Mesh(
        new THREE.BoxGeometry(10,10,8),
        new THREE.MeshLambertMaterial({
            color:0xff7f50
        })
    );
    box.position.set(0,5,-5);
    box.castShadow = true;
    box.receiveShadow = true;

    //添加一个球体
    var radius = 5, segment = 20, rings = 20;
    //MeshLambertMaterial：这种材质对光照有反应，用于创建暗淡的不发光的物体。
    var sphereMaterial = new THREE.MeshLambertMaterial({color:0x9ac0cd});
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry(radius,segment,rings),
        sphereMaterial
    );
    sphere.geometry.verticesNeedUpdate = true;
    sphere.geometry.normalsNeedUpdate = true;
    sphere.position.set(15,5,5);
    sphere.castShadow = true;
    sphere.receiveShadow = true;

    //添加底部平面
    var plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100,100),
        new THREE.MeshStandardMaterial({
            color:0xaaaaaa
        })
    );
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -0;
    plane.receiveShadow = true;

    //在场景中添加立方体
    scene.add(box);
    scene.add(sphere);
    scene.add(plane);

    //将相机放到立方体斜上方并对着立方体
    camera.position.set(0,40,50);
    camera.lookAt(new THREE.Vector3(0,0,0));

    //设置光源
    scene.add(new THREE.AmbientLight(0x444444));
    var light = new THREE.SpotLight(0xffffff);
    light.position.set(60,40,50);
    light.castShadow = true;
    scene.add(light);

    //渲染场景
    document.getElementById('multimodel').appendChild(renderer.domElement);
    renderer.render(scene,camera);

    //转换为图片
    var d = renderer.domElement.toDataURL();
    let img = document.createElement('img');
    img.src = d;
    console.log(d);

    //复制图片并计算像素值的和
    img.onload = function () {
        //创建画布
        var canvas = document.getElementById('can5');
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img,0,0,width,height);
        var data = ctx.getImageData(0,0,width,height).data;
        //console.log(data);

        //测试RGB值
        var numr = 0;
        var numg = 0;
        var numb = 0;
        for (var i=0; i<height; i++){
            for (var j=0; j<width; j++){
                if (data[(i*width+j)*4]!=255 || data[(i*width+j)*4+1]!=255 || data[(i*width+j)*4+2]!=255){
                    numr += data[(i*width+j)*4];
                    numg += data[(i*width+j)*4+1];
                    numb += data[(i*width+j)*4+2];
                }
            }
        }
        document.getElementById('number5R').value = numr;
        document.getElementById('number5G').value = numg;
        document.getElementById('number5B').value = numb;
    }
}
drawMultimodel();