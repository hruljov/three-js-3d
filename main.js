/* creating function to initialize environment */
function init() {

    var scene = new THREE.Scene();                                                                          //setting up scene

    /* setting up fog */
    var enableFog = false;                                                                                  //fog trigger
    if (enableFog) {
        scene.fog = new THREE.FogExp2(0xffffff, 0.2);                                                       //fog function
    }

    var box = getBox(1, 1, 1);                                                                              //calling getBox function
    var plane = getPlane(20);                                                                               //calling getPlabe function
    var pointLight = getPointLight(1);
    var sphere = getSphere(0.05);

    plane.name = 'plane-1';                                                                                 //setting plane name


    //setting up "box" position
    box.position.y = box.geometry.parameters.height/2;
    //rotating the plane. Calling "Math" module
    plane.rotation.x = Math.PI/2;
    pointLight.position.y = 2;

    scene.add(box);                                                                                         //adding box object to the scene
    scene.add(plane);                                                                                       //adding plane object to the scene
    scene.add(pointLight);                                                                                  //adding point light object to the scene
    pointLight.add(sphere);                                                                                 //adding light bulb object to the scene

    //setting up camera
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
    
    //setting up camera position
    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z = 5;
    //setting up camera target
    camera.lookAt (new THREE.Vector3(0, 0, 0));
    
    //setting up renderer
    var renderer = new THREE.WebGLRenderer();
    //setting up render resolution
    renderer.setSize(window.innerWidth, window.innerHeight);
    //setting background
    renderer.setClearColor('rgb(120, 120, 120)');

    /*
    DOM (Document Object Model) – объектная модель, используемая для XML/HTML-документов.
    DOM – это представление документа в виде дерева объектов, доступное для изменения через JavaScript.
    */
    document.getElementById('webgl').appendChild(renderer.domElement);

    //calling "update" function
    update(renderer, scene, camera);

    return scene;

}


/* creating box object */
function getBox(w, h, d) {

    var geometry = new THREE.BoxGeometry(w, h, d);                                                              //setting up box geometry
    var material = new THREE.MeshPhongMaterial({color: 'rgb(120, 120, 120)'});                                  //setting up the material
    var mesh = new THREE.Mesh(geometry, material);                                                              //creating a mesh object from the geometry and a material

    return mesh;

}


/* creating sphere object */
function getSphere(size) {

    var geometry = new THREE.SphereGeometry(size, 24, 24);                                                              //setting up sphere geometry
    var material = new THREE.MeshBasicMaterial({color: 'rgb(255, 255, 255)'});                                  //setting up the material
    var mesh = new THREE.Mesh(geometry, material);                                                              //creating a mesh object from the geometry and a material

    return mesh;

}


/* creating plane object */
function getPlane(size) {

    var geometry = new THREE.PlaneGeometry(size, size);                                                         //setting up box geometry
    var material = new THREE.MeshPhongMaterial({color: 'rgb(120, 120, 120)', side: THREE.DoubleSide});          //setting up the material
    var mesh = new THREE.Mesh(geometry, material);                                                              //creating a mesh object from the geometry and a material

    return mesh;

}


/* creating point light object */
function getPointLight(intensity) {
    
    var light = new THREE.PointLight(0xffffff, intensity);                                                      //setting up point light using color and intensity
    
    return light;

}


/* setting up frame updates */
function update(renderer, scene, camera) {
    
    renderer.render(scene, camera);                                                                             //calling render method using the "scene" and "camera" as arguments
    requestAnimationFrame(function() {update(renderer, scene, camera);})                                        //creating recursive function to continiously update scene

}

var scene = init();