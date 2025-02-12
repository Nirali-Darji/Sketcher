import EntityType from "../utils/EntityType";
import Entity from "./Entity";
import * as THREE from "three";

class Circle extends Entity {
  geometry = null;
  material = null;
  scene = null;
  constructor(inScene) {
    super(EntityType.CIRCLE);
    this.scene = inScene;
    this.material = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      side: THREE.BackSide,
      wireframe: true,
    });
  }
  createMesh() {
    if (this.mConstructionPoints.length < 2) return;
    const radius = this.getLastConstructionPoint().distanceTo(
      this.mConstructionPoints[0]
    );
    this.geometry = new THREE.RingGeometry(0.5, radius, 32);
    this.mMesh = new THREE.Mesh(this.geometry, this.material);

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
    const radius = this.getLastConstructionPoint().distanceTo(
      this.mConstructionPoints[0]
    );
    this.geometry = new THREE.RingGeometry(radius - 5, radius, 32);
    this.mMesh = new THREE.Mesh(this.geometry, this.material);
    this.mMesh.position.copy(this.mConstructionPoints[0]);
    this.mMesh.rotation.x = -Math.PI * 0.5;

    this.scene?.add(this.mMesh);
  }
}

export default Circle;
