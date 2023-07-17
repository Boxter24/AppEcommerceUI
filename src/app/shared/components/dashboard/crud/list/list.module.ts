import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ListComponent } from './list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterial } from 'src/app/shared/utils/angularMaterial';
import { ModalComponent } from '../modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ListComponent,
        ModalComponent
    ],
    imports: [
        SharedModule,
        HttpClientModule,
        AngularMaterial,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [ListComponent]
})
export class ListComponentModule { }
