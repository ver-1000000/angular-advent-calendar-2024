import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  HostListener,
  Input,
  inject,
  numberAttribute,
} from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { OrnamentDialogComponent } from '../ornament-dialog/ornament-dialog.component';

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
  private cdr = inject(ChangeDetectorRef);
  @Input({ required: true, transform: numberAttribute }) x!: number;
  @Input({ required: true, transform: numberAttribute }) y!: number;
  @Input() type: 'square' | 'circle' | 'triangle' = 'circle';
  @Input() fill = '#fff';
  @Input() day = 0;
  @Input() link = '';
  @Input() author = '';
  @Input() title = '';
  @HostBinding('class.disabled') get disabled() {
    return !this.link;
  }

  @HostListener('click', ['$event']) onClick(_: MouseEvent) {
    if (this.disabled) return;
    const data = {
      title: this.title,
      link: this.link,
      author: this.author,
      day: this.day,
      accsentColor: this.fill,
    } as const;
    this.dialog.open(OrnamentDialogComponent, { data });
    this.cdr.markForCheck();
  }
}
