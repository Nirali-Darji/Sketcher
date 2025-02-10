import { makeAutoObservable } from "mobx";
import * as THREE from "three";

class CircleStore {
  circles = [];
  centerPoint = null;
  radius = null;
  currentCircle = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCenterPoint(x, y, z) {
    this.centerPoint = new THREE.Vector3(x, y + 0.01, z);
  }

  updateRadius(newRadius, scene) {
    this.radius = newRadius;

    if (this.currentCircle) {
      scene.remove(this.currentCircle);
    }

    const geometry = new THREE.RingGeometry(newRadius - 0.0001, newRadius, 32);
    const material = new THREE.MeshBasicMaterial({
      color: "yellow",
      side: THREE.BackSide,
      wireframe: true,
    });

    const circle = new THREE.Mesh(geometry, material);
    circle.position.copy(this.centerPoint);
    circle.rotation.x = -Math.PI * 0.5;

    scene.add(circle);
    this.currentCircle = circle;
  }

  finalizeCircle(scene) {
    if (!this.centerPoint || this.radius === null) {
      return;
    }

    if (this.currentCircle) {
      scene.remove(this.currentCircle);
    }
    const geometry = new THREE.RingGeometry(
      this.radius - 0.0001,
      this.radius,
      32
    );
    const material = new THREE.MeshBasicMaterial({
      color: "yellow",
      side: THREE.BackSide,
      wireframe: true,
    });

    const circle = new THREE.Mesh(geometry, material);

    circle.position.copy(this.centerPoint);
    circle.rotation.x = -Math.PI * 0.5;
    scene.add(circle);

    this.circles.push(circle);
    this.currentCircle = null;
    this.centerPoint = null;
    this.radius = null;
  }

  removeCircle(circle, scene) {
    const index = this.circles.indexOf(circle);
    if (index !== -1) {
      this.circles.splice(index, 1);
      scene.remove(circle);
    }
  }

  updateCirclePosition(circle, x, y, z) {
    circle.position.set(x, y, z);
  }

  updateCircleRadius(circle, newRadius) {
    const geometry = new THREE.RingGeometry(newRadius - 0.001, newRadius, 32);
    circle.geometry.dispose();
    circle.geometry = geometry;
  }
}

const circleStore = new CircleStore();

export default circleStore;
