import * as THREE from "three";

class Entity extends THREE.Object3D {
  mName;
  mConstructionPoints = [];
  mType;
  mMesh = null;
  mColor = null;
  isVisible = true;
  isActive = false;
  scene = null;

  constructor(inType, inScene) {
    super();
    this.mType = inType;
    this.scene = inScene;
  }

  getType() {
    return this.mType;
  }

  getMesh() {
    return this.mMesh;
  }

  setMesh(inMesh) {
    this.mMesh = inMesh;
    if (this.scene) {
      this.scene.add(this.mMesh);
    }
  }

  setColor(inColor) {
    if (this.mMesh && this.mMesh.material) {
      this.mMesh.material.color = inColor;
    }
  }

  setVisible(inVisible) {
    if (this.mMesh && this.mMesh.material) {
      this.mMesh.material.visible = inVisible;
    }
  }

  setActive(inActive) {
    this.isActive = inActive;
  }

  getActive() {
    return this.isActive;
  }

  getLastConstructionPoint() {
    return this.mConstructionPoints[this.mConstructionPoints.length - 1];
  }

  addConstructionPoint(inPoint) {
    this.mConstructionPoints.push(inPoint);
  }
  updateLastConstructionPoint(inPoint) {
    this.mConstructionPoints[this.mConstructionPoints.length - 1] =
      new THREE.Vector3(inPoint.x, inPoint.y, inPoint.z);
  }
}

export default Entity;
