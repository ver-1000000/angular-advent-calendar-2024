import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { OrnamentComponent } from './ornament/ornament.component';
import { TreeUsecaseService } from './tree-usecase.service';
import { Ornament } from './ornament/ornament';

/**
 * クリスマスツリーオブジェクトを表すSimple-PDSコンポーネント。
 * トップページから呼び出され、ユースケースのロジックから自律的にオーナメントを生成する。
 *
 * オーナメントは一覧され、それぞれの記事詳細へのリンクを提供する。
 */
@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
  imports: [OrnamentComponent],
  providers: [TreeUsecaseService],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent {
  private treeUsecaseService = inject(TreeUsecaseService);
  ornaments = signal<Ornament[]>([]);

  ngOnInit(): void {
    this.setOrnaments();
  }

  /**
   * ユースケースを利用して、
   * コンポーネントが保持するステート(`this.ornaments`)を更新する。
   */
  private async setOrnaments(): Promise<void> {
    const ornaments = await this.treeUsecaseService.getOrnaments();
    this.ornaments.set(ornaments);
  }

  /**
   * ユースケースを利用して、アドベントカレンダーのページを開く。
   *
   * 星オーナメントをクリックしたときに呼ばれる。
   */
  navigateToAdventCalendar(): void {
    this.treeUsecaseService.navigateToAdventCalendar();
  }
}
