import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterial } from 'src/app/shared/utils/angularMaterial';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { EcommerceAdminComponent } from './ecommerce.admin.component';

@NgModule({
    declarations: [
        EcommerceAdminComponent,
        ModalComponent,
    ],
    imports: [
        SharedModule,
        HttpClientModule,
        AngularMaterial,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [EcommerceAdminComponent]
})
export class EcommerceAdminComponentModule { }
