import { Component, OnInit } from '@angular/core';
import { LanguageService } from './i18n/language.service';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TitleAndMetaTagsService } from './service/title-meta-tags/title-and-meta-tags.service';
import { combineLatest, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  private metasSubject = new Subject <string>();
  private titleSubject = new Subject <any>();

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private translations: TranslateService,
    private titleAndMetaTagsService: TitleAndMetaTagsService,
  ) {}

  ngOnInit(): void {
    this.languageService.setDefaultLanguage();
    this.navigateToStartingPositionOnPage();
    this.initTitle();
    this.initMetas();
    this.installTitleAndMetaInBrowser();
  }

  private navigateToStartingPositionOnPage(): void {
    this.router.events.subscribe(navigationEvent => {
      if (navigationEvent instanceof NavigationEnd) {
        window.scroll(0, 0);
      }
    });
  }

  private initMetas(): void {
    this.translations.onDefaultLangChange.subscribe((elem) => {
    this.metasSubject.next(elem.translations.metas);
  });
}

  private initTitle(): void {
     this.router.events
    .pipe(
     filter((events) => events instanceof NavigationEnd),
     map((events) => (events as any).url.slice(1)),
    )
    .subscribe((nameTitle) => this.titleSubject.next(nameTitle));
}
  private installTitleAndMetaInBrowser(): void {
   combineLatest(
     this.titleSubject,
     this.metasSubject,
   )
     .pipe(
      filter(([title, metas]) => !!(title && metas)),
      map(([title, metas]) => ({nameMeta: metas[title]}))
     )
     .subscribe(({nameMeta }) =>
      this.titleAndMetaTagsService.initTitleAndMeta(nameMeta));
 }

}
