import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent {
  // Properties
  @ViewChild('searchInput')
  public searchInput!: ElementRef<HTMLInputElement>;

  // Constructor
  constructor(private gifsService: GifsService) {}

  // Methods
  public searchTag(): void {
    // Get value from input
    const termino = this.searchInput.nativeElement.value;

    // Invoke service method
    this.gifsService.searchTag(termino);

    // Clear input
    this.searchInput.nativeElement.value = '';
  }
}
