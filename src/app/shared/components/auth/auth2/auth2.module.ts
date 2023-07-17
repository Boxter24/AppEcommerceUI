import { NgModule } from '@angular/core';

/*=========================== Angular Material =========================== */
import { AngularMaterial } from 'src/app/shared/utils/angularMaterial';

/*================================ Icons ================================= */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/*================================ Routing =============================== */

import { Auth2RoutingModule } from './auth2.routing';

/*============================== Components ============================== */
import { SharedModule } from 'src/app/shared/shared.module';
import { Auth2Component } from './auth2.component';

@NgModule({
    declarations: [
],
    imports: [
        AngularMaterial,
        FontAwesomeModule,
        Auth2RoutingModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [Auth2Component]
})
export class Auth2Module { }
