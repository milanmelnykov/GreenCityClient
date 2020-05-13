import {Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewChecked, ChangeDetectionStrategy} from '@angular/core';
import { EcoNewsService } from 'src/app/service/eco-news/eco-news.service';
import { Subscription } from 'rxjs';
import { EcoNewsModel } from '../../../model/eco-news/eco-news-model';

declare let Masonry: any;

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NewsListComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('masonryGrid', {static: true}) masonryGrid: ElementRef;

  private view: boolean;
  private iterator: number;
  private gridOutput: Array<string>;
  private ecoNewsSubscription: Subscription;
  private allEcoNews: EcoNewsModel[] = [];
  private elements: EcoNewsModel[] = [];
  public remaining = 0;
  data = [
    {
      creationDate:"2020-04-29T10:57:45.985Z",
      imagePath:"https://storage.cloud.google.com/staging.greencity-c5a3a.appspot.com/d1a22901-e1e2-4bb3-99d5-98ffe672ee90",
      id:230,
      title:"3D-printed corals could improve bioenergy and help coral reefs",
      text:"Researchers from Cambridge University and University of California San Diego have 3D printed coral-inspired structures that are capable of growing dense populations of microscopic algae",
      author:{"id":13,"name":"Taras"},
      tags:["news","ads"]},
    {
      creationDate:"2020-04-29T10:57:45.985Z",
      imagePath:"https://storage.cloud.google.com/staging.greencity-c5a3a.appspot.com/d1a22901-e1e2-4bb3-99d5-98ffe672ee90",
      id:230,
      title:"title",
      text:"Researchers from Cambridge University and University of California San Diego have 3D printed coral-inspired structures that are capable of growing dense populations of microscopic algae",
      author:{"id":13,"name":"Taras"},
      tags:["news","ads"]},
    {
      creationDate:"2020-04-29T10:57:45.985Z",
      imagePath:"https://storage.cloud.google.com/staging.greencity-c5a3a.appspot.com/d1a22901-e1e2-4bb3-99d5-98ffe672ee90",
      id:230,
      title:"title",
      text:"text",
      author:{"id":13,"name":"Taras"},
      tags:["news","ads"]},
    {
      creationDate:"2020-04-29T10:57:45.985Z",
      imagePath:"https://storage.cloud.google.com/staging.greencity-c5a3a.appspot.com/d1a22901-e1e2-4bb3-99d5-98ffe672ee90",
      id:230,
      title:"title",
      text:"text",
      author:{"id":13,"name":"Taras"},
      tags:["news","ads"]},
    {
      creationDate:"2020-04-29T10:57:45.985Z",
      imagePath:"https://storage.cloud.google.com/staging.greencity-c5a3a.appspot.com/d1a22901-e1e2-4bb3-99d5-98ffe672ee90",
      id:230,
      title:"title",
      text:"text",
      author:{"id":13,"name":"Taras"},
      tags:["news","ads"]},
    {
      creationDate:"2020-04-29T10:57:45.985Z",
      imagePath:"https://storage.cloud.google.com/staging.greencity-c5a3a.appspot.com/d1a22901-e1e2-4bb3-99d5-98ffe672ee90",
      id:230,
      title:"title",
      text:"text",
      author:{"id":13,"name":"Taras"},
      tags:["news","ads"]}
  ];

  constructor(private ecoNewsService: EcoNewsService) {}

  ngAfterViewChecked() {
    this.masonryLayout();
  }

  ngOnInit() {
    // this.elements = [...this.data];
    this.ecoNewsService.getEcoNewsList();
    this.fetchAllEcoNews();
  }


  private fetchAllEcoNews(): void {
    this.ecoNewsSubscription = this.ecoNewsService
      .newsListSubject
      .subscribe(this.setAllAndStartingElems.bind(this));
  }

  public onScroll(): void {
    this.addElemsToCurrentList();
  }

  private addElemsToCurrentList(): void {
    const loadingLength = this.allEcoNews.length - this.elements.length > 11 ? 11 :
      this.allEcoNews.length - this.elements.length;

    this.allEcoNews.forEach((element, index) => {
      if (index >= this.iterator && index - this.iterator < loadingLength) {
        this.elements[index] = element;
      }
    });

    this.iterator = this.elements.length;
  }

  private setAllAndStartingElems(data: EcoNewsModel[]): void {
    this.allEcoNews = [...data];
    this.elements = data.splice(0, 12);
    this.iterator = this.elements.length;
    this.remaining = this.allEcoNews.length;
  }

  private changeView(event: boolean): void {
    this.view = event;
  }

  private getFilterData(value: Array<string>): void {
    this.gridOutput = value;
    this.ecoNewsService.getEcoNewsFilteredByTag(value);
  }

  private masonryLayout() {
      new Masonry(this.masonryGrid.nativeElement, {
        itemSelector: '.gallery-view-li-active',
        columnWidth: 30,
        horizontalOrder: true
      });
  }

  ngOnDestroy() {
    this.ecoNewsSubscription.unsubscribe();
  }
}
