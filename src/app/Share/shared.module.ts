import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulos
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';

// Angular Material
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SpinnerComponent} from './spinner/spinner.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatChipsModule} from '@angular/material/chips';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTreeModule} from '@angular/material/tree';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    MatDatepickerModule,
    MatTreeModule,
    MatMenuModule,
    MatGridListModule,
    MatSelectModule,
    CommonModule,
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatChipsModule,MatToolbarModule,
  ],
  exports:[
    MatGridListModule,
    MatMenuModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTreeModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    SpinnerComponent,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatToolbarModule,
  ]
})
export class SharedModule { }
