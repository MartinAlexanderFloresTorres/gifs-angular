import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css'],
})
export class LazyImageComponent implements OnInit {
  @Input()
  public src!: string;

  @Input()
  public alt!: string;

  public isLoaded = false;

  ngOnInit(): void {
    if (!this.src) {
      throw new Error('Attribute url is required');
    }

    if (!this.alt) {
      throw new Error('Attribute alt is required');
    }
  }

  public onLoad(): void {
    this.isLoaded = true;
  }
}
