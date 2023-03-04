import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas : document.querySelector('#bg'),
  antialias: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30); 

renderer.render(scene, camera);

const geometry = new THREE.RingGeometry(10, 8.5, 50, 11);
const material = new THREE.MeshStandardMaterial({color: 0xF7DBA7, side: THREE.DoubleSide});
const torus = new THREE.Mesh(geometry, material);
torus.rotation.y = 45;
torus.rotation.x = 90;

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10,15,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight); 
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(lightHelper, gridHelper);

// Lights
// let spotLight1 = new THREE.SpotLight( 0xf0fdff, 2.5 );
// spotLight1.position.set(1500, 200, 0);
// spotLight1.castShadow = true;
// spotLight1.shadowDarkness = 0.2;
// spotLight1.shadow.bias = 0.0001;
// spotLight1.angle = Math.PI / 4;
// spotLight1.penumbra = 0.05;
// spotLight1.decay = 2;
// spotLight1.distance = 1000;
// spotLight1.shadow.camera.near = 1;
// spotLight1.shadow.camera.far = 1000;
// spotLight1.shadow.mapSize.width = 1024;
// spotLight1.shadow.mapSize.height = 1024;
// camera.lookAt(scene.position);
// scene.add( spotLight1 );

// let spotLight2 = new THREE.SpotLight( 0xf0fdff, 2.3 );
// spotLight2.position.set(-150, -200, 0);
// spotLight2.castShadow = true;
// spotLight2.shadowDarkness = 0.2;
// spotLight2.shadow.bias = 0.0001;
// spotLight2.angle = Math.PI / 4;
// spotLight2.penumbra = 0.05;
// spotLight2.decay = 2;
// spotLight2.distance = 1000;
// spotLight2.shadow.camera.near = 1;
// spotLight2.shadow.camera.far = 1000;
// spotLight2.shadow.mapSize.width = 1024;
// spotLight2.shadow.mapSize.height = 1024;
// camera.lookAt(scene.position);
// scene.add( spotLight2 );

// const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1);
// const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2);
// scene.add( spotLightHelper1, spotLightHelper2 );

// let hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
// hemiLight.color.setHSL( 0.6, 1, 0.6 );
// hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
// hemiLight.position.set( 0, 500, 0 );
// scene.add( hemiLight );

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(300).fill().forEach(addStar);



//moon
const moonTexture = new THREE.TextureLoader().load('moon-texture.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    emissive: 0xffffff,
    emissiveIntensity: 0.01
  })
);

moon.position.setX(20);
moon.position.setY(10);

scene.add(moon);


//orbit



const torusAxis = new THREE.Vector3(0, 0, 1);
const torusSpeed = 0.001;
const moonAxis = new THREE.Vector3(0, 1, 0);
const moonSpeed = 0.005;
const earthAxis = new THREE.Vector3(0, 1, 0);
const earthSpeed = 0.005;


function animate(){
  requestAnimationFrame(animate);

  torus.rotateOnAxis(torusAxis, torusSpeed);
  moon.rotateOnWorldAxis(moonAxis, moonSpeed);

  controls.update();

  renderer.render(scene, camera);
}

//earth
const earth = new GLTFLoader();
earth.load('earth.glb', function(glb){
  console.log(glb);
  const root = glb.scene;
  // root.add(material);
  root.rotateOnAxis(earthAxis, earthSpeed);
  root.scale.set(0.015, 0.015, 0.015);
  scene.add(root);
});

const earthMaterial = new THREE.MeshStandardMaterial({emissive: 0xffffff, emissiveIntensity: 0.1});

animate();

