import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

type DialogData = {
  title: string;
  link: string;
  author: string;
  day: number;
  accsentColor: string;
};

@Component({
  selector: 'app-ornament-dialog',
  standalone: true,
  imports: [],
  templateUrl: './ornament-dialog.component.html',
  styleUrl: './ornament-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrnamentDialogComponent {
  data = inject<DialogData>(DIALOG_DATA);
}
