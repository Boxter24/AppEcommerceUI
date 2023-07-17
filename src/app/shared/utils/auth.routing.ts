import { Routes } from "@angular/router";
import { AuthComponent } from "src/app/layout/auth/auth.component";

export const routes: Routes = [
    {
        path: 'auth/login',
        children: [
            {
                path: '',
                // component: AuthComponent,
                redirectTo: 'login',
            },
            {
                path: 'login',
                // component: AuthComponent,
                
            },
            {
                path: 'register',
            }
        ]
    }
]