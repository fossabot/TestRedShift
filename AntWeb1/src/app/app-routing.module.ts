import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdvSearchComponent } from './adv-search/adv-search.component';
import { OldSearchComponent } from './old-search/old-search.component';

const routes: Routes = [
  { path: 'advSearch', component: AdvSearchComponent },
  { path:'oldSearch', component: OldSearchComponent},
  { path: '', redirectTo: '/oldSearch', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ] 
  ,exports: [ RouterModule ]
})
export class AppRoutingModule { }
