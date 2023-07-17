import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, finalize } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { LoaderService } from "../../services/loader.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(
        private authService: AuthService,
        private router: Router,
        private loaderService: LoaderService,  
    ) {

    } 

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        this.loaderService.showLoader()

        let authReq = req;
        const token = this.authService.getToken();
        if(token != null){
            authReq = authReq.clone({
                setHeaders : {
                    Authorization: `Bearer ${token}`,
                }
            })
        }
        return next.handle(authReq).pipe(
            finalize(() => this.loaderService.hideLoader())
        );
    }

}

export const authInterceptorProviders = [
    {
        provide : HTTP_INTERCEPTORS,
        useClass : AuthInterceptor,
        multi : true
    }
]