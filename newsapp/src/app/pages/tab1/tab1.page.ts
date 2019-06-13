import {Component, OnInit} from '@angular/core';
import {NewsService} from '../../services/news.service';
import {Article} from '../../interfaces/interfaces';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../../components/popinfo/p';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  news: Article[] = [];
  constructor(private newsService: NewsService, public popoverController: PopoverController) {}
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  ngOnInit(): void {
    this.cargarNews();
  }

  loadData(event) {
    console.log(event);
    this.cargarNews(event);
  }

  cargarNews(event?) {
    this.newsService.getTopHeadLines().subscribe(resp => {
      console.log('news', resp);

      if (resp.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }
      this.news.push(...resp.articles);

      if (event) {
        event.target.complete();
      }
    });
  }

}
