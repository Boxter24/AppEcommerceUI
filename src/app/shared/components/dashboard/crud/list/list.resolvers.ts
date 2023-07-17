import { Type } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { CrudService } from 'src/app/shared/services/crud.service';
import { findElement } from 'src/app/shared/utils/jsons/data.crud.json';

@Injectable({
    providedIn: 'root'
})
export class ListResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _crudService: CrudService, private router: Router)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Type[] | [Type[], Type[]]>
    {
        let keyModule = route.params['module'].replace('/dashboard/list/','');
        
        let relation = findElement(keyModule)?.relation;

        if(relation){
            return forkJoin([
                this._crudService.getDataArrayRelations(relation!),
                this._crudService.getDataArray(route.params['module'])
            ])
        }

        return this._crudService.getDataArray(route.params['module']);
    }
}