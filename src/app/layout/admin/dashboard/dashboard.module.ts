import { NgModule } from '@angular/core';

/*=========================== Angular Material =========================== */
import { SharedModule } from 'src/app/shared/shared.module';

/*============================== Components ============================== */
import { DashboardComponent } from './dashboard.component';
import { AngularMaterial } from 'src/app/shared/utils/angularMaterial';
import { DashboardRoutingModule } from './dashboard.routing';
import { EcommerceAdminComponent } from '../ecommerce/ecommerce.admin.component';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [        
        AngularMaterial,
        SharedModule,
        DashboardRoutingModule,
    ],
    providers: [],
    bootstrap: [DashboardComponent]
})
export class DashboardModule { }
