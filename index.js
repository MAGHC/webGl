// const canvas = document.querySelector("canvas");
// const html = document.queryCommandIndeterm("html");

// window.addEventListener("resize", () => {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   console.log(canvas.width);
// });

import * as dat from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import universe from "./src/universe.jpg";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(10, 25, 70);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

const scene = new THREE.Scene();

const helper = new THREE.AxesHelper(40);
scene.add(helper);

const planeGeo = new THREE.PlaneGeometry(50, 50);
const planeMa = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const planex = new THREE.Mesh(planeGeo, planeMa);

// const planeGeoY = new THREE.PlaneGeometry(50, 50);
// const planeMaY = new THREE.MeshStandardMaterial({
//   color: 0xffffff,
//   side: THREE.DoubleSide,
// });

// const planey = new THREE.Mesh(planeGeoY, planeMaY);

// scene.add(planey);
// planey.rotation.y = -0.5 * Math.PI;
// planey.position.y = 25;

planex.rotation.x = -0.5 * Math.PI;
planex.receiveShadow = true;

const sphereGeo = new THREE.SphereGeometry(4, 50, 50);
const sphereMat = new THREE.MeshStandardMaterial({
  color: 0xfffff,
  wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeo, sphereMat);

const sphereMat2 = new THREE.MeshStandardMaterial({
  color: 0x00fff,
  wireframe: false,
});

const sphere2 = new THREE.Mesh(sphereGeo, sphereMat2);

scene.add(sphere2);

sphere2.position.set(-14, 4, 0);

sphere.position.set(4, 4, 0);

sphere.castShadow = true;

const gui = new dat.GUI();

const ambientLigth = new THREE.AmbientLight(0x333333);
scene.add(ambientLigth);
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
// scene.add(directionalLight);
// directionalLight.position.set(-30, 50, 0);
// directionalLight.castShadow = true;
// directionalLight.shadow.camera.bottom = -12;

// const dlLgihtHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dlLgihtHelper);

// const dlLightshadowHelper = new THREE.CameraHelper(
//   directionalLight.shadow.camera
// );

// scene.add(dlLightshadowHelper);

const spotlight = new THREE.SpotLight(0xffffff);
scene.add(spotlight);
spotlight.position.set(-100, 100, 0);
spotlight.castShadow = true;

spotlight.angle = 0.2;

const slHelpoer = new THREE.SpotLightHelper(spotlight);
scene.add(slHelpoer);

const textLoader = new THREE.TextureLoader();
scene.background = textLoader.load(universe);

const option = {
  변경: "#ffea00",
  와이어프레임: false,
  speed: 0.01,
  angle: 0.2,
  panumbra: 0,
  intensity: 1,
};
gui.addColor(option, "변경").onChange((e) => {
  sphere.material.color.set(e);
});

gui.add(option, "와이어프레임").onChange((e) => {
  sphere.material.wireframe = e;
});

gui.add(option, "speed", 0, 0.1);
gui.add(option, "angle", 0, 1);
gui.add(option, "panumbra", 0, 1);
gui.add(option, "intensity", 0, 1);

scene.add(sphere);
scene.add(planex);

scene.fog = new THREE.Fog(0xffffff, 0, 300);

renderer.setClearColor(0x5c7e96);

// const cubeTextLoader = new THREE.CubeTextureLoader();
// scene.background = cubeTextLoader.load(["universe", universe2, universe, universe, universe2, universe]);

let step = 0;

function animate() {
  requestAnimationFrame(animate);
  step += option.speed;
  spotlight.angle = option.angle;
  spotlight.penumbra = option.panumbra;
  spotlight.intensity = option.intensity;
  slHelpoer.update();

  sphere.position.x = 4 + 10 * Math.cos(step);
  sphere.position.y = 4 + 10 * Math.abs(Math.sin(step));
  renderer.render(scene, camera);
}

console.log(sphere.position.x);

animate();

// scene.add(line);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
