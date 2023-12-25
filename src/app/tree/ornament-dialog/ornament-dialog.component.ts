import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Ornament } from '../ornament/ornament';

@Component({
  selector: 'app-ornament-dialog',
  templateUrl: './ornament-dialog.component.html',
  styleUrl: './ornament-dialog.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrnamentDialogComponent {
  article = inject<Ornament['article']>(DIALOG_DATA);
}
