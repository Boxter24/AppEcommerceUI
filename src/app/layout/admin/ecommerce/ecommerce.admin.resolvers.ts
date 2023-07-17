
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ComponentEcommerce } from 'src/app/shared/models/component.model';
import { PreferencesService } from 'src/app/shared/services/preferences.service';

@Injectable({
    providedIn: 'root'
})
export class ComponentEcommerceResolver implements Resolve<ComponentEcommerce[]>
{
    /**
     * Constructor
     */
    constructor(private _preferences: PreferencesService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ComponentEcommerce[]>
    {
        return this._preferences.getListComponent();
    }
}