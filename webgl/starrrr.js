document.write("<script language=javascript src='../three/three.js'></script>");
document.write("<script language=javascript src='../stat/stats.js'></script>");
function drawStar() {
    var width = 600;
    var height = 600;
    var scene = new THREE.Scene();
    //统计帧数
    var frames = 0;
    var flag = 0;
    var stat = new Stats();
    stat.setMode(0);
    //相机
    var camera = new THREE.PerspectiveCamera(45,width/height,1,2000);
    camera.position.set(-200,0,400);
    camera.up.y = 1;
    camera.lookAt(0,0,0);
    //渲染器
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width,height);
    renderer.setClearColor(0x000000);
    document.getElementById('star').appendChild(renderer.domElement);
    //光源,半球光
    var light = new THREE.HemisphereLight(0xffffff,0x888888,2);
    light.position.set(0,0,-200);
    scene.add(light);
    //绘制若干个点当星星
    var stargeometry = new THREE.Geometry();
    for (var i = 0; i < 10000; i++){
        var star = new THREE.Vector3();
        star.x = THREE.Math.randFloatSpread(2000);
        star.y = THREE.Math.randFloatSpread(2000);
        star.z = THREE.Math.randFloatSpread(2000);
        stargeometry.vertices.push(star);
    }
    var starmaterial = new THREE.PointsMaterial({color:0xaaaaaa});
    var stars = new THREE.Points(stargeometry,starmaterial);
    scene.add(stars);
    //添加流星
    addLine([200,100,200],[300,200,300],0xeee685,0xfffff0);
    addLine([190,100,190],[250,200,250],0xffe7ba,0xfffff0);
    addLine([-500,100,-300],[-400,200,-200],0xEDEDED,0xE066FF);
    addLine([-500,90,-350],[-400,150,-250],0xffffff,0xB2DFEE);
    //添加发光球体
    var spheregeometry = new THREE.SphereGeometry(100,100,100);
    var spherematerial = new THREE.MeshLambertMaterial({
        color:0xCD6600
    });
    var sphere = new THREE.Mesh(spheregeometry,spherematerial);
    sphere.position.set(-1000,0,1500);
    scene.add(sphere);
    var sphere1geometry = new THREE.SphereGeometry(100,100,100,0);
    var sphere1material = new THREE.MeshBasicMaterial({
        color:0xCDAD00,
        transparent: true,
        opacity: 0.5
    });
    var sphere1 = new THREE.Mesh(sphere1geometry,sphere1material);
    sphere1.position.set(-1000,0,1500);
    sphere1.scale.multiplyScalar(1.2);//等比例放大
    scene.add(sphere1);
    var sphere2geometry = new THREE.SphereGeometry(100,100,100,0);
    var sphere2material = new THREE.MeshBasicMaterial({
        color:0xFFFFFF,
        transparent: true,
        opacity: 0.2
    });
    var sphere2 = new THREE.Mesh(sphere2geometry,sphere2material);
    sphere2.position.set(-1000,0,1500);
    sphere2.scale.multiplyScalar(1.3);//等比例放大
    scene.add(sphere2);
    //添加地球
    var earthtl = new THREE.TextureLoader();
    earthtl.load('webgl/earth.jpg',function (texture) {
        var earthgeometry = new THREE.SphereGeometry(100,50,50);
        var earthmaterial = new THREE.MeshStandardMaterial({map:texture});
        var earth = new THREE.Mesh(earthgeometry,earthmaterial);
        earth.position.set(-100,0,0);
        scene.add(earth);
        var pretime = new Date();
        function render() {
            stat.update();
            frames ++;
            var nowtime = new Date();//计算2秒-10秒的渲染帧数，因为趋于稳定
            if (nowtime-pretime >= 2000 && flag == 0){
                flag = 1;
                frames = 0;//从3秒开始计时
                console.log(flag);
            }else if(nowtime-pretime >= 10000 && flag == 1){
                flag = 2;
                console.log(flag);
                countFrames();
            }
            earth.rotation.y += 0.003;
            //让相机转动以此来实现整个场景的旋转
            camera.rotateY(0.001);
            requestAnimationFrame(render);
            renderer.render(scene,camera);
        }
        render();
    });
    //添加细线函数
    function addLine(pos1,pos2,col1,col2) {
        var linegeometry = new THREE.Geometry();
        var linematerial = new THREE.LineBasicMaterial({vertexColors:true});
        var color1 = new THREE.Color(col1);
        var color2 = new THREE.Color(col2);
        var p1 = new THREE.Vector3();
        var p2 = new THREE.Vector3();
        p1.set(pos1[0],pos1[1],pos1[2]);
        p2.set(pos2[0],pos2[1],pos2[2]);
        linegeometry.vertices.push(p1);
        linegeometry.vertices.push(p2);
        linegeometry.colors.push(color1,color2);
        var line = new THREE.Line(linegeometry,linematerial);
        scene.add(line);
    }
    //统计帧数
    function countFrames(){
        document.getElementById('number7').value = frames;
    }
}
drawStar();
