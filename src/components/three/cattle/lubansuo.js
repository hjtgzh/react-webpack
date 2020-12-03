import * as THREE from 'three';
import logo from './assets/images/100X200.png';
/**
 * 自定义图形
 */
export default function mkLuBanSuo(scene) {
  const group = new THREE.Object3D();

  const material = new THREE.MeshBasicMaterial({
    color: 0xfeec80,
    transparent: true,
    opacity: 0.9,
  });

  [
    {
      whd: {
        width: 80,
        height: 160,
        depth: 450,
      },
      formatMaterial: () => {
        const materials = [];
        for (let i = 0; i < 6; ++i) {
          //导入图像到六个纹理，并设置到六个材质中
          if (i == 5 || i == 4) {
            materials.push(
              new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture(logo, {}),
                overdraw: true,
              }),
            );
          } else {
            materials.push(material);
          }
        }

        return materials;
      },
    },
    {
      whd: {
        width: 80,
        height: 160,
        depth: 450,
      },
      rotate: (cube) => {
        return [-1.57, 0, 1.57];
      },
      formatMaterial: () => {
        const materials = [];
        for (let i = 0; i < 6; ++i) {
          //导入图像到六个纹理，并设置到六个材质中
          if (i == 5 || i == 4) {
            materials.push(
              new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture(logo, {}),
                overdraw: true,
              }),
            );
          } else {
            materials.push(material);
          }
        }

        return materials;
      },
    },
    {
      whd: {
        width: 80,
        height: 160,
        depth: 450,
      },
      rotate: (cube) => {
        return [0, -1.57, 1.57];
      },
      formatMaterial: () => {
        const materials = [];
        for (let i = 0; i < 6; ++i) {
          //导入图像到六个纹理，并设置到六个材质中
          if (i == 5 || i == 4) {
            materials.push(
              new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture(logo, {}),
                overdraw: true,
              }),
            );
          } else {
            materials.push(material);
          }
        }

        return materials;
      },
    },
  ].forEach(({ whd, rotate, formatPosition, formatMaterial }) => {
    const position = formatPosition ? formatPosition(whd) : null;
    group.add(mkCube(whd, rotate, position, formatMaterial));
  });

  group.scale.set(0.1, 0.1, 0.1);
  group.rotation.z = 5.1;
  group.rotation.y = 0.5;
  group.rotation.x = 1.5;
  const animate = function () {
    requestAnimationFrame(animate);
    group.rotation.z += 0.01;
  };
  animate();
  scene.add(group);

  return group;
}

/**
 * 生成操场
 * @return {THREE.Object3D}
 */
const mkCube = (whd, rotate, position, formatMaterial) => {
  const group = new THREE.Object3D();
  const { width, height, depth } = whd;

  const geometry = new THREE.BoxBufferGeometry(width, height, depth);

  const cube = new THREE.Mesh(geometry, formatMaterial());
  group.add(cube);

  // 添加边框
  [
    //------------右侧面--------
    {
      cylinderHeight: height,
      position: [width / 2, 0, depth / 2],
    },
    {
      cylinderHeight: depth,
      position: [width / 2, height / 2, 0],
      rotate: (cylinder) => cylinder.rotateX(Math.PI / 2),
    },
    {
      cylinderHeight: height,
      position: [width / 2, 0, -depth / 2],
    },
    {
      cylinderHeight: depth,
      position: [width / 2, -height / 2, 0],
      rotate: (cylinder) => cylinder.rotateX(Math.PI / 2),
    },
    {
      cylinderHeight: depth,
      position: [width / 2, 0, 0],
      rotate: (cylinder) => cylinder.rotateX(Math.PI / 2),
    },
    //------------前侧面--------
    {
      cylinderHeight: height,
      position: [-width / 2, 0, depth / 2],
    },
    {
      cylinderHeight: width,
      position: [0, height / 2, depth / 2],
      rotate: (cylinder) => cylinder.rotateZ(Math.PI / 2),
    },
    {
      cylinderHeight: width,
      position: [0, -height / 2, depth / 2],
      rotate: (cylinder) => cylinder.rotateZ(Math.PI / 2),
    },
    //------------后侧面--------
    {
      cylinderHeight: height,
      position: [-width / 2, 0, -depth / 2],
    },
    {
      cylinderHeight: width,
      position: [0, height / 2, -depth / 2],
      rotate: (cylinder) => cylinder.rotateZ(Math.PI / 2),
    },
    {
      cylinderHeight: width,
      position: [0, -height / 2, -depth / 2],
      rotate: (cylinder) => cylinder.rotateZ(Math.PI / 2),
    },

    //------------左侧面--------
    {
      cylinderHeight: depth,
      position: [-width / 2, height / 2, 0],
      rotate: (cylinder) => cylinder.rotateX(Math.PI / 2),
    },
    {
      cylinderHeight: depth,
      position: [-width / 2, -height / 2, 0],
      rotate: (cylinder) => cylinder.rotateX(Math.PI / 2),
    },
    {
      cylinderHeight: depth,
      position: [-width / 2, 0, 0],
      rotate: (cylinder) => cylinder.rotateX(Math.PI / 2),
    },
  ].forEach(({ cylinderHeight, position, rotate }) => {
    group.add(mkCylinder(cylinderHeight, position, rotate));
  });

  if (rotate) {
    group.rotation.set(...rotate());
  }

  if (position) {
    group.position.set(...position);
  }

  return group;
};

const mkCylinder = (cylinderHeight, position, rotate) => {
  const lineWidth = 3;
  const geometry = new THREE.CylinderBufferGeometry(
    lineWidth,
    lineWidth,
    cylinderHeight,
    32,
  );
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const cylinder = new THREE.Mesh(geometry, material);
  if (rotate) rotate(cylinder);
  cylinder.position.set(...position);

  return cylinder;
};
