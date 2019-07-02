import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Article} from "../interfaces/interfaces";

@Injectable({
    providedIn: 'root'
})
export class DataLocalService {

    news: Article[] = [];

    constructor(private storage: Storage) {
        this.getSaved();
    }

    saveNews(noticia: Article) {
        const exist = this.news.find(noti => noti.title === noticia.title);
        if (!exist) {
            this.news.unshift(noticia);
            this.storage.set('saved', this.news);
        }
    }

    async getSaved() {
        const saved = await this.storage.get('saved');
        if (saved) {
            this.news = saved;
        }

    }

    deleteNews(noticia: Article){
        this.news = this.news.filter(noti => noti.title !== noticia.title);
        this.storage.set('favorites', this.news);
    }
}
