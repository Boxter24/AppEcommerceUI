import { NgModule } from '@angular/core';

/*=========================== Shared Module =========================== */
import { SharedModule } from 'src/app/shared/shared.module';

/*================================ Routing =============================== */

/*============================== Components ============================== */
import { Navbar1Component } from './navbar1.component';
import { Navbar1RoutingModule } from './navbar1.routing';

@NgModule({
    declarations: [
        Navbar1Component
    ],
    imports: [
        SharedModule,
        Navbar1RoutingModule,
    ],
    providers: [],
    bootstrap: [Navbar1Component]
})
export class Navbar1Module { }
