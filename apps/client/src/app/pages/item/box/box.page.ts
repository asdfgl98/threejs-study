import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-box',
  templateUrl: './box.page.html',
  styleUrls: ['./box.page.css'],
  imports: [CommonModule],
})
export default class BoxPage implements AfterViewInit {
  divRef = viewChild<ElementRef<HTMLDivElement>>('divRef');

  /**
   * Threejs를 렌더링 하기 위해서 필요한 요소 3가지
   * 1. scene: 3D 공간
   * 2. camera: 3D 공간을 바라보는 카메라
   * 3. renderer: 3D 공간을 렌더링하는 렌더러
   */

  scene = new THREE.Scene();

  /**
   * camera
   * 첫번째 속성 : FOV(Field Of View) FOV는 특정 순간에 디스플레이에 표시되는 장면의 범위를 나타냄 값은 도(°) 단위
   * 두번째 속성 : aspect ratio 요소의 너비를 높이로 나눈 값을 사용하는 것이 좋음.
   *            그렇지 않으면 와이드스크린 TV에서 오래된 영화를 재생할 때와 같은 결과, 즉 이미지가 뭉개져 보임.
   * 세 ~ 네 번째 속성 : 다음 두 속성은 클리핑 평면 near과 far클리핑 평면.
   *                  즉, 카메라에서 값보다 멀리 떨어져 있거나 far값보다 가까이 있는 객체 near는 렌더링되지 않음.
   *                  지금은 이 점에 대해 걱정할 필요는 없지만, 앱에서 더 나은 성능을 얻으려면 다른 값을 사용하는 것이 좋음
   */
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  /**
   * renderer
   * 렌더러 인스턴스를 생성하는 것 외에도 앱을 렌더링할 크기를 설정해야함
   * 앱으로 채울 영역의 너비와 높이를 사용하는 것이 좋음
   * 이 경우 브라우저 창의 너비와 높이를 사용
   * 성능이 중요한 앱의 경우, <div> 처럼 더 작은 값을 지정할 수있음
   * window.innerWidth/2 window.innerHeight/2 -> 이렇게 하면 앱 setSize가 4분의 1 크기로 렌더링
   */

  renderer = new THREE.WebGLRenderer();

  /**
   * 정육면체 생성
   */
  geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  cube = new THREE.Mesh(this.geometry, this.material);

  ngAfterViewInit() {
    this.init();
  }

  init() {
    /**
     * renderer 설정
     * 앱 크기는 유지하되 해상도를 낮추려면 세 번째 인수 에 setSize: false를 지정하여 호출
     * 예를 들어, <canvas>의 너비와 높이가 100%일 때, 는 앱을 절반 해상도로 렌더링
     *
     * - document.body.appendChild(this.renderer.domElement);
     * 마지막으로, rendererHTML 문서에 요소를 추가 이 요소는 렌더러가 장면을 표시하는 데 사용하는 <canvas> 요소
     */
    this.renderer.setSize(window.innerWidth, window.innerHeight); // renderer 설정
    this.divRef()?.nativeElement.appendChild(this.renderer.domElement);
    this.scene.add(this.cube);

    this.camera.position.z = 5;
    this.renderer.setAnimationLoop(() => this.animate());
  }

  animate = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  };
}
