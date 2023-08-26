import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchResponde } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  // Properties
  public gifs: Gif[] = [];
  public loadingGifs: boolean = false;
  public offset = 0;
  public total_count = 0;

  private _tagsHistory: string[] = [];
  private GIPHY_API_KEY = '3FBxgGeDGcRd07Tuc2aN4E2QYQqqMAKS';
  private GITPHY_API_URL = 'https://api.giphy.com/v1/gifs';

  // Constructor
  constructor(private http: HttpClient) {
    this.loadLocalStorageTags();
  }

  // Getters
  public get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  // Methods
  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();

    // Remove duplicates
    if (this._tagsHistory.includes(tag)) {
      // Remove tag from history
      this._tagsHistory = this._tagsHistory.filter((t) => t !== tag);
    }

    // Add tag to history
    this._tagsHistory.unshift(tag);

    // limit history to 10
    this._tagsHistory = this.tagsHistory.slice(0, 10);

    // Save in local storage
    this.saveLocalStorageTags();
  }

  public saveLocalStorageTags(): void {
    // Save in local storage
    localStorage.setItem('tagsHistory', JSON.stringify(this._tagsHistory));
  }

  public loadLocalStorageTags(): void {
    // Load from local storage
    const tagsHistory = localStorage.getItem('tagsHistory');

    // Validate tags history
    if (tagsHistory) {
      this._tagsHistory = JSON.parse(tagsHistory);
      if (this._tagsHistory.length > 0) {
        this.gifRequest(this._tagsHistory[0]);
      }
    }
  }

  public searchTag(tag: string): void {
    // Validate tag
    if (tag.trim().length === 0) {
      console.warn('Empty tag');
      return;
    }

    // Organize history
    this.organizeHistory(tag);

    // Invoke API
    this.gifRequest(tag);
  }

  public gifRequest(tag: string): void {
    // Loading gifs
    this.loadingGifs = true;

    this.http
      .get<SearchResponde>(
        `${this.GITPHY_API_URL}/search?api_key=${this.GIPHY_API_KEY}&q=${tag}&limit=10&offset=${this.offset}`
      )
      .subscribe((res) => {
        this.gifs = res.data;
        this.total_count = res.pagination.total_count;

        this.loadingGifs = false;
      });
  }

  public nextPage(): void {
    // Validate offset
    if (this.offset + 10 > this.total_count) {
      return;
    }

    // Increase offset
    this.offset += 10;
    this.gifRequest(this._tagsHistory[0]);
  }

  public previousPage(): void {
    // Validate offset
    if (this.offset > 0) {
      // Decrease offset
      this.offset -= 10;
      this.gifRequest(this._tagsHistory[0]);
    }
  }
}
