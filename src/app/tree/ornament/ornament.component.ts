import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
  inject,
} from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { OrnamentDialogComponent } from '../ornament-dialog/ornament-dialog.component';
import { Ornament } from './ornament';

const VIEW_BOX_SIZE = 800;
const STROKE_WIDTH = 800 / 160;
const STROKE_LENGTH = STROKE_WIDTH * 2;

class Circle {
  r!: string;
  cx!: string;
  cy!: string;
  constructor({ x, y }: Ornament) {
    const r = VIEW_BOX_SIZE / 40;
    this.r = r.toFixed(1);
    this.cx = x;
    this.cy = (Number(y) + STROKE_LENGTH + r).toFixed(1);
  }
}

class Square {
  size!: number;
  x!: number;
  y!: number;
  constructor({ x, y }: Ornament) {
    this.size = VIEW_BOX_SIZE / 20;
    this.x = Number(x) - this.size / 2;
    this.y = Number(y) + STROKE_LENGTH;
  }
}

class Triangle {
  points!: string;
  constructor({ x, y }: Ornament) {
    const w = VIEW_BOX_SIZE / 20;
    const h = VIEW_BOX_SIZE / 20;
    const originY = Number(y) + STROKE_LENGTH;
    const points = [
      [x, originY],
      [Number(x) - w / 2, originY + h],
      [Number(x) + w / 2, originY + h],
    ];
    this.points = points.map((p) => p.join(',')).join(' ');
  }
}

/**
 * Ornamentを入力された際に、それを元にしてViewに必要な情報を計算する。
 */
class ViewModel {
  readonly ornament!: Ornament;
  readonly type!: Ornament['type'];
  readonly patternId!: string;
  readonly connectorD!: string;
  readonly imageSize!: string;
  readonly imageDelta!: string;
  readonly imageHref!: string;
  readonly day!: number;
  readonly dayX!: number;
  readonly dayY!: number;
  readonly circle!: Circle;
  readonly square!: Square;
  readonly triangle!: Triangle;
  constructor(ornament: Ornament) {
    this.ornament = ornament;
    this.type = ornament.type;
    this.patternId = `ornament-pattern-${ornament.id}`;
    this.connectorD = `m ${ornament.x},${ornament.y} v ${STROKE_LENGTH}`;
    this.imageSize = (VIEW_BOX_SIZE / 12.5).toFixed(1);
    this.imageDelta = (VIEW_BOX_SIZE * -0.015).toFixed(1);
    this.imageHref = ornament.icon;
    this.day = ornament.article.day;
    this.dayX = Number(ornament.x);
    this.dayY =
      Number(ornament.y) +
      STROKE_LENGTH +
      VIEW_BOX_SIZE / (this.type === 'triangle' ? 25 : 40);
    this.circle = new Circle(ornament);
    this.square = new Square(ornament);
    this.triangle = new Triangle(ornament);
  }
}

function transformViewModel(ornament: Ornament) {
  return new ViewModel(ornament);
}

/**
 * {@link TreeComponent}から利用される、クリスマスツリーのオーナメント(飾り)を表すコンポーネント。
 */
@Component({
  selector: '[app-ornament]',
  standalone: true,
  imports: [],
  templateUrl: './ornament.component.html',
  styleUrl: './ornament.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrnamentComponent {
  private dialog = inject(Dialog);
  @Input({ required: true, alias: 'ornament', transform: transformViewModel })
  vm!: ViewModel;

  @HostBinding('class.disabled') get disabled() {
    return !this.vm.ornament.article.url;
  }

  @HostListener('click', ['$event']) onClick(_: MouseEvent) {
    if (this.disabled) return;
    const data: Ornament['article'] = this.vm.ornament.article;
    this.dialog.open(OrnamentDialogComponent, { data });
  }
}
