import { Component } from '@angular/core';

class Particle {
  readonly id: number;
  private readonly x: string;
  private readonly y: string;
  private readonly scale: string;
  readonly transform: string;
  constructor(id: number, viewBoxSize: number) {
    this.id = id;
    this.x = (Math.random() * viewBoxSize).toFixed(1);
    this.y = (Math.random() * viewBoxSize).toFixed(1);
    this.scale = (Math.random() * 0.25 + 0.75).toFixed(1);
    this.transform = `translate(${this.x} ${this.y}) scale(${this.scale})`;
  }
}

/**
 * 背景イメージとして利用するSVGを組み立てて描画するためのコンポーネント。
 */
@Component({
  selector: 'app-background',
  standalone: true,
  imports: [],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss',
})
export class BackgroundComponent {
  /** TODO: environment.tsからDIできるようにする */
  readonly viewBoxSize = 800;
  readonly asterisks = [...Array(12)].map((_, i) => new Particle(i, this.viewBoxSize));
  readonly stars = [...Array(12)].map((_, i) => new Particle(i, this.viewBoxSize));
}
