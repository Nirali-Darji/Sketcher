import { makeAutoObservable } from "mobx";
import * as THREE from "three";

class LineStore {
  lines = [];
  startPoint = null;
  currentLine = null;

  constructor() {
    makeAutoObservable(this);
  }

  setStartPoint(x, y, z) {
    this.startPoint = new THREE.Vector3(x, y, z);
  }

  updateLine(x, y, z, scene) {
    if (this.startPoint) {
      const pointsArray = [this.startPoint, new THREE.Vector3(x, y, z)];

      if (this.currentLine) {
        scene.remove(this.currentLine);
        this.currentLine.geometry.dispose();
        this.currentLine.material.dispose();
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(pointsArray);
      const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

      this.currentLine = new THREE.Line(geometry, material);
      scene.add(this.currentLine);
    }
  }

  finalizeLine() {
    if (this.currentLine) {
      this.lines.push(this.currentLine);
      this.startPoint = null;
      this.currentLine = null;
    }
  }

  clearLines(scene) {
    this.lines.forEach((line) => {
      scene.remove(line);
      line.geometry.dispose();
      line.material.dispose();
    });
    this.lines = [];
    this.startPoint = null;
    this.currentLine = null;
  }
}

const lineStore = new LineStore();
export default lineStore;
