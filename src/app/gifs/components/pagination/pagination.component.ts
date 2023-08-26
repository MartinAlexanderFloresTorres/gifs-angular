import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  constructor(private gifsService: GifsService) {}

  // Getters
  public get offset(): number {
    return this.gifsService.offset;
  }

  public get total_count(): number {
    return this.gifsService.total_count;
  }

  // Methods
  public previousPage(): void {
    this.gifsService.previousPage();
  }

  public nextPage(): void {
    this.gifsService.nextPage();
  }
}
