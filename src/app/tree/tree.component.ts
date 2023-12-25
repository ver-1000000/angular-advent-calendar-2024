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
  standalone: true,
  imports: [OrnamentComponent],
  providers: [TreeUsecaseService],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeComponent {
  private treeUsecaseService = inject(TreeUsecaseService);
  ornaments = signal<Ornament[]>([]);

  async ngOnInit(): Promise<void> {
    this.updateOrnaments();
  }

  /**
   * ユースケースを利用して、
   * コンポーネントが保持するステート(`this.ornaments`)の更新を行う。
   *
   * 初期化時に呼ばれる。
   */
  private updateOrnaments(): void {
    const ornaments = this.treeUsecaseService.getOrnaments();
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
