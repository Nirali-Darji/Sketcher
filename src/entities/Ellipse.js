import EntityType from "../utils/EntityType";
import Entity from "./Entity";
import * as THREE from "three";

class Ellipse extends Entity {
  geometry = null;
  material = null;
  scene = null;
  constructor(inScene) {
    super(EntityType.ELLIPSE, inScene);
    this.scene = inScene;
    this.material = new THREE.LineBasicMaterial({ color: 0x0000ff });
  }

  createMesh() {
    if (this.mConstructionPoints.length < 2) return;
    const radiusX = Math.abs(
      this.getLastConstructionPoint().x - this.mConstructionPoints[0].x
    );
    const radiusY = Math.abs(
      this.getLastConstructionPoint().z - this.mConstructionPoints[0].z
    );
    const curve = new THREE.EllipseCurve(
      0,
      0,
      radiusX,
      radiusY,
      0,
      2 * Math.PI
    );

    const points = curve.getPoints(50);
    this.geometry = new THREE.BufferGeometry().setFromPoints(points);
    this.mMesh = new THREE.Line(this.geometry, this.material);

    this.mMesh.position.copy(this.mConstructionPoints[0]);
    this.mMesh.rotation.x = -Math.PI * 0.5;
    this.scene?.add(this.mMesh);
  }

  update() {
    if (this.mMesh) {
      this.scene?.remove(this.mMesh);
      this.geometry?.dispose();
    }
    if (this.mConstructionPoints.length < 2) return;
    const radiusX = Math.abs(
      this.getLastConstructionPoint().x - this.mConstructionPoints[0].x
    );
    const radiusY = Math.abs(
      this.getLastConstructionPoint().z - this.mConstructionPoints[0].z
    );

    const curve = new THREE.EllipseCurve(
      0,
      0,
      radiusX,
      radiusY,
      0,
      2 * Math.PI
    );

    const points = curve.getPoints(50);
    this.geometry = new THREE.BufferGeometry().setFromPoints(points);
    this.mMesh = new THREE.Line(this.geometry, this.material);

    this.mMesh.position.copy(this.mConstructionPoints[0]);
    this.mMesh.rotation.x = -Math.PI * 0.5;
    this.scene?.add(this.mMesh);
  }
}

export default Ellipse;
