import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three/build/three.module';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Modal3D = ({ style = {}, width = 600, height = 500, url = '' }) => {
  const container: any = useRef<HTMLDivElement>(null);
  const controls: any = useRef(null);
  const camera: any = useRef(null);
  const scene: any = useRef(null);
  const renderer: any = useRef(null);
  const elf: any = useRef(null);

  // 窗口变动触发的函数
  const onWindowResize = useCallback(() => {
    camera.current.aspect = width / height;
    camera.current.updateProjectionMatrix();

    renderer.current.setSize(width, height);
  }, [width, height]);

  const init = useCallback(() => {
    camera.current = new THREE.PerspectiveCamera(1, width / height, 0.1, 2000);
    camera.current.position.set(8, 0, 1);
    camera.current.lookAt(0, 3, 0);

    scene.current = new THREE.Scene();

    const loadingManager = new THREE.LoadingManager(function () {
      elf.current.translate.x = 0.1;
      elf.current.position.y = 0.00002;
      elf.current.position.z = 0.00002;
      scene.current.add(elf.current);
    });

    const loader = new ColladaLoader(loadingManager);

    loader.load(url, function (collada) {
      elf.current = collada.scene;
    });

    // 该光源并没有特别的来源方向，并且 THREE.AmbientLight 不会产生阴影
    const ambientLight = new THREE.AmbientLight(0xcccccc, 1.1);
    scene.current.add(ambientLight);

    // 平行光源
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.position.set(1, 1, 0).normalize();
    scene.current.add(directionalLight);

    renderer.current = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.current.setPixelRatio(window.devicePixelRatio);
    renderer.current.setSize(width, height);
    container.current.appendChild(renderer.current.domElement);

    // 创建控制器
    controls.current = new OrbitControls(
      camera.current,
      renderer.current.domElement,
    );
    controls.current.target.set(0, 0, 0);
    controls.current.addEventListener('change', () => {
      console.log(camera.current);
      console.log(elf.current);
    });
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.current.enableDamping = false; // false
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.current.dampingFactor = 0.25;
    //是否可以缩放
    controls.current.enableZoom = false; // false
    controls.current.enabled = false; // false
    //是否自动旋转
    // controls.current.autoRotate = false;
    // controls.current.autoRotateSpeed = 2;
    //设置相机距离原点的最远距离
    // controls.current.minDistance = 1;
    //设置相机距离原点的最远距离
    // controls.current.maxDistance = 200;
    //是否开启右键拖拽
    controls.current.enablePan = false; // false

    window.addEventListener('resize', onWindowResize, false);
  }, [height, width, url, onWindowResize]);

  const animate = useCallback(() => {
    requestAnimationFrame(animate);
    // 更新控制器
    render();
  }, []);

  useEffect(() => {
    init();
    animate();
  }, [init, animate]);

  function render() {
    if (elf.current) {
      elf.current.rotation.y += 0.008;
    }
    renderer.current.render(scene.current, camera.current);
  }

  return (
    <div
      style={{
        zIndex: 999999,
        position: 'absolute',
        top: 280,
        left: 220,
        ...style,
      }}
      ref={container}
    />
  );
};

export default Modal3D;
