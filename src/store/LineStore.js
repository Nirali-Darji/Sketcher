import { makeAutoObservable } from "mobx";
import * as THREE from "three";

class LineStore {
  lines = [];
  startPoint = null;
  currentLine = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Set the start point of the line
  setStartPoint(x, y, z) {
    this.startPoint = new THREE.Vector3(x, y, z);
  }

  // Update the temporary line as the mouse moves
  updateLine(x, y, z, scene) {
    if (this.startPoint) {
      const pointsArray = [this.startPoint, new THREE.Vector3(x, y, z)];

      // Dispose of the previous temporary line if it exists
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

  // Finalize the line and add it to the list of lines
  finalizeLine(scene) {
    if (this.currentLine) {
      this.lines.push(this.currentLine);
      this.startPoint = null;
      this.currentLine = null;
    }
  }

  // Clear all lines from the scene
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
