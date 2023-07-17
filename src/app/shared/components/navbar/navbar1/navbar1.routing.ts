import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { routes } from 'src/app/app.routing';

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Navbar1RoutingModule { }