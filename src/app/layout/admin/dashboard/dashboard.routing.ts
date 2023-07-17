import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListComponent } from 'src/app/shared/components/dashboard/crud/list/list.component';
import { ListResolver } from 'src/app/shared/components/dashboard/crud/list/list.resolvers';
import { EcommerceAdminComponent } from '../ecommerce/ecommerce.admin.component';
import { ComponentEcommerceResolver } from '../ecommerce/ecommerce.admin.resolvers';

export const routes: Routes = [
    {        
        path: '',
        children: [
            {
                path: 'list/:module',
                component: ListComponent,
                loadChildren: () => import("src/app/shared/components/dashboard/crud/list/list.module")
                                .then(m => m.ListComponentModule),
                resolve: {
                    data: ListResolver
                },
            },
            {
                path: 'ecommerce/edit',
                component: EcommerceAdminComponent,
                loadChildren: () => import("src/app/layout/admin/ecommerce/ecommerce.admin.component.module")
                                .then(m => m.EcommerceAdminComponentModule),
                resolve: {
                    data: ComponentEcommerceResolver
                }
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardRoutingModule { }