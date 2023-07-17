import { findElement } from '../utils/jsons/data.crud.json';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import baseUrl from '../utils/api/route-api';
import { Type } from '@angular/compiler';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CrudService {
    /*===== Variables =====*/
    private _data: BehaviorSubject<Type | null> =
        new BehaviorSubject<Type | null>(null);

    private _dataArray: BehaviorSubject<Type[] | null> =
        new BehaviorSubject<Type[] | null>(null);

    private _dataArrayRelation: BehaviorSubject<Type[] | null> =
        new BehaviorSubject<Type[] | null>(null);

    private url: String = '';

    constructor(
        private _httpClient: HttpClient, 
        private router: Router,
    ) {}

    /**
        Getter and Setters for Data
    **/
    get data$(): Observable<Type | null> {
        return this._data.asObservable();
    }

    get dataArray$(): Observable<Type[] | null> {
        return this._dataArray.asObservable();
    }

    setDataArray(data: Type[]) {
        this._dataArray.next(data);
    }

    /**
        Getter for Data Relations
    **/
    get dataArrayRelation$(): Type[] | null {
        return this._dataArrayRelation.value;
    }

    setDataArrayRelation(data: Type[]) {
        this._dataArrayRelation.next(data);
    }

    /**
     * Order Alphabetically
     */
    compare(a: any, b: any) {
        if (a.fullname < b.fullname) return -1;
        if (a.fullname > b.fullname) return 1;

        return 0;
    }

    /*
     * Get Data
    */
    getDataArray(url: string): Observable<Type[]> {
        this.url = url;
        return this._httpClient
            .get<Type[]>(
                `${baseUrl + findElement(url)!.service}/all`,
            )
            .pipe(
                tap((dataArray) => {
                    dataArray.sort(this.compare);
                    /****** User Active ******/
                    // users.forEach((user) => {
                    //     if (user.isActive != 0) {
                    //         user.name = user.name.toUpperCase()
                            // userFiltered.push(user);
                    //     }
                    // });
                    this._dataArray.next(dataArray);
                })
            );
    }

    /*
     * Get Data
    */
    getDataArrayRelations(url: string): Observable<Type[]> {
        return this._httpClient
            .get<Type[]>(
                `${baseUrl + url}/all`,
            )
            .pipe(
                tap((dataArrayRelations) => {
                    dataArrayRelations.sort(this.compare);
                    this._dataArrayRelation.next(dataArrayRelations);
                })
            );
    }

    /*
     * Create Element
    */
    createNewElement(newElement: any): Observable<Type> {
        // Generate a new Rendimiento
        return this.dataArray$.pipe(
            take(1),
            switchMap((dataArray) =>
                this._httpClient
                    .post<Type>(
                        `${baseUrl + findElement(this.url)!.service}/create`,
                        newElement,
                    )
                    .pipe(
                        map((newElement) => {
                            // Update the dataArray with the new element

                            let dataArrayAux = dataArray;

                            dataArrayAux?.push(newElement);

                            dataArrayAux!.sort(this.compare);

                            this._dataArray.next(dataArrayAux);

                            // Return the new Rendimiento
                            return newElement;
                        })
                    )
            )
        );
    }

    /*
     * Edit Element
    */
    updateElement(element: any): Observable<Type> {
        return this.dataArray$.pipe(
            take(1),
            switchMap((dataArray) =>
                this._httpClient
                    .put<Type>(
                        `${baseUrl + findElement(this.url)!.service}/update`,
                        element
                    )
                    .pipe(
                        map((updatedElement: any) => {
                            // Find the index of the updated Rendimiento
                            const index = dataArray!.findIndex(
                                (item: any) => item.id === element.id
                            );

                            // Update the Element
                            dataArray![index] = updatedElement.data;

                            dataArray!.sort(this.compare);

                            // Update the DataArray
                            this._dataArray.next(dataArray);

                            // Return the updated Element
                            return updatedElement.data;
                        }),
                        switchMap((updatedElement) =>
                            this._data.pipe(
                                take(1),
                                filter((item: any) => item && item.id === element.id),
                                tap(() => {
                                    // Update the Element if it's selected
                                    this._data.next(
                                        updatedElement.data
                                    );

                                    // Return the updated Element
                                    return updatedElement.data;
                                })
                            )
                        )
                    )
            )
        );
    }

    /*
     * Delete the Rendimiento
    */
    deleteElement(id: number): any {
        return this.dataArray$.pipe(
            take(1),
            switchMap((dataArray) =>
                this._httpClient
                    .delete(
                        `${baseUrl + findElement(this.url)!.service}/delete/` + id
                    )
                    .pipe(
                        map(() => {
                            // Find the index of the deleted Element
                            const index = dataArray!.findIndex(
                                (item: any) => item.id === id
                            );

                            dataArray!.splice(index, 1);

                            // Update the dataArray
                            this._dataArray.next(dataArray);
                        })
                    )
            )
        );
    }

}