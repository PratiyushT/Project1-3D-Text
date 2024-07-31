import * as THREE from "three";
import {OrbitControls, FontLoader, TextGeometry} from "three/addons";


//Scene
const scene = new THREE.Scene();


//Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
document.body.appendChild(renderer.domElement);

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 100);
scene.add(camera);
camera.position.set(0, 0, 5);

//TEXTURE
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/1.png")
matcapTexture.colorSpace = THREE.SRGBColorSpace;

const matcapMaterial = new THREE.MeshMatcapMaterial({matcap: matcapTexture});

//Text
const fontLoader = new FontLoader();
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => {
        const text = new THREE.Mesh(
            new TextGeometry(
                "Hello Three.js", {
                    font,
                    size: 0.5,
                    depth: 0.1,
                    curveSegments: 4,
                    bevelEnabled: true,
                    bevelThickness: 0.03,
                    bevelSize: 0.02,
                    bevelOffset: 0,
                    bevelSegments: 5,
                }
            ),
            matcapMaterial,
        )
        scene.add(text);
        text.geometry.center();
    }
);


//Mesh
for (let i = 0; i < 100; i++) {
    const donut = new THREE.Mesh(
        new THREE.TorusGeometry(0.3, 0.2, 20, 45),
        matcapMaterial
    )
    donut.position.x = (Math.random() - 0.5) * 10
    donut.position.y = (Math.random() - 0.5) * 10
    donut.position.z = (Math.random() - 0.5) * 10

    const scale = Math.random()
    donut.scale.set(scale, scale, scale)
    donut.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
    scene.add(donut);
}


//Controls
const control = new OrbitControls(camera, renderer.domElement)

renderer.render(scene, camera);

//Animation
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
})

const clock = new THREE.Clock();
const tick = () => {
    requestAnimationFrame(tick)
    renderer.render(scene, camera);
    control.update();
}
tick();

