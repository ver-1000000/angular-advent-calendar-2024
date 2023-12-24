import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OrnamentComponent } from './ornament/ornament.component';
import { OrnamentsFactoryService } from './ornaments-factory.service';

/**
 * トップページで利用される、クリスマスツリーオブジェクトを表すコンポーネント。
 *
 * オーナメントの一覧を表示するUIを有し、それぞれの記事詳細へのリンクを提供する。
 */
@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [OrnamentComponent],
  providers: [OrnamentsFactoryService],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent {
  private ornamentsFactoryService = inject(OrnamentsFactoryService);
  ornaments = this.ornamentsFactoryService.getOrnaments();

  /** 星オーナメントをクリックしたとき、アドベントカレンダーのページを開く。 */
  navigateToAdventCalendar() {
    window.open('https://qiita.com/advent-calendar/2023/angular', '_blank');
  }
}
