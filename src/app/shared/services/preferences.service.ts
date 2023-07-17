import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ComponentEcommerce } from '../models/component.model';
import { HttpClient } from '@angular/common/http';
import baseUrl from '../utils/api/route-api';
import { DataComponentEcommerce } from '../models/dataComponent.model';

@Injectable({
    providedIn: 'root'
})
export class PreferencesService {
    
    /*===== Variables =====*/
    private _authComponent: BehaviorSubject<number> =
        new BehaviorSubject(1);

    private _listComponents: BehaviorSubject<ComponentEcommerce[] | null> =
        new BehaviorSubject<ComponentEcommerce[] | null>(null);

    array: ComponentEcommerce[] = []

    private _dataListComponent: BehaviorSubject<DataComponentEcommerce[] | null> =
    new BehaviorSubject<DataComponentEcommerce[] | null>(null);

    constructor(
        private _httpClient: HttpClient, 
    ) {}

    /**
        Getter and Setter
    **/
    get authComponent$(): number {
        return this._authComponent.getValue();
    }

    setAuthComponent(componentID: number) {
        this._authComponent.next(componentID);
    }

    get listComponents$(): Observable<ComponentEcommerce[] | null> {
        return this._listComponents.asObservable();
    }

    setListComponents(component: ComponentEcommerce) {
        this.array.push(component)

        this._listComponents.next(this.array);
    }

    get dataListComponent$(): Observable<DataComponentEcommerce[] | null> {
        return this._dataListComponent.asObservable();
    }

    setdataListComponent(dataList: DataComponentEcommerce[]) {
        this._dataListComponent.next(dataList);
    }

    /*
     * Get Data
    */
    getListComponent(): Observable<ComponentEcommerce[]> {
        return this._httpClient
            .get<ComponentEcommerce[]>(
                `${baseUrl}/ecommerce/dashboard/ecommerce-layout/all`,
            )
            .pipe(
                tap((listComponentEcommerce) => {
                    listComponentEcommerce.sort(this.compare);

                    this.array = listComponentEcommerce
                    this._listComponents.next(listComponentEcommerce);
                })
            );
    }

    updateLayout(listComponents: ComponentEcommerce[]): Observable<ComponentEcommerce[]>{
        return this.listComponents$.pipe(
            take(1),
            switchMap((listComponentEcommerce) =>
                this._httpClient
                    .post<ComponentEcommerce[]>(
                        `${baseUrl}/ecommerce/dashboard/ecommerce-layout/update`,
                        listComponents
                    )
                    .pipe(
                        map((newList: any) => {
                            let listComponetsAux = listComponentEcommerce;

                            listComponetsAux!.sort(this.compare);

                            this._listComponents.next(listComponetsAux);

                            // Return the new ListComponent
                            return newList;
                        }
                    )
                )
            )
        )
    }

    updateDataLayout(dataListComponent: {[k: string]: any}): Observable<ComponentEcommerce[]>{
        return this.listComponents$.pipe(
            take(1),
            switchMap((listComponentEcommerce) =>
                this._httpClient
                    .post<ComponentEcommerce[]>(
                        `${baseUrl}/ecommerce/dashboard/ecommerce-layout/data-component/update`,
                        dataListComponent
                    )
                    .pipe(
                        map((newList: any) => {
                            let listComponetsAux = listComponentEcommerce;

                            listComponetsAux!.sort(this.compare);

                            this._listComponents.next(listComponetsAux);

                            // Return the new ListComponent
                            return newList;
                        }
                    )
                )
            )
        )
        // console.log(dataListComponente);
        // return "a"
    }

    /**
     * Order for Index
     */
    compare(a: ComponentEcommerce, b: ComponentEcommerce) {
        if (a.index < b.index) return -1;
        if (a.index > b.index) return 1;

        return 0;
    }
}