/*
 * @文件描述: 圆形文字
 * @公司: cloudwise
 * @作者: janko
 * @Date: 2020-12-03 18:09:46
 * @LastEditors: janko
 * @LastEditTime: 2020-12-14 10:40:25
 */
import React, { Component } from 'react';
import * as THREE from 'three';
import OBJ from './lubansuo';
var OrbitControls = require('three-orbit-controls')(THREE);
import { Progress } from 'antd';

import(`./assets/style.less`);
let renderer, camera, scene, gui, light, controls;
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
    OBJ(scene);
    this.animate();
    window.onresize = this.onWindowResize;
  }

  render() {
    let {
      remainingLimit, //剩余统筹额度
      remainingLimitRate, //剩余统筹额度百分比
      haveUsedLimit, //已用统筹额度
      haveUsedLimitRate, //已用统筹额度百分比
    } = this.props || {};
    if (+haveUsedLimitRate > 100) {
      haveUsedLimitRate = 100;
    }
    if (+remainingLimitRate > 100) {
      remainingLimitRate = 100;
    }
    if (remainingLimit > 300000) {
      remainingLimit = 300000;
    }
    if (haveUsedLimit > 300000) {
      haveUsedLimit = 300000;
    }
    return (
      <div className={'cattleout' + SIZE}>
        <div className={'streamline1' + SIZE} />
        <div className={'streamline2' + SIZE} />
        {/* <div className='cattleoutLeft'>
                    <span className='used'>已用统筹额度：</span>
                    <span className='usednum'>9000万元</span>
                    <span className='usedroat'>90%</span>
                </div> */}
        {/* <div className='cattleoutRight'>
                    <span className='surplus'>剩余统筹额度：</span>
                    <span className='surplusnum'>1000万元</span>
                    <span className='surplusroat'>10%</span>
                </div> */}
        <div
          className={'ruban-lock' + SIZE}
          style={{ width: innerWidth, height: innerHeight }}
          ref={(e) => {
            this.dom = e;
          }}
        />

        {SIZE === '-small' ? (
          <div style={{ position: 'absolute', left: 18, top: -10 }}>
            <svg width="133px" height="133px" viewBox="0 0 133 133">
              <path
                id="zxxPathSmall1"
                fill="none"
                stroke="rgba(0,0,0,0)"
                d="M6,96 C4,60 60,4 140,50 "
              />
              <text fontSize="8" fill="white" stroke="white" strokeWidth="0.1">
                <textPath href="#zxxPathSmall1">
                  {'已用统筹额度:' + haveUsedLimit + '万元'}
                </textPath>
              </text>
            </svg>
          </div>
        ) : (
          <div style={{ position: 'absolute', left: 56, top: 56 }}>
            <svg width="260px" height="260px" viewBox="0 0 260 260">
              <path
                id="zxxPath"
                fill="none"
                stroke="rgba(0,0,0,0)"
                d="M22,260 C24,106.974508 106.974508,24 260,20"
              />
              <text fontSize="30" fill="white" stroke="white">
                <textPath href="#zxxPath">
                  {'已用统筹额度:' + haveUsedLimit + '万元'}
                </textPath>
              </text>
            </svg>
          </div>
        )}

        {SIZE === '-small' ? (
          <div style={{ position: 'absolute', left: 92, top: 20 }}>
            <svg width="133px" height="133px" viewBox="0 0 133 133">
              <path
                id="zxxPathSmall2"
                fill="none"
                stroke="rgba(0,0,0,0)"
                d="M0,6 C68,10 70,70 70,120"
              />
              <text fontSize="8" fill="white" stroke="white" strokeWidth="0.1">
                <textPath href="#zxxPathSmall2">
                  {'剩余统筹额度:' + remainingLimit + '万元'}
                </textPath>
              </text>
            </svg>
          </div>
        ) : (
          <div style={{ position: 'absolute', left: 305, top: 50 }}>
            <svg width="260px" height="300px" viewBox="0 0 260 260">
              <path
                id="zxxPath2"
                fill="none"
                stroke="rgba(0,0,0,0)"
                d="M10,4 C150,24 260,130 220,320"
              />
              <text fontSize="30" fill="white" stroke="white">
                <textPath href="#zxxPath2">
                  {'剩余统筹额度:' + remainingLimit + '万元'}
                </textPath>
              </text>
            </svg>
          </div>
        )}

        <div className={'usedRate' + SIZE}>{haveUsedLimitRate + '%'}</div>
        <div
          className={'usedRate' + SIZE}
          style={{ left: SIZE === '-small' ? 88 : 305 }}
        >
          {remainingLimitRate + '%'}
        </div>
        {SIZE === '-small' ? (
          <div
            style={{
              position: 'absolute',
              left: 8.3,
              top: 8.3,
              transform: 'rotate(2.4deg)',
            }}
          >
            <Progress
              // percent={75}
              type="circle"
              strokeLinecap="square"
              strokeWidth={4}
              width={165}
              gapPosition="top"
              strokeColor="rgba(218,59,47,0.5)"
              percent={remainingLimitRate}
              trailColor="rgba(255,201,27,0.5)"
              format={() => ''}
            />
          </div>
        ) : (
          <div
            style={{
              position: 'absolute',
              left: 25,
              top: 25,
              transform: 'rotate(2.4deg)',
            }}
          >
            <Progress
              // percent={75}
              type="circle"
              strokeLinecap="square"
              strokeWidth={4.3}
              width={560}
              gapPosition="top"
              strokeColor="rgba(218,59,47,0.5)"
              percent={remainingLimitRate}
              trailColor="rgba(255,201,27,0.5)"
              format={() => ''}
            />
          </div>
        )}
      </div>
    );
  }
}
