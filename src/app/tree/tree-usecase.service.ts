import { Injectable, inject } from '@angular/core';
import { Ornament } from './ornament/ornament';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { DOCUMENT } from '@angular/common';

const ICON_SKEL = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

/**
 * オーナメントの一覧を生成するためのサービス。
 * TreeComponentにDIされる。
 */
@Injectable({
  providedIn: null,
})
export class TreeUsecaseService {
  private http = inject(HttpClient);
  private document = inject(DOCUMENT);
  /** TODO: environment.tsからDIできるようにする */
  viewBoxSize = 800;

  /**
   * QiitaのアドベントカレンダーのRSSを取得して、DOMを返す。
   */
  private async getRss(): Promise<HTMLUnknownElement> {
    /** SSG(Node.js)でDOMParserは利用できないので、AngularのDOCUMENTを利用したパースを行う。 */
    const parse = (xmlString: string) => {
      const template = this.document.createElement('template');
      template.innerHTML = xmlString;
      const feed = template.content.querySelector('feed') as HTMLUnknownElement;
      return feed;
    };
    const FEED_URL = 'https://qiita.com/advent-calendar/2024/angular/feed';
    const source = this.http.get(FEED_URL, { responseType: 'text' });
    const rss = await lastValueFrom(source);
    return parse(rss);
  }

  /**
   * サービスが保持している定数シードから、オーナメントの一覧を計算して返す。
   */
  async getOrnaments(): Promise<Ornament[]> {
    const treePoints = this.getTreePoints();
    const feed = await this.getRss();
    const entries = Array.from(feed.querySelectorAll('entry')).reverse();
    const ornaments = entries.map((entry, i) => {
      const TYPES = ['square', 'circle', 'triangle'] as const;
      const toType = (i: number) => TYPES[i % 3];
      const toFixed = (xy: number) => (xy * this.viewBoxSize).toFixed(1);
      const toArticle = () => {
        const author = entry.querySelector('author name')?.textContent ?? '';
        const title = entry.querySelector('title')?.textContent ?? '';
        const url = entry.querySelector('link')?.getAttribute('href') ?? '';
        return { author, title, url, day: i + 1 };
      };
      const { x, y } = treePoints[i];
      return new Ornament({
        type: toType(i),
        x: toFixed(x),
        y: toFixed(y),
        article: toArticle(),
        icon: ICON_SKEL,
      });
    });
    return ornaments;
  }

  /**
   * 25個のオーナメントの座標を計算して返す。
   */
  private getTreePoints(): { x: number; y: number }[] {
    const levels = 6; // オーナメントの段数
    const baseCount = 2; // 1段目のオーナメントの数
    const spacing = 0.1; // オーナメント間の間隔
    /** 1つ目のオーナメントの座標から、一段分のオーナメントの座標を計算する。 */
    const calcStep = (startX: number, y: number, count: number) => {
      /** 最下段のオーナメントは、最初と最後のオーナメントを削除して、間隔を広げた中央5つを返す。 */
      const lastStep = (startX: number, y: number, count: number) => {
        const points = Array.from({ length: count }, (_, i) => {
          const x = startX + (i * spacing * 1.16 - spacing / 2);
          return { x, y };
        });
        return points.slice(1, levels);
      };
      if (count > levels) return lastStep(startX, y, count);
      const points = Array.from({ length: count }, (_, i) => {
        const x = startX + i * spacing;
        return { x, y };
      });
      return points;
    };
    const points = Array.from({ length: levels }, (_, level) => {
      const count = baseCount + level;
      const startX = 0.5 - (spacing * (count - 1)) / 2;
      const y = 0.26 + level * 0.09;
      return calcStep(startX, y, count);
    }).flat();
    return points;
  }

  /**
   * アドベントカレンダーのページを開く。
   */
  navigateToAdventCalendar(): void {
    open('https://qiita.com/advent-calendar/2024/angular');
  }
}
