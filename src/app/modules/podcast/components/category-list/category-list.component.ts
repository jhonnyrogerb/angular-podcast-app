import {Component, Input, ChangeDetectionStrategy, OnInit} from '@angular/core';
import * as gradient from 'random-gradient';
import { ItunesCategory } from '@shared/models/itunes-category.models';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit {

  @Input() categories: ItunesCategory[];
  gradient: any;

  constructor() {
    this.gradient = gradient;
  }

  ngOnInit() {
  }

  trackCategory(index, category) {
    return category ? category.id : undefined;
  }

  randomNumber(): number {
    let min = 1;
    let max = 100;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
