import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Article} from "../interfaces/interfaces";

@Injectable({
    providedIn: 'root'
})
export class DataLocalService {

    news: Article[] = [];

    constructor(private storage: Storage) {
        this.getFavorites();
    }

    saveNews(noticia: Article) {
        const exist = this.news.find(noti => noti.title === noticia.title);
        if (!exist) {
            this.news.unshift(noticia);
            this.storage.set('favorites', this.news);
        }
    }

    async getFavorites() {
        const favorites = await this.storage.get('favorites');
        if (favorites) {
            this.news = favorites;
        }

    }
}
