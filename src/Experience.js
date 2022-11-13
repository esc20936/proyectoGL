import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import bobba from './assets/models/bobba.glb?url';
import trooper from './assets/models/trooper.glb?url';
import droide from './assets/models/droide.glb?url';
import r2 from './assets/models/r2.glb?url';
import bb8 from './assets/models/bb8.glb?url';

import rainbowVertexShader from './Shaders/rainbow/vertex.glsl';
import rainbowFragmentShader from './Shaders/rainbow/fragment.glsl';

import toonVertexShader from './Shaders/toon/vertex.glsl'
import toonFragmentShader from './Shaders/toon/fragment.glsl'

import oilVertexShader from './Shaders/oil/vertex.glsl'
import oilFragmentShader from './Shaders/oil/fragment.glsl'

import transparentVertexShader from './Shaders/Transparent/vertex.glsl'
import transparentFragmentShader from './Shaders/Transparent/fragment.glsl'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// load a texture and set it as scene background
const loader = new THREE.TextureLoader();
const texture = loader.load('/stars.jpg');
scene.background = texture; 




const oilShader = new THREE.RawShaderMaterial({
    vertexShader: oilVertexShader,
    fragmentShader: oilFragmentShader,
    wireframe: true,
});
const toonShader = new THREE.RawShaderMaterial({
    vertexShader: toonVertexShader,
    fragmentShader: toonFragmentShader,
    // wireframe: true,
});

const transparentShader = new THREE.RawShaderMaterial({
    vertexShader: transparentVertexShader,
    fragmentShader: transparentFragmentShader,
    // wireframe: true,
});

const rainbowShader = new THREE.RawShaderMaterial({
    vertexShader: rainbowVertexShader,
    fragmentShader: rainbowFragmentShader,
    wireframe: true,
});


let CONT = 0;
const shadersArray = [toonShader,oilShader , transparentShader, rainbowShader];






/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

let modelsArray = [];


// loader manager
const manager = new THREE.LoadingManager();


// Load GLTF
let bobbaModel;
const gltfLoader = new GLTFLoader(manager);
gltfLoader.load(
    // resource URL
    bobba,
    // called when the resource is loaded
    function (gltf) {

        bobbaModel = gltf.scene;
        bobbaModel.traverse(function (child) {
            if(child instanceof THREE.Mesh){
                child.material = shadersArray[CONT];	
            }
        });

       bobbaModel.position.set(0, -1, 0);
       
        modelsArray.push(bobbaModel);
    },
    // called while loading is progressing
    function (xhr) {
        // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function (error) {
        console.log('An error happened');
    }
);

let trooperModel;
gltfLoader.load(
    trooper,
    function (gltf) {

        trooperModel = gltf.scene;
        trooperModel.traverse(function (child) {
            if(child instanceof THREE.Mesh){
                child.material = shadersArray[CONT];	
            }
        });
        trooperModel.scale.set(1, 1, 1);
       trooperModel.position.set(0, 0, 0);
        modelsArray.push(trooperModel);
    },
    function (xhr) {
    },
    // called when loading has errors
    function (error) {
        console.log('An error happened');
    }
);

let droideModel;
gltfLoader.load(
    // resource URL
    droide,
    // called when the resource is loaded
    function (gltf) {

        droideModel = gltf.scene;
        droideModel.traverse(function (child) {
            if(child instanceof THREE.Mesh){
                child.material = shadersArray[CONT];
            }
        });
        droideModel.scale.set(1, 1, 1);
       droideModel.position.set(-0.17, -1.75, 1);
        modelsArray.push(droideModel);
    },
    function (xhr) {
        // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened');
    }
);



let r2Model;
gltfLoader.load(
    // resource URL
    r2,
    // called when the resource is loaded
    function (gltf) {

        r2Model = gltf.scene;
        r2Model.traverse(function (child) {
            if(child instanceof THREE.Mesh){
                child.material = shadersArray[CONT];
            }
        });
        r2Model.scale.set(1, 1, 1);
       r2Model.position.set(0, -1, 0);
        modelsArray.push(r2Model);
    },
    function (xhr) {
        // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened');
    }
);


let bb8Model;
gltfLoader.load(
    // resource URL
    bb8,
    // called when the resource is loaded
    function (gltf) {

        bb8Model = gltf.scene;
        bb8Model.traverse(function (child) {
            if(child instanceof THREE.Mesh){
                child.material = shadersArray[CONT];
            }
        });
        bb8Model.scale.set(0.05, 0.05, 0.05);
       bb8Model.position.set(0, 0, -5);
        modelsArray.push(bb8Model);
    },
    function (xhr) {
        // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened');
    }
);





// when all models are loaded
manager.onLoad = function () {
    scene.add(modelsArray[0]);
};




// Orbit Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.listenToKeyEvents( window );
controls.keys = {
	LEFT: 'ArrowLeft', //left arrow
	UP: 'ArrowUp', // up arrow
	RIGHT: 'ArrowRight', // right arrow
	BOTTOM: 'ArrowDown', // down arrow
}





/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add light to model
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0,1, 2);
scene.add(pointLight);

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

});

// change shader on key press 
window.addEventListener('keydown', (event) => {
    if (event.key === 's') {
        CONT++;
        if(CONT > shadersArray.length - 1){
            CONT = 0;
        }
        modelsArray[CONT2].traverse(function (child) {
            if(child instanceof THREE.Mesh){
                child.material = shadersArray[CONT];
            }
        });
        
    }}
);


let CONT2 = 0;
// change model on key press
window.addEventListener('keydown', (event) => {
    if (event.key === 'm') {

        scene.remove(modelsArray[CONT2]);
        CONT2++;
        if(CONT2 > modelsArray.length - 1){
            CONT2 = 0;
        }
        scene.add(modelsArray[CONT2]);
        
    }
});



const clock = new THREE.Clock();
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    renderer.render(scene, camera);

    controls.update();


    window.requestAnimationFrame(tick);

};

tick();