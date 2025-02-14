import * as THREE from "three";
import Entity from "./Entity";
import EntityType from "../utils/EntityType";

class Polyline extends Entity {
  static counter = 1;
  geometry = null;
  material = null;
  scene = null;
  constructor(inScene) {
    super(EntityType.POLYLINE, inScene, Polyline.counter++);
    this.scene = inScene;
    this.material = new THREE.LineBasicMaterial({
      color: this.mColor,
      opacity: this.mOpacity,
    });
  }

  createMesh() {
    if (this.mConstructionPoints.length < 2) return;
    this.geometry = new THREE.BufferGeometry().setFromPoints(
      this.mConstructionPoints
    );
    this.mMesh = new THREE.Line(this.geometry, this.material);
    this.scene?.add(this.mMesh);
  }
  update() {
    if (this.mMesh) {
      this.scene?.remove(this.mMesh);
      this.geometry?.dispose();
      this.material?.dispose();
    }
    if (this.mConstructionPoints.length < 2) return;
    this.material = new THREE.LineBasicMaterial({
      color: this.mColor,
      opacity: this.mOpacity,
    });
    this.geometry = new THREE.BufferGeometry().setFromPoints(
      this.mConstructionPoints
    );
    this.mMesh = new THREE.Line(this.geometry, this.material);
    this.scene?.add(this.mMesh);
  }
}

export default Polyline;
