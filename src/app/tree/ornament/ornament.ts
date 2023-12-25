/** クリスマスツリーのオーナメント(飾り)を表すクラス。 */
export class Ornament {
  /** 最後に生成されたID。 このIDを基にインクリメントされた新しいIDが発行される。 */
  static lastId = 0;
  /** オーナメントのユニークID。 */
  readonly id!: number;
  /** オーナメントのx座標。 飾り紐の頂点のx座標を表す。 */
  readonly x!: string;
  /** オーナメントのy座標。 飾り紐の頂点のy座標を表す。 */
  readonly y!: string;
  /** オーナメントのアイコン画像のURL。 */
  readonly icon!: string;
  /** オーナメントの形状。 */
  readonly type!: 'square' | 'circle' | 'triangle';
  /** オーナメントからアクセスできる記事情報。 */
  readonly article!: {
    author: string;
    title: string;
    url: string;
    day: number;
  };

  constructor(args: Omit<Ornament, 'id'>) {
    Object.assign(this, args);
    this.id = ++Ornament.lastId;
  }
}
