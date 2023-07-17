import { NgModule } from '@angular/core';

/*=========================== Shared Module =========================== */
import { SharedModule } from 'src/app/shared/shared.module';

/*================================ Routing =============================== */

/*============================== Components ============================== */
import { Footer1Component } from './footer1.component';


import { AngularMaterial } from 'src/app/shared/utils/angularMaterial';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        Footer1Component
    ],
    imports: [
        SharedModule,
        AngularMaterial,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [Footer1Component]
})
export class Footer1Module { }
