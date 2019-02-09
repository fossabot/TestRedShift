import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdvSearchComponent } from './adv-search/adv-search.component';
import { OldSearchComponent } from './old-search/old-search.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'advSearch', component: AdvSearchComponent },
  { path:'oldSearch', component: OldSearchComponent},
  { path: 'about',component: AboutComponent},
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
