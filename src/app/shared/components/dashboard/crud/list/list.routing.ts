import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { ListResolver } from './list.resolvers';

export const routes: Routes = [
    {                
        path: 'list/:module',
        component: ListComponent,
        resolve: {
            data: ListResolver
        },
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ListRoutingModule { }