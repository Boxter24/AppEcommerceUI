import { NgModule } from '@angular/core';

/*=========================== Shared Module =========================== */
import { SharedModule } from 'src/app/shared/shared.module';

/*================================ Routing =============================== */

/*============================== Components ============================== */
import { Section1Component } from './section1.component';
import { Loader1Component } from '../../loaders/loader1/loader1.component';

@NgModule({
    declarations: [
        Section1Component,
        Loader1Component
    ],
    imports: [
        SharedModule
    ],
    providers: [],
    bootstrap: [Section1Component]
})
export class Section1Module { }
