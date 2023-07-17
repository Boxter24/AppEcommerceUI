import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatSelectModule,   
        MatTooltipModule, 
        MatRadioModule,   
        MatProgressBarModule, 
        MatProgressSpinnerModule,
        DragDropModule,
        MatMenuModule,
    ],
    exports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatTooltipModule,
        MatRadioModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        DragDropModule,
        MatMenuModule,
    ]
})

export class AngularMaterial {} 
