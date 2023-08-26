import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  // Constructor
  constructor(private gifsService: GifsService) {}

  // Getters
  public get tags() {
    return this.gifsService.tagsHistory;
  }

  public searchTag(tag: string): void {
    this.gifsService.searchTag(tag);
  }
}
