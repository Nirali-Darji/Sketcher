import * as THREE from "three";
import EntityType from "../utils/EntityType";
import Line from "../entities/Line";
import Circle from "../entities/Circle";
import Ellipse from "../entities/Ellipse";
import Polyline from "../entities/Polyline";
import { makeAutoObservable } from "mobx";

class SketcherStore {
  mEntities = [];
  camera = null;
  scene = null;
  sphereColor = "red";
  planeColor = "yellow";
  isSphereVisible = false;
  currentEntityType = null;
  currentEntity = null;
  selectedEntity = null;

  sphere = new THREE.Mesh(
    new THREE.CircleGeometry(1, 32),
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

    this.sphere.rotation.x = -Math.PI * 0.5;
    this.scene?.add(planeMesh);

    this.scene?.add(this.sphere);

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.onClick = this.onClick.bind(this);
    makeAutoObservable(this);
  }

  addEntity(inEntity) {
    if (Object.values(EntityType).includes(inEntity.mType)) {
      this.mEntities.push(inEntity);
    } else {
      console.error("Invalid entity type");
    }
  }

  getIntersectionPoint(event) {
    const canvas = document.querySelector("canvas");
    const rect = canvas.getBoundingClientRect();
    const mouseCords = new THREE.Vector2(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1
    );
    const rayCaster = new THREE.Raycaster();
    rayCaster.setFromCamera(mouseCords, this.camera);

    const intersects = rayCaster.intersectObjects(this.scene.children, true);
    return intersects.length > 0 ? intersects[0].point : null;
  }

  onMouseDown(event) {
    const intersectPoint = this.getIntersectionPoint(event);
    if (intersectPoint) {
      intersectPoint.y += 0.01;
      this.sphere.position.copy(intersectPoint);
      this.sphere.material.visible = this.isSphereVisible;
      if (this.currentEntityType) {
        if (
          this.currentEntityType === EntityType.POLYLINE &&
          this.currentEntity
        ) {
          this.currentEntity.addConstructionPoint(intersectPoint);
          return;
        }
        if (this.currentEntity) {
          this.addEntity(this.currentEntity);
          this.currentEntity = null;
          this.currentEntityType = null;
          return;
        }
        switch (this.currentEntityType) {
          case EntityType.LINE:
            this.currentEntity = new Line(this.scene);

            this.currentEntity.addConstructionPoint(intersectPoint);
            break;
          case EntityType.CIRCLE:
            this.currentEntity = new Circle(this.scene);
            this.currentEntity.addConstructionPoint(intersectPoint);
            console.log("Circle");
            break;
          case EntityType.ELLIPSE:
            this.currentEntity = new Ellipse(this.scene);
            this.currentEntity.addConstructionPoint(intersectPoint);
            console.log("ELLIPSE");
            break;
          case EntityType.POLYLINE:
            this.currentEntity = new Polyline(this.scene);
            this.currentEntity.addConstructionPoint(intersectPoint);
            console.log("POLYLINE");
            break;
          default:
            console.warn("Entity does not match");
            break;
        }
        this.currentEntity?.addConstructionPoint(intersectPoint);
        this.currentEntity?.createMesh();
      }
    }
  }

  onMouseMove(event) {
    const intersectPoint = this.getIntersectionPoint(event);
    if (intersectPoint) {
      intersectPoint.y += 0.01;
      this.sphere.position.copy(intersectPoint);
      this.sphere.material.visible = this.isSphereVisible;
    }
    if (intersectPoint && this.currentEntity) {
      if (this.currentEntityType === EntityType.POLYLINE) {
        this.currentEntity.updateLastConstructionPoint(intersectPoint);
      } else {
        this.currentEntity.addConstructionPoint(intersectPoint);
      }
      this.currentEntity.update();
    }
  }

  onDoubleClick() {
    if (this.currentEntityType === EntityType.POLYLINE) {
      this.addEntity(this.currentEntity);
      this.currentEntity = null;
      this.currentEntityType = null;
    }
  }

  onClick(event) {
    if (!this.currentEntity && this.mEntities.length > 0) {
      const canvas = document.querySelector("canvas");
      const rect = canvas.getBoundingClientRect();
      const mouseCords = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
      const rayCaster = new THREE.Raycaster();
      rayCaster.setFromCamera(mouseCords, this.camera);
      const meshes = this.mEntities.map((entity) => entity.getMesh());
      // console.log(meshes);

      const intersects = rayCaster.intersectObjects(meshes, true);
      // console.log(intersects);
      if (intersects.length > 0) {
        const selectedMesh = intersects[0].object;
        const selectedEntity = this.mEntities.find(
          (entity) => entity.getMesh() === selectedMesh
        );
        this.selectedEntity = selectedEntity;
        console.log("Selected Entity:", selectedEntity);
      }
    }
  }
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
