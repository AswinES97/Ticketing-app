import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpinterceptorInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false
  private refreshTokenSubject = new BehaviorSubject(null)

  constructor(
    private tokenService: TokenService,
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addToken(request)).pipe(
      catchError((requestError: HttpErrorResponse )=>{
        if (requestError && requestError.status === 401) {
          if(this.refreshTokenInProgress){

          }else{
            this.refreshTokenInProgress = true
            this.refreshTokenSubject.next(null)

            return this.authService.refreshAuthToken().pipe(
              switchMap((token)=>{
                console.log("new token:",token);
                // localStorage.setItem('token',token)
                return next.handle(this.addToken(request))
              })
            )

          }
          console.log(requestError)

        }
        return throwError(()=>requestError)
      })
    )
  }

  addToken(request: HttpRequest<any>) {
    const token = this.tokenService.getToken()
    
    if(!token) return request

    return request.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    })
  }
}
