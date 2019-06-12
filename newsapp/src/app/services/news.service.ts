import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getTopHeadLines() {
    return this.http.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=89a20a43901d404ab8cd1ebb7e3b8804`);
  }
}