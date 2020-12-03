import React, { Component } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

let renderer, camera, scene, controls, object;
const innerWidth = 600,
  innerHeight = 500;
export default class RuBanLock extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.draw();
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  /**
   * 渲染
   */
  renders() {
    renderer.render(scene, camera);
  }

  /**
   * 窗口变动
   **/
  onWindowResize = () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    this.render();
    renderer.setSize(innerWidth, innerHeight);
  };

  /**
   * 更新
   **/
  animate = () => {
    this.renders();
    if (controls) controls.update();
    requestAnimationFrame(this.animate);
  };

  draw() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      2000,
    );
    camera.position.x = -31265;
    camera.position.y = 647;
    camera.position.z = -3276;

    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    ambientLight.position.set(-31265, 547, -3276);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xff00ff, 0.8);
    camera.add(pointLight);
    scene.add(camera);

    function loadModel() {
      object.position.y = 0;
      scene.add(object);
    }

    const manager = new THREE.LoadingManager(loadModel);

    manager.onProgress = function (item, loaded, total) {
      console.log(item, loaded, total);
    };

    const loader = new OBJLoader(manager);
    loader.load(require('./objs/taurus.obj'), function (obj) {
      object = obj;
      scene.add(object);
    });

    // new MTLLoader().load(require('./objs/taurus.mtl'), function (materials) {
    //   materials.preload();
    //   console.log('materials', materials);
    //   const objLoader = new OBJLoader();
    //   // objLoader.setPath( './objs/' ); // 设置.obj文件所在的文件夹路径
    //   objLoader.setMaterials(materials).load(require('./objs/taurus.obj'), function (object) {
    //     console.log('object', object);

    //     // object.position.y = - 95;
    //     scene.add(object);
    //   });
    // });

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.animate();
    window.onresize = this.onWindowResize;
  }

  render() {
    return (
      <div
        className="ruban-lock"
        style={{ width: innerWidth, height: innerHeight }}
        ref={(e) => {
          this.dom = e;
        }}
      />
    );
  }
}
