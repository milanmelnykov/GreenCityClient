import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { EcoNewsService } from 'src/app/component/eco-news/services/eco-news.service';
import { Subscription } from 'rxjs';
import { EcoNewsModel } from '../../models/eco-news-model';
import { UserOwnAuthService } from '../../../../service/auth/user-own-auth.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnDestroy {
  private view: boolean;
  private iterator: number;
  private gridOutput: Array<string>;
  private ecoNewsSubscription: Subscription;
  private allEcoNews: EcoNewsModel[] = [];
  private elements: EcoNewsModel[] = [];
  public remaining = 0;
  private isLoggedIn: boolean;

  constructor(private ecoNewsService: EcoNewsService,
              private userOwnAuthService: UserOwnAuthService) { }

  ngOnInit() {
    this.ecoNewsService.getEcoNewsList();
    this.fetchAllEcoNews();
    this.checkUserSingIn();
    this.userOwnAuthService.getDataFromLocalStorage();
  }

  private checkUserSingIn(): void {
    this.userOwnAuthService.credentialDataSubject
      .subscribe((data) => {
        if (data && data.firstSignIn) {
          this.isLoggedIn = data.firstSignIn;
        }
      });
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

  ngOnDestroy() {
    this.ecoNewsSubscription.unsubscribe();
  }
}
