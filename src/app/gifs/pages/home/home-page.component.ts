import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  // Contructor
  constructor(private gifsService: GifsService) {}

  // Getters
  public get gifs(): Gif[] {
    return this.gifsService.gifs;
  }

  public get loadingGifs(): boolean {
    return this.gifsService.loadingGifs;
  }
}
