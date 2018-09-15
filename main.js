//creating function to initialize environment

function init() {

    //setting up scene
    var scene = new THREE.Scene();

    //calling getBox function
    var box = getBox(1, 1, 1);
    //calling getPlabe function
    var plane = getPlane(4);

    //setting up "box" position
    box.position.y = box.geometry.parameters.height/2;
    //rotating the plane. Calling "Math" module
    plane.rotation.x = Math.PI/2;

    //adding "box" object to the scene
    scene.add(box);
    //adding "plane" object to the scene
    scene.add(plane);


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

    /*
    DOM (Document Object Model) – объектная модель, используемая для XML/HTML-документов.
    DOM – это представление документа в виде дерева объектов, доступное для изменения через JavaScript.
    */
    document.getElementById('webgl').appendChild(renderer.domElement);

    //calling "update" function
    update(renderer, scene, camera);

    return scene;

}

function getBox(w, h, d) {

    //setting up box geometry
    var geometry = new THREE.BoxGeometry(w, h, d);

    //setting up the material
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00});

    //creating a mesh object from the geometry and a material
    var mesh = new THREE.Mesh(geometry, material);

    return mesh;
}

function getPlane(size) {

    //setting up box geometry
    var geometry = new THREE.PlaneGeometry(size, size);

    //setting up the material
    var material = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide});

    //creating a mesh object from the geometry and a material
    var mesh = new THREE.Mesh(geometry, material);

    return mesh;
}

function update(renderer, scene, camera) {
    
    //calling render method using the "scene" and "camera" as arguments
    renderer.render(scene, camera);

    //creating recursive function to continiously update scene
    requestAnimationFrame(function() {update(renderer, scene, camera);})
}

var scene = init();