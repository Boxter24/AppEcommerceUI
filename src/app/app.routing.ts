import { EcommerceComponent } from 'src/app/layout/user/ecommerce/ecommerce.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './layout/auth/auth.component';
import { DashboardComponent } from './layout/admin/dashboard/dashboard.component';
import { ComponentEcommerceResolver } from './layout/admin/ecommerce/ecommerce.admin.resolvers';

export const routes: Routes = [
    {        
        path: '',
        children: [
            {
                path: '',
                component: EcommerceComponent,
                resolve:{
                    data: ComponentEcommerceResolver,
                }
            },
            {
                path: 'login',
                component: AuthComponent,
            },
            {
                path: 'register',
                component: AuthComponent,
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                loadChildren: () => import("src/app/layout/admin/dashboard/dashboard.module")
                                .then(m => m.DashboardModule)
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }