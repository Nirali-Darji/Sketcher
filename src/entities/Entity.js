import * as THREE from "three";

class Entity extends THREE.Object3D {
  mName;
  mConstructionPoints = [];
  mType;
  mMesh = null;
  mColor = "#000000";
  isVisible = true;
  isActive = false;
  scene = null;
  mOpacity = 1;

  constructor(inType, inScene, mName) {
    super();
    this.mType = inType;
    this.scene = inScene;
    this.mName = mName;
  }

  getType() {
    return this.mType;
  }

  updateOpacity(inOpacity) {
    // console.log("Updating opacity to:", inOpacity);
    this.mOpacity = inOpacity;
    if (this.mMesh && this.mMesh.material) {
      this.mMesh.material.opacity = inOpacity;
      this.mMesh.material.transparent = true;
      this.mMesh.material.needsUpdate = true;
      // console.log("Material updated:", this.mMesh);
    }
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

  setConstructionPoints(inPoints) {
    this.mConstructionPoints = inPoints;
  }

  setColor(inColor) {
    this.mColor = inColor;
    if (this.mMesh && this.mMesh.material) {
      this.mMesh.material.color.set(this.mColor);
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
