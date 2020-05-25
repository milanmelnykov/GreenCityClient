import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SearchAllResultsComponent } from './search-all-results-page/search-all-results.component';
import { LayoutModule } from '../layout/layout.module';
import { SearchAllRoutingModule } from './search-all-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    SearchAllResultsComponent
  ],
  imports: [
    SearchAllRoutingModule,
    SharedModule,
    CommonModule,
    LayoutModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      isolate: true
    }),
    InfiniteScrollModule
  ],
  exports: [

  ],
  providers: []
})

export class SearchModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

