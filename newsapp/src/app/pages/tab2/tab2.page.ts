import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSegment} from '@ionic/angular';
import {NewsService} from "../../services/news.service";
import {Article} from "../../interfaces/interfaces";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment) segment: IonSegment;
  categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  news: Article[] = [];
  constructor(private newsService: NewsService) {}

  ngOnInit()  {
    this.segment.value = this.categories[0];
    this.cargarNews(this.segment.value);
  }

  categoryChange(event) {
    this.news = [];
    this.cargarNews(event.detail.value);
  }

  cargarNews(category: string, event?) {
    this.newsService.getTopHeadLinesCategory(category).subscribe(resp => {
      console.log(resp);
      this.news.push(...resp.articles);
    });
  }

  loadData(event) {
    this.cargarNews(this.segment.value, event);
  }
}
