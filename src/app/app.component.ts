import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BackgroundComponent } from './background/background.component';
import { TreeComponent } from './tree/tree.component';
import { TitleComponent } from './title/title.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [TreeComponent, TitleComponent, BackgroundComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
