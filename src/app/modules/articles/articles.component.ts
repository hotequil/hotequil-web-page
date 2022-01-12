import { Component } from '@angular/core';

import { Article } from "../../shared/models/articles/article";

@Component({
    selector: 'h-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {
    list: Article[] = [
        {
            name: "Improve your application performance in Angular (3 tips)",
            link: "./assets/articles/angular-improve-performance.pdf",
            date: new Date(2022, 0, 10)
        }
    ];
}