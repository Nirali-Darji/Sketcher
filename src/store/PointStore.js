import { makeAutoObservable } from "mobx";
import * as THREE from "three";

class PointStore {
  lines = [];
  lastPoint = null;

  constructor() {
    makeAutoObservable(this);
  }

  addPoint(x, y, z, scene) {
    const newPoint = { x, y, z };

    if (this.lastPoint !== null) {
      const pointsArray = [
        new THREE.Vector3(this.lastPoint.x, this.lastPoint.y, this.lastPoint.z),
        new THREE.Vector3(x, y, z),
      ];

      const geometry = new THREE.BufferGeometry().setFromPoints(pointsArray);
      const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

      const line = new THREE.Line(geometry, material);
      this.lines.push(line);
      scene.add(line);

      this.lastPoint = null;
    } else {
      this.lastPoint = newPoint;
    }
  }

  clearLines(scene) {
    this.lines.forEach((line) => scene.remove(line));
    this.lines = [];
    this.lastPoint = null;
  }
}

const pointStore = new PointStore();
export default pointStore;
