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
import universe2 from "./src/universe2.jpg";
import earthImg from "./src/earth.jpg";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.shadowMap.enabled = true;

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 1, 10);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();

const scene = new THREE.Scene();

const helper = new THREE.AxesHelper(40);
scene.add(helper);

const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);

const Boxgeo = new THREE.BoxGeometry();
const Boxmat = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const Box = new THREE.Mesh(Boxgeo, Boxmat);

scene.add(Box);

const planeGeo = new THREE.PlaneGeometry(30, 30, 10);
const planeMa = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeo, planeMa);

plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;
const gridHelper = new THREE.GridHelper(30);

const sphereGeo = new THREE.SphereGeometry(4, 50, 50);
const sphereMat = new THREE.MeshStandardMaterial({
  color: 0xfffff,
  wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeo, sphereMat);

sphere.position.set(-10, 0, 0);

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

scene.add(gridHelper);
scene.add(sphere);
scene.add(plane);

// scene.fog = new THREE.Fog(0xffffff, 0, 300);
scene.fog = new THREE.FogExp2(0xffffff, 0.01);

renderer.setClearColor(0x5c7e96);

const earthGeo = new THREE.SphereGeometry(4, 20, 20);
const earthMa = new THREE.MeshStandardMaterial({ map: textLoader.load(earthImg) });

const earth = new THREE.Mesh(earthGeo, earthMa);

scene.add(earth);

// const cubeTextLoader = new THREE.CubeTextureLoader();
// scene.background = cubeTextLoader.load(["universe", universe2, universe, universe, universe2, universe]);

let step = 0;

function animate() {
  Box.rotation.x += 0.01;
  Box.rotation.y += 0.01;
  step += option.speed;
  spotlight.angle = option.angle;
  spotlight.penumbra = option.panumbra;
  spotlight.intensity = option.intensity;
  slHelpoer.update();
  sphere.position.y = 10 * Math.abs(Math.sin(step));
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// scene.add(line);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
