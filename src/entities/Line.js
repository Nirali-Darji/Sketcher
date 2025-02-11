import * as THREE from "three";
import Entity from "./Entity";
import EntityType from "../utils/EntityType";

class Line extends Entity {
  geometry = null;
  material = null;
  scene = null;
  constructor(inScene) {
    super(EntityType.LINE);
    this.scene = inScene;
    this.material = new THREE.LineBasicMaterial({ color: 0x0000ff });
  }

  createMesh() {
    if (this.mConstructionPoints.length < 2) return;

    this.geometry = new THREE.BufferGeometry().setFromPoints([
      this.mConstructionPoints[0],
      this.getLastConstructionPoint(),
    ]);
    this.mMesh = new THREE.Line(this.geometry, this.material);
    this.scene?.add(this.mMesh);
  }

  update() {
    if (this.mMesh) {
      this.scene?.remove(this.mMesh);
      this.geometry?.dispose();
    }

    if (this.mConstructionPoints.length >= 2) {
      this.geometry = new THREE.BufferGeometry().setFromPoints([
        this.mConstructionPoints[0],
        this.getLastConstructionPoint(),
      ]);
      this.mMesh = new THREE.Line(this.geometry, this.material);
      this.scene.add(this.mMesh);
      // console.log(this.scene?.children.includes(this.mMesh));
    }
  }
}

export default Line;
