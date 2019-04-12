document.write("<script language=javascript src='../three/three.js'></script>");
function drawTransparent() {
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

    //添加一个长方体
    var box = new THREE.Mesh(
        new THREE.BoxGeometry(2,2,2),
        new THREE.MeshLambertMaterial({
            color:0xa020f0,
            transparent:true,
            opacity:0.4
        })
    );
    box.position.set(0,1,0);

    //添加一块板
    var board = new THREE.Mesh(
        new THREE.BoxGeometry(4,0.01,4),
        new THREE.MeshLambertMaterial({
            color:0xffffff,
            transparent: false
        })
    );
    board.position.set(0,0,0);

    //在场景中添加立方体
    scene.add(box);
    scene.add(board);

    //将相机放到立方体斜上方并对着立方体
    camera.position.set(5,5,5);
    camera.lookAt(box.position);

    //设置光源
    var light = new THREE.DirectionalLight(0xffffff,1);
    light.position.set(10,50,100);
    scene.add(light);

    //渲染场景
    document.getElementById('transparent').appendChild(renderer.domElement);
    renderer.render(scene,camera);

    //转换为图片
    var d = renderer.domElement.toDataURL();
    let img = document.createElement('img');
    img.src = d;
    //console.log(d);

    //复制图片并计算像素值的和
    img.onload = function () {
        //创建画布
        var canvas = document.getElementById('can4');
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img,0,0,width,height);
        var data = ctx.getImageData(0,0,width,height).data;
        console.log(data);

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
        document.getElementById('number4R').value = numr;
        document.getElementById('number4G').value = numg;
        document.getElementById('number4B').value = numb;
    }
}
drawTransparent();