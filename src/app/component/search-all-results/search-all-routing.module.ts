import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchAllResultsComponent} from './search-all-results-page/search-all-results.component';

const SearchAllRoutes: Routes = [
  {
    path: '',
    component: SearchAllResultsComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forChild(SearchAllRoutes) ],
  exports: [ RouterModule ]
})
export class SearchAllRoutingModule {}
