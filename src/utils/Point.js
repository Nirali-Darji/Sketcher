import * as THREE from "three";

class Point {
  constructor(x, y, z, scene) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.scene = scene;
    this.createPoint(scene);
  }

  createPoint(scene) {
    if (!this.mesh) {
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.position.set(this.x, this.y, this.z);

      scene.add(this.mesh);
    }
  }

  updatePosition(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.mesh.position.set(this.x, this.y, this.z);
  }

  updateSize(radius) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    this.mesh.geometry.dispose();
    this.mesh.geometry = geometry;
  }

  updateColor(color) {
    this.mesh.material.color.set(color);
  }
}

export default Point;
