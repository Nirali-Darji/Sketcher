import EntityType from "../utils/EntityType";
import Entity from "./Entity";
import * as THREE from "three";

class Circle extends Entity {
  static counter = 1;
  geometry = null;
  material = null;
  scene = null;
  constructor(inScene) {
    super(EntityType.CIRCLE, inScene, Circle.counter++);
    this.scene = inScene;
    this.material = new THREE.MeshBasicMaterial({
      color: this.mColor,
      opacity: this.mOpacity,
    });
  }
  createMesh() {
    if (this.mConstructionPoints.length < 2) return;
    const radius = this.getLastConstructionPoint().distanceTo(
      this.mConstructionPoints[0]
    );
    this.geometry = new THREE.CircleGeometry(radius, 32);
    this.mMesh = new THREE.Mesh(this.geometry, this.material);
    this.mMesh.position.copy(this.mConstructionPoints[0]);
    this.mMesh.rotation.x = -Math.PI * 0.5;
    this.scene?.add(this.mMesh);
  }

  update() {
    if (this.mMesh) {
      this.scene?.remove(this.mMesh);
      this.geometry?.dispose();
      this.material?.dispose();
    }
    if (this.mConstructionPoints.length < 2) return;
    const radius = this.getLastConstructionPoint().distanceTo(
      this.mConstructionPoints[0]
    );
    this.material = new THREE.MeshBasicMaterial({
      color: this.mColor,
      opacity: this.mOpacity,
    });
    this.geometry = new THREE.CircleGeometry(radius, 32);
    this.mMesh = new THREE.Mesh(this.geometry, this.material);
    this.mMesh.position.copy(this.mConstructionPoints[0]);
    this.mMesh.rotation.x = -Math.PI * 0.5;

    this.scene?.add(this.mMesh);
  }

  updateRadius(inRadius) {
    if (this.mMesh) {
      this.scene?.remove(this.mMesh);
      this.geometry?.dispose();
      this.material?.dispose();
    }
    if (this.mConstructionPoints.length < 2) return;
    const radius = inRadius;
    this.material = new THREE.MeshBasicMaterial({
      color: this.mColor,
    });
    this.geometry = new THREE.CircleGeometry(radius, 32);
    this.material = new THREE.MeshBasicMaterial({
      color: this.mColor,
      opacity: this.mOpacity,
    });
    this.mMesh = new THREE.Mesh(this.geometry, this.material);
    this.mMesh.position.copy(this.mConstructionPoints[0]);
    this.mMesh.rotation.x = -Math.PI * 0.5;

    this.scene?.add(this.mMesh);
  }
}

export default Circle;
