import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RespuestaTopHeadLine} from '../interfaces/interfaces';
import {environment} from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({'X-Api-Key': apiKey});

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    constructor(private http: HttpClient) {
    }

    private ejecutarQuery<T>(query: string) {
        query = apiUrl + query;
        return this.http.get<T>(query, {headers});
    }

    getTopHeadLines() {
        return this.ejecutarQuery<RespuestaTopHeadLine>(`/top-headlines?country=us`);
        // tslint:disable-next-line:max-line-length
        // return this.http.get<RespuestaTopHeadLine>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=89a20a43901d404ab8cd1ebb7e3b8804`);
    }

    getTopHeadLinesCategory(category: string) {
        // https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=89a20a43901d404ab8cd1ebb7e3b8804
        return this.ejecutarQuery<RespuestaTopHeadLine>(`/top-headlines?country=us&category=${category}`);
    }
}
