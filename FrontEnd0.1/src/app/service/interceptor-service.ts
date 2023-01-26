import  {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenService } from "./token.service";

@Injectable({
    providedIn: 'root'

})
export class InterceptorService implements HttpInterceptor {
    constructor(private tokenService: TokenService) { 

    }
    

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let autReq = req;
      const token = this.tokenService.getToken();
      if (token != null) {
        autReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
      }
      return next.handle(autReq);
    }
} 
    
/* utilice la otra configuración porque me funcionó mejor
export class InterceptorService  {
    constructor(private tokenService: TokenService){}

   Intercept(req:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let intReq = req;
        const token = this.tokenService.getToken();
        if(token!= null){
            intReq = req.clone({
                headers: req.headers.set('Authorization','Bearer'+token)
            });
        }
        return next.handle(intReq);
    }

}; */

export const interceptorProvider = [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
}];
