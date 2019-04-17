document.write("<script language=javascript src='../three/three.js'></script>");
document.write("<script language=javascript src='../stat/stats.js'></script>");
function testFrame(){
    //初始化参数
    var width = 600;
    var height = 400;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45,width/height,0.1,1000);
    var renderer = new THREE.WebGLRenderer();
    var stat = new Stats();
    var object = null;
    var frames = 0;
    var flag = 0;//表示是否显示过帧数
    
    //初始化渲染器
    function initRenderer() {
        renderer.setClearColor(0xffffff);
        renderer.setSize(width,height);
        renderer.shadowMap.enabled = true;//支持阴影效果
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;//阴影类型
    }

    //初始化统计对象
    function initStat() {
        stat.setMode(0);//设置统计模式，0:fps 1:ms
    }

    //设置相机位置朝向
    function setCamera() {
        camera.position.x = -30;
        camera.position.y = 40;
        camera.position.z = 30;
        camera.lookAt(scene.position);
    }

    //设置立方体
    function setCube() {
        var geometry = new THREE.BoxGeometry(4,4,4);
        var material = new THREE.MeshLambertMaterial({color:0xffff00});
        object = new THREE.Mesh(geometry,material);
        object.castShadow = true;

        object.position.set(-4,3,0);
        scene.add(object);
    }

    //设置光源
    function setLight() {
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-40,60,-10);
        spotLight.castShadow = true;
        scene.add(spotLight);
    }

    //渲染场景（动态）
    function renderScene() {
        stat.update();//通知stats画面已经被重新渲染了
        frames ++;
        var nowtime = new Date();//计算3秒-6秒的渲染帧数，因为趋于稳定
        if (nowtime-pretime >= 3000 && flag == 0){
            flag = 1;
            frames = 0;//从3秒开始计时
            //console.log(flag);
        }else if(nowtime-pretime >= 6000 && flag ==1){
            flag = 2;
            countFrames();
            //console.log(flag);
        }
        //正方体旋转
        object.rotation.x += 0.02;
        object.rotation.y += 0.02;
        object.rotation.z += 0.02;

        requestAnimationFrame(renderScene);//在指定时间间隔重新渲染场景
        renderer.render(scene,camera);
    }

    //统计帧数
    function countFrames(){
        document.getElementById('number6').value = frames;
    }

    initStat();
    initRenderer();
    setCamera();
    setCube();
    setLight();
    document.getElementById('frame').appendChild(renderer.domElement);
    var pretime = new Date();
    renderScene();


}
window.onload = testFrame();