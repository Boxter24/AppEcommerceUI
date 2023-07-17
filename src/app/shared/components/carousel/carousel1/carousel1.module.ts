import { NgModule } from '@angular/core';

/*=========================== Shared Module =========================== */
import { SharedModule } from 'src/app/shared/shared.module';

/*================================ Routing =============================== */

/*============================== Components ============================== */
import { Carousel1Component } from './carousel1.component';

@NgModule({
    declarations: [
        Carousel1Component,
    ],
    imports: [
        SharedModule
    ],
    providers: [],
    bootstrap: [Carousel1Component]
})
export class Carousel1Module { }
