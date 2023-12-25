import { Injectable } from '@angular/core';
import { Ornament } from './ornament/ornament';

/**
 * オーナメントの座標を決定するためのシード。
 * 数値は座標の割合を表す。
 */
const TREE_POINTS = [
  // 1段目
  { x: 0.46, y: 0.26 },
  { x: 0.54, y: 0.26 },
  // 2段目
  { x: 0.4, y: 0.35 },
  { x: 0.5, y: 0.35 },
  { x: 0.6, y: 0.35 },
  // 3段目
  { x: 0.36, y: 0.44 },
  { x: 0.45, y: 0.44 },
  { x: 0.55, y: 0.44 },
  { x: 0.64, y: 0.44 },
  // 4段目
  { x: 0.32, y: 0.53 },
  { x: 0.41, y: 0.53 },
  { x: 0.5, y: 0.53 },
  { x: 0.59, y: 0.53 },
  { x: 0.68, y: 0.53 },
  // 5段目
  { x: 0.28, y: 0.62 },
  { x: 0.36, y: 0.62 },
  { x: 0.455, y: 0.62 },
  { x: 0.545, y: 0.62 },
  { x: 0.64, y: 0.62 },
  { x: 0.72, y: 0.62 },
  // 6段目
  { x: 0.24, y: 0.71 },
  { x: 0.36, y: 0.71 },
  { x: 0.5, y: 0.71 },
  { x: 0.64, y: 0.71 },
  { x: 0.76, y: 0.71 },
];

/**
 * 記事情報のシード。 これを基に記事一覧を計算/生成する。
 * TODO: GitHub Actionsを利用したSSGでRSSフィードを取得して、記事一覧を取得する。
 */
