import * as THREE from "three";
import EntityType from "../utils/EntityType";
import Entity from "../entities/Entity";
import Line from "../entities/Line";

class SketcherStore {
  mEntities = [];
  camera = null;
  scene = null;
  sphereColor = "red";
  planeColor = "white";
  isSphereVisible = false;
  currentEntityType = null;
  currentEntity = null;

  sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 10, 10),
    new THREE.MeshBasicMaterial({
      color: this.sphereColor,
      visible: this.isSphereVisible,
    })
  );

  constructor(scene, camera) {
    this.camera = camera;
    this.scene = scene;

    const planeGeo = new THREE.PlaneGeometry(10000, 10000, 1, 1);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: this.planeColor,
      side: THREE.DoubleSide,
    });
    const planeMesh = new THREE.Mesh(planeGeo, planeMaterial);
    planeMesh.rotation.x = -Math.PI / 2;
    this.scene?.add(planeMesh);

    this.scene?.add(this.sphere);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  addEntity(inEntity) {
    if (Object.values(EntityType).includes(inEntity.mType)) {
      this.mEntities.push(inEntity);
      this.scene.add(inEntity);
    } else {
      console.error("Invalid entity type");
    }
  }

  getIntersectionPoint(event) {
    const mouseCords = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    const rayCaster = new THREE.Raycaster();
    rayCaster.setFromCamera(mouseCords, this.camera);

    const intersects = rayCaster.intersectObjects(this.scene.children, true);
    return intersects.length > 0 ? intersects[0].point : null;
  }

  onMouseDown(event) {
    const intersectPoint = this.getIntersectionPoint(event);
    if (intersectPoint) {
      this.sphere.position.copy(intersectPoint);
      this.sphere.material.visible = this.isSphereVisible;

      if (this.currentEntityType) {
        if (!this.currentEntity) {
          this.currentEntity = new Line(this.scene);
          this.currentEntity.addConstructionPoint(intersectPoint);
        }
        this.currentEntity.addConstructionPoint(intersectPoint);
        this.currentEntity.createMesh();
      }
    }
  }

  onMouseMove(event) {
    const intersectPoint = this.getIntersectionPoint(event);

    if (intersectPoint && this.currentEntity) {
      this.currentEntity.addConstructionPoint(intersectPoint);
      this.currentEntity.update();
    }
  }

  onMouseUp(event) {}

  removeEntity(inEntity) {
    if (Object.values(EntityType).includes(inEntity.mType)) {
      const index = this.mEntities.indexOf(inEntity);
      if (index !== -1) {
        this.mEntities.splice(index, 1);
        this.scene.remove(inEntity);
      }
    }
  }
}

export default SketcherStore;
