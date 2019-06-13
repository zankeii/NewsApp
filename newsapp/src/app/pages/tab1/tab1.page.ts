import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../services/news.service';
import {Article} from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  news: Article[] = [];
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getTopHeadLines().subscribe(resp => {
      console.log('news', resp);
      this.news.push(...resp.articles);
    });
  }
}
