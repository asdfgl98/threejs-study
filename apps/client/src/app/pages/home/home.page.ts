import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
  imports: [CommonModule],
})
export default class HomePage implements AfterViewInit {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  renderer = new THREE.WebGLRenderer();

  geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(this.geometry, this.material);

  ngAfterViewInit() {
    this.init();
  }

  init() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.scene.add(this.cube);

    this.camera.position.z = 5;
    this.renderer.setAnimationLoop(() => this.animate());
  }

  animate = () => {
    console.log(this.cube);
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  };
}
