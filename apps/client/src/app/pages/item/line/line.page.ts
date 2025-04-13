import { CommonModule } from '@angular/common';
import { Component, ElementRef, viewChild } from '@angular/core';
import * as THREE from 'three';
@Component({
  selector: 'app-line',
  templateUrl: './line.page.html',
  styleUrls: ['./line.page.css'],
  imports: [CommonModule],
})
export default class LinePage {
  divRef = viewChild<ElementRef<HTMLDivElement>>('divRef');

  renderer = new THREE.WebGLRenderer();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    500
  );

  scene = new THREE.Scene();

  material = new THREE.LineBasicMaterial({ color: 0x0000ff });

  points: any[] = [];

  geometry: any;

  line: any;

  ngOnInit() {
    this.init();
  }

  init() {
    this.camera.position.set(0, 0, 100);
    this.camera.lookAt(0, 0, 0);

    this.points.push(new THREE.Vector3(-10, 0, 0));
    this.points.push(new THREE.Vector3(0, 10, 0));
    this.points.push(new THREE.Vector3(10, 0, 0));

    this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
    this.line = new THREE.Line(this.geometry, this.material);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.divRef()?.nativeElement.appendChild(this.renderer.domElement);

    this.scene.add(this.line);
    this.renderer.setAnimationLoop(() => this.animate());
  }

  animate = () => {
    this.line.rotation.x += 0.01;
    this.line.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  };
}
