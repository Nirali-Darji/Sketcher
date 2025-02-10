import { makeAutoObservable } from "mobx";
import * as THREE from "three";

class PolylineStore {
  polylines = []; // Stores all completed polylines
  currentPolyline = null; // Stores the current polyline being drawn
  startPoint = null; // Start point of the current line segment
  lastPoint = null; // End point of the last line segment (used as the start of the next line)

  constructor() {
    makeAutoObservable(this);
  }

  startOrUpdatePolyline(x, y, z) {
    if (!this.startPoint) {
      this.startPoint = new THREE.Vector3(x, y, z);
      this.lastPoint = this.startPoint;
      this.currentPolyline = {
        points: [this.startPoint],
        lines: [], // Stores individual line segments
      };
    } else {
      const newPoint = new THREE.Vector3(x, y, z);
      this.currentPolyline.points.push(newPoint);
      this.lastPoint = newPoint;
    }
  }

  updateCurrentLine(x, y, z, scene) {
    if (this.startPoint && this.lastPoint) {
      const pointsArray = [this.lastPoint, new THREE.Vector3(x, y, z)];

      if (this.currentPolyline.lines.length > 0) {
        const lastLine =
          this.currentPolyline.lines[this.currentPolyline.lines.length - 1];
        scene.remove(lastLine);
        lastLine.geometry.dispose();
        lastLine.material.dispose();
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(pointsArray);
      const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
      const line = new THREE.Line(geometry, material);

      scene.add(line);
      this.currentPolyline.lines.push(line);
    }
  }

  // Finalize the current polyline and add it to the list of polylines
  finalizePolyline(scene) {
    if (this.currentPolyline) {
      // Add the current polyline to the list of completed polylines
      this.polylines.push({
        points: this.currentPolyline.points,
        lines: this.currentPolyline.lines,
      });

      // Reset the state for the next polyline
      this.currentPolyline = null;
      this.startPoint = null;
      this.lastPoint = null;
    }
  }
}

const polylineStore = new PolylineStore();
export default polylineStore;
