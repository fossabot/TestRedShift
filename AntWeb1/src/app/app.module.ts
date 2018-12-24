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
  ],
  imports: [
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
     
  ],
  providers: [PeriodService],
  bootstrap: [AppComponent]
})
export class AppModule { }
