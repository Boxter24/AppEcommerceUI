import { NgModule } from '@angular/core';

/*=========================== Shared Module =========================== */
import { SharedModule } from 'src/app/shared/shared.module';

/*================================ Routing =============================== */

/*============================== Components ============================== */
import { Slider1Component } from './slider1.component';

@NgModule({
    declarations: [
        Slider1Component
    ],
    imports: [
        SharedModule
    ],
    providers: [],
    bootstrap: [Slider1Component]
})
export class Slider1Module { }
