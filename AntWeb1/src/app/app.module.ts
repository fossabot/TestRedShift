import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatAccordion, MatExpansionModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatGridListModule, MatInputModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSliderModule, MatTooltipModule, MatTabsModule, MatTableModule, MatStepperModule, MatSortModule, MatSnackBarModule, MatSlideToggleModule, MatTreeModule } from '@angular/material';
import { TitleComponent } from './title/title.component';
import { PeriodSearcherComponent } from './period-searcher/period-searcher.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PeriodService } from './services/period.service';
import { CountriesSearcherComponent } from './countries-searcher/countries-searcher.component';
import { PublishSearcherComponent } from './publish-searcher/publish-searcher.component';
import { MovementSearcherComponent } from './movement-searcher/movement-searcher.component';
import { AppRoutingModule } from './app-routing.module';
import { AdvSearchComponent } from './adv-search/adv-search.component';
import { OldSearchComponent } from './old-search/old-search.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatTreeHDComponent } from './mat-tree-hd/mat-tree-hd.component';
import { AboutComponent } from './about/about.component';
import { VersionsNetcoreAngularModule} from 'versions-netcore-angular';
import { AdvSearchNewComponent } from './adv-search-new/adv-search-new.component';
import { CountryNewComponent } from './country-new/country-new.component';
import { Subject } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    TitleComponent,
    PeriodSearcherComponent,
    CountriesSearcherComponent,
    PublishSearcherComponent,
    MovementSearcherComponent,
    AdvSearchComponent,
    OldSearchComponent,
    MatTreeHDComponent,
    AboutComponent,
    AdvSearchNewComponent,
    CountryNewComponent,
  ],
  imports: [
    VersionsNetcoreAngularModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
     HttpClientModule,
     MatAutocompleteModule,
     MatBadgeModule,
     MatBottomSheetModule,
     MatButtonModule,
     MatButtonToggleModule,
     MatCardModule,
     MatCheckboxModule,
     MatChipsModule,
     MatDatepickerModule,
     MatDialogModule,
     MatDividerModule,
     MatExpansionModule,
     MatGridListModule,
     MatIconModule,
     MatInputModule,
     MatListModule,
     MatMenuModule,
     MatNativeDateModule,
     MatPaginatorModule,
     MatProgressBarModule,
     MatProgressSpinnerModule,
     MatRadioModule,
     MatRippleModule,
     MatSelectModule,
     MatSidenavModule,
     MatSliderModule,
     MatSlideToggleModule,
     MatSnackBarModule,
     MatSortModule,
     MatStepperModule,
     MatTableModule,
     MatTabsModule,
     MatToolbarModule,
     MatTooltipModule,
     MatTreeModule,
     AppRoutingModule,
     ScrollingModule
     
  ],
  exports:[ScrollingModule],
  providers: [PeriodService, Subject],
  bootstrap: [AppComponent]
})
export class AppModule { }
