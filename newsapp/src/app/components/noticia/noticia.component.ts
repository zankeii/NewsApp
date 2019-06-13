import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../interfaces/interfaces";
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {ActionSheetController} from '@ionic/angular';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {DataLocalService} from "../../services/data-local.service";
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-noticia',
    templateUrl: './noticia.component.html',
    styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
    @Input() noticia: Article;
    @Input() inFavorites;

    constructor(public toastController: ToastController, private datalocalService: DataLocalService, private socialSharing: SocialSharing, private iab: InAppBrowser, private actionSheetController: ActionSheetController) {
    }

    ngOnInit() {
    }

    openNews() {
        // console.log('News', this.noticia.url);
        const browser = this.iab.create(this.noticia.url, '_system');
    }

    async openMenu() {

        let saveDeleteBtn;

        if (this.inFavorites) {
            saveDeleteBtn = {
                text: 'Delete from favorite',
                icon: 'trash',
                cssClass: 'action-dark',
                handler: () => {
                    console.log('Deleted from favorite');
                    this.datalocalService.deleteNews(this.noticia);
                }
            };
        } else {
            saveDeleteBtn = {
                text: 'Favorite',
                icon: 'star',
                cssClass: 'action-dark',
                handler: () => {
                    console.log('Play clicked');
                    this.datalocalService.saveNews(this.noticia);
                }
            }
        }
        const actionSheet = await this.actionSheetController.create({
            mode: 'md',
            backdropDismiss: false,
            buttons: [{
                text: 'Share',
                icon: 'share',
                cssClass: 'action-dark',
                handler: () => {
                    console.log('Share clicked');
                    this.socialSharing.share(
                        this.noticia.title,
                        this.noticia.source.name,
                        '',
                        this.noticia.url
                    );
                }
            }, saveDeleteBtn,
                {
                    text: 'Cancel',
                    icon: 'close',
                    cssClass: 'action-dark',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }]
        });
        await actionSheet.present();
    }

}
