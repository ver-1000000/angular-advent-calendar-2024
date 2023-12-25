import { Injectable, inject } from '@angular/core';
import { Ornament } from './ornament/ornament';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { DOCUMENT } from '@angular/common';

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
    const FEED_URL = 'https://qiita.com/advent-calendar/2023/angular/feed';
    const source = this.http.get(FEED_URL, { responseType: 'text' });
    const rss = await lastValueFrom(source);
    return parse(rss);
  }

  /**
   * サービスが保持している定数シードから、オーナメントの一覧を計算して返す。
   */
  async getOrnaments(): Promise<Ornament[]> {
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
      const { x, y } = TREE_POINTS[i];
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
   * アドベントカレンダーのページを開く。
   */
  navigateToAdventCalendar(): void {
    open('https://qiita.com/advent-calendar/2023/angular');
  }
}
