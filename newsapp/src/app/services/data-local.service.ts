import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Article} from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  news: Article[] = [];

  constructor(private storage: Storage) { }

  saveNews(noticia: Article) {
    const exist = this.news.find(noti => noti.title === noticia.title);
    if (!exist) {
      this.news.unshift(noticia);
      this.storage.set('favorites', this.news);
    }
  }

  cargarFavorites() {

  }
}
