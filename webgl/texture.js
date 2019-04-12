document.write("<script language=javascript src='../three/three.js'></script>");
function drawTexture() {
    //设置场景大小
    var width = 400;
    var height = 400;
    var scene = new THREE.Scene();
    
    //test...
    let img = document.createElement('img');
    img.src = 'stone.jpg';
    document.body.appendChild(img);

    //初始化渲染器
    var renderer = new THREE.WebGLRenderer({
        antialias:true
    });
    renderer.setSize(width,height);
    renderer.setClearColor(0xffffff);

    //初始化对象，立方体
    var loader = new THREE.TextureLoader();
    loader.load('stone.jpg',function (texture) {
        var material = new THREE.MeshLambertMaterial({
            map:texture
        });
        var geometry = new THREE.BoxGeometry(15,15,10);
        var mesh = new THREE.Mesh(geometry,material);
        mesh.position.set(0,0,0);
        scene.add(mesh);

        //设置相机参数
        var camera = new THREE.PerspectiveCamera(45,width/height,0.1,1000);
        camera.position.set(15,20,25);
        camera.lookAt(mesh.position);

        //初始化光源，漫反射
        var light = new THREE.AmbientLight(0xffffff);
        light.position.set(60,100,80);
        scene.add(light);

        //渲染成像
        document.getElementById('texture').appendChild(renderer.domElement);
        renderer.render(scene,camera);

        //转换为图片
        var d = renderer.domElement.toDataURL();
        let img = document.createElement('img');
        img.src = d;
        //console.log(d);

        //复制图像并计算像素值的和
        img.onload = function () {
            //创建画布
            var canvas = document.getElementById('can3');
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img,0,0,width,height);
            var data = ctx.getImageData(0,0,width,height).data;
            console.log(data);

            //统计RGB数值总数
            var numr = 0;
            var numg = 0;
            var numb = 0;
            for (var i = 0; i < 400; i++){
                for (var j = 0; j < 400; j++){
                    if (data[(i*400+j)*4]!=255 || data[(i*400+j)*4+1]!=255 || data[(i*400+j)*4+2]!=255){
                        numr += data[(i*400+j)*4];
                        numg += data[(i*400+j)*4+1];
                        numb += data[(i*400+j)*4+2];
                    }
                }
            }
            document.getElementById('number3R').value = numr;
            document.getElementById('number3G').value = numg;
            document.getElementById('number3B').value = numb;
        }
    });

}
drawTexture();
