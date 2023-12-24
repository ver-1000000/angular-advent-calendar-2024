import { Injectable } from '@angular/core';

/** 取得した記事情報をアプリケーションで表示できるようにするためのクラス。 */
class Article {
  title!: string;
  url!: string;
  qiitaName!: string;
  constructor([title, url, qiitaName]: (undefined | string)[] = []) {
    this.title = title ?? '';
    this.url = url ?? '';
    this.qiitaName = qiitaName ?? '';
  }
}

/** クリスマスツリーのオーナメント(飾り)を表すクラス。 */
class Ornament {
  readonly id!: number;
  readonly x!: string;
  readonly y!: string;
  readonly fill!: string;
  readonly type!: 'square' | 'circle' | 'triangle';
  readonly article!: Article;
  constructor(args: Ornament) {
    Object.assign(this, args);
  }
}

/**
 * オーナメントの座標を決定するためのシード。
 * 数値は座標の割合を表す。
 */
const DELTA_SEED = [
  { xTupple: [0.46, 0.54], y: 0.26 },
  { xTupple: [0.4, 0.5, 0.6], y: 0.35 },
  { xTupple: [0.36, 0.45, 0.55, 0.64], y: 0.44 },
  { xTupple: [0.32, 0.41, 0.5, 0.59, 0.68], y: 0.53 },
  { xTupple: [0.28, 0.36, 0.455, 0.545, 0.64, 0.72], y: 0.62 },
  { xTupple: [0.24, 0.36, 0.5, 0.64, 0.76], y: 0.71 },
] as const;

/**
 * 記事情報のシード。 これを基に記事一覧を計算/生成する。
 * TODO: GitHub Actionsを利用したSSGでRSSフィードを取得して、記事一覧を取得する。
 */
const ARTICLE_SEED: [string, string, string][] = [
  [
    'Angular のテスト環境事情を調べてみた。',
    'https://qiita.com/ic_lifewood/items/817f7ed51440e8d4a368',
    'ic_lifewood',
  ],
  [
    '2024年から始めるAngular Universal (SSR) の本番運用',
    'https://zenn.dev/seapolis/articles/6669b3c1cda5b0',
    'seapolis',
  ],
  [
    'Angular 版 Intro to Storybook の日本語訳を更新して思ったこと',
    'https://zenn.dev/nagashima/articles/156f7ea2caf6f2',
    'ngsmvn',
  ],
  [
    '2年前の自分に送る！べからず集　を書きます',
    'https://zenn.dev/tkawa01/articles/1939b9376f3daa',
    't-kawamura1',
  ],
  [
    'Prettier の Angular サポートの仕組みと built-in control flow 対応',
    'https://zenn.dev/sosukesuzuki/articles/1553af074e5884',
    'sosukesuzuki',
  ],
  [
    '自社アプリのAngularのFolder Structureの変遷と反省',
    'https://qiita.com/KShamoji/items/b236df445cdea49b1eac',
    'KShamoji',
  ],
  [
    'Angular Material の css バンドルサイズを削減しよう！',
    'https://zenn.dev/fusho_takahashi/articles/01ec296a1e726fbacdc0',
    'fusho-takahashi',
  ],
  [
    'Angular ESLintの導入と推しルール6選(2023)',
    'https://zenn.dev/komura_c/articles/9ac623f9519bf9',
    'komura_c',
  ],
  [
    'AngularではじめるSSR入門',
    'https://qiita.com/nishitaku/items/b67e14a08d47447b0c37',
    'nishitaku',
  ],
  [
    'NgOptimizedImageに入門する',
    'https://zenn.dev/hoshima19/articles/31fc0bbb3d916e',
    'hoshima',
  ],
  [
    'Control FlowとViewレンダリング',
    'https://zenn.dev/noxi515/articles/angular-control-flow-rendering',
    'noxi515',
  ],
  [
    'Angularを使ったOSS活動の記録',
    'https://note.com/yamashita_kenngo/n/n8724f0053eef',
    'yamashita-kenngo',
  ],
  [
    'Angular CSP_NONCEによるCSSインジェクション対策',
    'https://tech.quartetcom.co.jp/2023/12/11/angular-csp-nonce/',
    'ringtail003',
  ],
  [
    'NgRxとlocalStorageを同期する',
    'https://qiita.com/masayasviel/items/6b3fa0f458d5259db4c0',
    'masayasviel',
  ],
  [
    'IonicとAngularの最新スタイルへの移行とPageSpeed Insightsによる測定',
    'https://qiita.com/scrpgil/items/8e39804c4256e7fb85a0',
    'scrpgil',
  ],
  [
    'Angular CDKのCdkDialogでダイアログを爆速実装',
    'https://qiita.com/KOHETs/items/cb1d372f63aa6a5e8f7b',
    'KOHETs',
  ],
  [
    '自身が経験したAngular7〜Angular16までの変遷について',
    'https://qiita.com/beltway7/items/e3fd7b770c4ca4f26359',
    'beltway7',
  ],
  [
    'Angular v17 で新しい制御フロー構文がやってきた！マイグレーションコマンドを試してみたよ',
    'https://qiita.com/kozy4324/items/356fd8e2429ae5142641',
    'kozy4324',
  ],
  [
    'Angular 17 の View Transitions API 対応で遊んでみた',
    'https://zenn.dev/rch850/articles/3c214564567e5b',
    'rch850',
  ],
  [
    '[Feature Flag]同じパスを持つ複数のルートを、環境に基づいて変更する',
    'https://zenn.dev/rysiva/articles/feature-flag-with-canmatch',
    'rysiva',
  ],
  [
    'クリーンな美少女エンジニアはComponentも注入💉したい！！',
    'https://qiita.com/nontangent/items/f68470af883e352a2a27',
    'nontangent',
  ],
  [
    'Angularにおける組み込み制御フローの導入とその背景について',
    'https://zenn.dev/carimatics/articles/angular_2023_builtin_control_flow',
    'carimatics',
  ],
  [
    '2023 年に入った Angular のさまざまなアップデート',
    'https://kasaharu.hatenablog.com/entry/20231201/1701381600',
    'kasaharu',
  ],
];

/**
 * オーナメントの一覧を生成するためのサービス。
 * TreeComponentにDIされる。
 */
@Injectable({
  providedIn: null,
})
export class OrnamentsFactoryService {
  /** TODO: environment.tsからDIできるようにする */
  viewBoxSize = 800;

  /** DELTA_SEEDを基に適切なオーナメントを作成するファクトリ関数。 */
  getOrnaments(): Ornament[] {
    const toFixed = (xy: number) => (xy * this.viewBoxSize).toFixed(1);
    const toHSL = (i: number) => `hsl(${i * 195}, 65%, 50%)`;
    const toType = (i: number) => ['square', 'circle', 'triangle'][i % 3];
    const toArticle = (i: number) => new Article(ARTICLE_SEED[i]);
    const deltas = DELTA_SEED.flatMap(({ xTupple, y }) =>
      xTupple.map((x) => ({ x, y })),
    );
    const ornaments = deltas.map(({ x, y }, i) => {
      const article = toArticle(i);
      const fill = article.url ? toHSL(i) : '#777';
      return new Ornament({
        id: i,
        x: toFixed(x),
        y: toFixed(y),
        fill,
        type: toType(i) as Ornament['type'],
        article,
      });
    });
    return ornaments;
  }
}
