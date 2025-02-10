import { makeAutoObservable } from "mobx";
import * as THREE from "three";

class EllipseStore {
  ellipses = [];
  centerPoint = null;
  xRadius = null;
  yRadius = null;
  currentEllipse = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCenterPoint(x, y, z) {
    this.centerPoint = new THREE.Vector3(x, y + 0.01, z);
  }

  updateRadii(newXRadius, newYRadius, scene) {
    this.xRadius = newXRadius;
    this.yRadius = newYRadius;

    if (this.currentEllipse) {
      scene.remove(this.currentEllipse);
    }

    const curve = new THREE.EllipseCurve(
      0,
      0,
      this.xRadius,
      this.yRadius,
      0,
      2 * Math.PI
    );

    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "yellow" });

    const ellipse = new THREE.Line(geometry, material);
    ellipse.position.copy(this.centerPoint);
    ellipse.rotation.x = -Math.PI * 0.5;

    scene.add(ellipse);
    this.currentEllipse = ellipse;
  }

  finalizeEllipse(scene) {
    if (!this.centerPoint || this.xRadius === null || this.yRadius === null) {
      return;
    }

    const curve = new THREE.EllipseCurve(
      0,
      0,
      this.xRadius,
      this.yRadius,
      0,
      2 * Math.PI
    );

    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: "yellow" });

    const ellipse = new THREE.Line(geometry, material);
    ellipse.position.copy(this.centerPoint);
    ellipse.rotation.x = -Math.PI * 0.5;

    scene.add(ellipse);
    this.ellipses.push(ellipse);

    this.currentEllipse = null;
    this.centerPoint = null;
    this.xRadius = null;
    this.yRadius = null;
  }

  removeEllipse(ellipse, scene) {
    const index = this.ellipses.indexOf(ellipse);
    if (index !== -1) {
      this.ellipses.splice(index, 1);
      scene.remove(ellipse);
    }
  }

  updateEllipsePosition(ellipse, x, y, z) {
    ellipse.position.set(x, y, z);
  }

  updateEllipseRadii(ellipse, newXRadius, newYRadius) {
    const curve = new THREE.EllipseCurve(
      0,
      0,
      newXRadius,
      newYRadius,
      0,
      2 * Math.PI
    );

    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    ellipse.geometry.dispose();
    ellipse.geometry = geometry;
  }
}

const ellipseStore = new EllipseStore();

export default ellipseStore;
