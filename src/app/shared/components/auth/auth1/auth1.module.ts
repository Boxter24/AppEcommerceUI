import { NgModule } from '@angular/core';

/*=========================== Shared Module =========================== */
import { SharedModule } from 'src/app/shared/shared.module';

/*=========================== Angular Material =========================== */
import { AngularMaterial } from 'src/app/shared/utils/angularMaterial';

/*================================ Routing =============================== */
import { Auth1RoutingModule } from './auth1.routing';

/*============================== Components ============================== */
import { Auth1Component } from './auth1.component';
import { Login1Component } from './login1/login1.component';
import { Register1Component } from './register1/register1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        Auth1Component,
        Login1Component,
        Register1Component,
    ],
    imports: [
        AngularMaterial,
        Auth1RoutingModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [Auth1Component]
})
export class Auth1Module { }