const ARTICLE_SEED: [string, string, string][] = [
  [
    'ic_lifewood',
    'Angular のテスト環境事情を調べてみた。',
    'https://qiita.com/ic_lifewood/items/817f7ed51440e8d4a368',
  ],
  [
    'seapolis',
    '2024年から始めるAngular Universal (SSR) の本番運用',
    'https://zenn.dev/seapolis/articles/6669b3c1cda5b0',
  ],
  [
    'ngsmvn',
    'Angular 版 Intro to Storybook の日本語訳を更新して思ったこと',
    'https://zenn.dev/nagashima/articles/156f7ea2caf6f2',
  ],
  [
    't-kawamura1',
    '2年前の自分に送る！べからず集　を書きます',
    'https://zenn.dev/tkawa01/articles/1939b9376f3daa',
  ],
  [
    'sosukesuzuki',
    'Prettier の Angular サポートの仕組みと built-in control flow 対応',
    'https://zenn.dev/sosukesuzuki/articles/1553af074e5884',
  ],
  [
    'KShamoji',
    '自社アプリのAngularのFolder Structureの変遷と反省',
    'https://qiita.com/KShamoji/items/b236df445cdea49b1eac',
  ],
  [
    'fusho-takahashi',
    'Angular Material の css バンドルサイズを削減しよう！',
    'https://zenn.dev/fusho_takahashi/articles/01ec296a1e726fbacdc0',
  ],
  [
    'komura_c',
    'Angular ESLintの導入と推しルール6選(2023)',
    'https://zenn.dev/komura_c/articles/9ac623f9519bf9',
  ],
  [
    'nishitaku',
    'AngularではじめるSSR入門',
    'https://qiita.com/nishitaku/items/b67e14a08d47447b0c37',
  ],
  [
    'hoshima',
    'NgOptimizedImageに入門する',
    'https://zenn.dev/hoshima19/articles/31fc0bbb3d916e',
  ],
  [
    'noxi515',
    'Control FlowとViewレンダリング',
    'https://zenn.dev/noxi515/articles/angular-control-flow-rendering',
  ],
  [
    'yamashita-kenngo',
    'Angularを使ったOSS活動の記録',
    'https://note.com/yamashita_kenngo/n/n8724f0053eef',
  ],
  [
    'ringtail003',
    'Angular CSP_NONCEによるCSSインジェクション対策',
    'https://tech.quartetcom.co.jp/2023/12/11/angular-csp-nonce/',
  ],
  [
    'masayasviel',
    'NgRxとlocalStorageを同期する',
    'https://qiita.com/masayasviel/items/6b3fa0f458d5259db4c0',
  ],
  [
    'scrpgil',
    'IonicとAngularの最新スタイルへの移行とPageSpeed Insightsによる測定',
    'https://qiita.com/scrpgil/items/8e39804c4256e7fb85a0',
  ],
  [
    'KOHETs',
    'Angular CDKのCdkDialogでダイアログを爆速実装',
    'https://qiita.com/KOHETs/items/cb1d372f63aa6a5e8f7b',
  ],
  [
    'beltway7',
    '自身が経験したAngular7〜Angular16までの変遷について',
    'https://qiita.com/beltway7/items/e3fd7b770c4ca4f26359',
  ],
  [
    'kozy4324',
    'Angular v17 で新しい制御フロー構文がやってきた！マイグレーションコマンドを試してみたよ',
    'https://qiita.com/kozy4324/items/356fd8e2429ae5142641',
  ],
  [
    'rch850',
    'Angular 17 の View Transitions API 対応で遊んでみた',
    'https://zenn.dev/rch850/articles/3c214564567e5b',
  ],
  [
    'rysiva',
    '[Feature Flag]同じパスを持つ複数のルートを、環境に基づいて変更する',
    'https://zenn.dev/rysiva/articles/feature-flag-with-canmatch',
  ],
  [
    'nontangent',
    'クリーンな美少女エンジニアはComponentも注入💉したい！！',
    'https://qiita.com/nontangent/items/f68470af883e352a2a27',
  ],
  [
    'carimatics',
    'Angularにおける組み込み制御フローの導入とその背景について',
    'https://zenn.dev/carimatics/articles/angular_2023_builtin_control_flow',
  ],
  [
    'kasaharu',
    '2023 年に入った Angular のさまざまなアップデート',
    'https://kasaharu.hatenablog.com/entry/20231201/1701381600',
  ],
  [
    'ver1000000 ',
    '𝓗𝓪𝓹𝓹𝔂 𝓜𝓮𝓻𝓻𝔂 𝓒𝓱𝓻𝓲𝓼𝓽𝓶𝓪𝓼...',
    'https://qiita.com/ver1000000/items/36154cb31a3bdba1a51d',
  ],
  [
    'lacolaco ',
    'Angularでのボタンコンポーネントの作成',
    'https://zenn.dev/lacolaco/articles/angular-advent-calendar-2023',
  ],
];

const ICON_SKEL = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

/**
 * オーナメントの一覧を生成するためのサービス。
 * TreeComponentにDIされる。
 */
@Injectable({
  providedIn: null,
})
export class TreeUsecaseService {
  /** TODO: environment.tsからDIできるようにする */
  viewBoxSize = 800;

  /**
   * サービスが保持している定数シードから、オーナメントの一覧を計算して返す。
   */
  getOrnaments(): Ornament[] {
    const toType = (i: number) => ['square', 'circle', 'triangle'][i % 3];
    const toFixed = (xy: number) => (xy * this.viewBoxSize).toFixed(1);
    const ornaments = TREE_POINTS.map(({ x, y }, i) => {
      const article = this.getArticle(i);
      return new Ornament({
        type: toType(i) as Ornament['type'],
        x: toFixed(x),
        y: toFixed(y),
        article,
        icon: ICON_SKEL,
      });
    });
    return ornaments;
  }

  /**
   * サービスが保持している定数シードから、n番目の記事情報をOrnament['article']の形で返す。
   */
  private getArticle(n: number): Ornament['article'] {
    const [author, title, url] = ARTICLE_SEED[n];
    const day = n + 1;
    return { author, title, url, day };
  }

  /**
   * アドベントカレンダーのページを開く。
   */
  navigateToAdventCalendar(): void {
    open('https://qiita.com/advent-calendar/2023/angular');
  }
}
