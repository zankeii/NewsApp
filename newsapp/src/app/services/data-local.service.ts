import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Article} from "../interfaces/interfaces";
import {ToastController} from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class DataLocalService {

    news: Article[] = [];

    constructor(private storage: Storage, public toastController: ToastController) {
        this.getFavorites();
    }
    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 1500,
            position: 'bottom'
        });
        toast.present();
    }

    saveNews(noticia: Article) {
        const exist = this.news.find(noti => noti.title === noticia.title);
        if (!exist) {
            this.news.unshift(noticia);
            this.storage.set('favorites', this.news);
        }
        this.presentToast('Added to Favorites');
    }

    async getFavorites() {
        const favorites = await this.storage.get('favorites');
        if (favorites) {
            this.news = favorites;
        }

    }

    deleteNews(noticia: Article){
        this.news = this.news.filter(noti => noti.title !== noticia.title);
        this.storage.set('favorites', this.news);
        this.presentToast('Deleted from favorites');
    }
}
