/*
 * @文件描述: 鲁班锁
 * @公司: cloudwise
 * @作者: janko
 * @Date: 2020-12-03 18:09:46
 * @LastEditors: janko
 * @LastEditTime: 2020-12-14 10:41:43
 */
import React, { Component } from 'react';
import * as THREE from 'three';
import OBJ from './lubansuo';
var OrbitControls = require('three-orbit-controls')(THREE);

import(`./assets/style.less`);
let renderer, camera, scene, gui, light, controls;
const innerWidth = SIZE === '-small' ? 150 : 600,
  innerHeight = SIZE === '-small' ? 150 : 500;
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
   * 初始化渲染器
   **/
  initRender() {
    // 渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // 渲染器大小
    renderer.setSize(innerWidth, innerHeight);
    // 渲染器颜色
    // renderer.setClearColor(0xffffff);
    this.dom.appendChild(renderer.domElement);
  }

  /**
   * 初始化镜头
   **/
  initCamera() {
    camera = new THREE.PerspectiveCamera(
      45,
      innerWidth / innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 40, 50);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  }

  /**
   * 初始化场景
   **/
  initScene() {
    scene = new THREE.Scene();
  }

  /**
   * 初始化dat.GUI简化试验流程
   **/
  initGui() {
    gui = {};
    // var datGui = new dat.GUI();
  }

  /**
   * 初始化灯光
   **/
  initLight() {
    scene.add(new THREE.AmbientLight(0x444444));
    light = new THREE.PointLight(0xffffff);
    light.position.set(0, 50, 50);

    // 告诉平行光需要开启阴影投射
    light.castShadow = true;
    scene.add(light);
  }

  /**
   * 初始化性能插件
   **/
  initStats() {
    // stats = new Stats();
    // document.body.appendChild(this.dom);
  }

  /**
   * 初始化用户交互
   **/
  initControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    // 如果使用animate方法时，将此函数删除
    // controls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    controls.enableDamping = true;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //controls.dampingFactor = 0.25;
    //是否可以缩放
    controls.enableZoom = false;
    //是否自动旋转
    controls.autoRotate = false;
    controls.autoRotateSpeed = 2;
    //设置相机距离原点的最远距离
    controls.minDistance = 1;
    //设置相机距离原点的最远距离
    controls.maxDistance = 200;
    //是否开启右键拖拽
    controls.enablePan = false;
  }

  /**
   * 渲染
   */
  renders() {
    renderer.render(scene, camera);
  }

  /**
   * 进展
   * @xhr:any
   **/
  onProgress(xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = (xhr.loaded / xhr.total) * 100;
    }
  }

  /*
   * 错误
   * @error:any
   **/
  onError(error) {
    console.error(error);
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
    // stats.update();
    if (controls) controls.update();
    requestAnimationFrame(this.animate);
  };

  draw() {
    this.initGui();
    this.initRender();
    this.initScene();
    this.initCamera();
    this.initLight();
    // this.initControls();
    // this.initStats();
    OBJ(scene);
    this.animate();
    window.onresize = this.onWindowResize;
  }

  render() {
    return (
      <div
        className={'ruban-lock' + SIZE}
        style={{ width: innerWidth, height: innerHeight }}
        ref={(e) => {
          this.dom = e;
        }}
      />
    );
  }
}
