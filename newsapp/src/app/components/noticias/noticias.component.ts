import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../interfaces/interfaces";

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
})
export class NoticiasComponent implements OnInit {
@Input() news: Article;
@Input() busquedaArray: Article;
@Input() showDefault: boolean;
@Input() showSearch: boolean;
@Input() inFavorites = false;
  constructor() { }

  ngOnInit() {}

}
