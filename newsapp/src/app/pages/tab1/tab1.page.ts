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
    busquedaArray: Article[] = [];
    busqueda = '';
    showbusqueda: boolean = false;
    showtopheadlines: boolean = true;

    constructor(private newsService: NewsService) {
    }

    ngOnInit(): void {
        this.cargarNews();
    }

    loadData(event) {
        console.log(event);
        this.cargarNews(event);
    }

    cargarNews(event?) {
        this.showtopheadlines = true;
        this.newsService.getTopHeadLines().subscribe(resp => {
            console.log('news', resp);

            if (event && resp.articles.length === 0) {
                event.target.disabled = true;
            } else {

                this.news.push(...resp.articles);
            }

            if (event) {
                event.target.complete();
            }
        });
    }

    doRefresh(event) {
        console.log('Begin async operation');
        setTimeout(() => {
            this.showbusqueda = false;
            this.cargarNews();
            event.target.complete();
        }, 2000);
    }

    busquedaNews(event) {
        // if (!this.isSearching) {
        //  this.isSearching = true;
        this.busquedaArray = [];
        // tslint:disable-next-line:triple-equals
        if (event.key === 'Enter') {
            console.log('Busqueda : ', event.target.value);
            this.showbusqueda = true;
            this.busqueda = event.target.value;
            if (this.busqueda.length > 0) {
                this.newsService.getBusqueda(this.busqueda)
                    .subscribe(busqueda => {
                        this.busquedaArray.push(...busqueda.articles);
                        console.log('busquedaArray : ', this.busquedaArray);
                        // this.isSearching = false;
                    });
            } else {
                this.showbusqueda = false;
                this.cargarNews();
            }
        }
    }


}
