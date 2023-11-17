import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";

export const canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
    ) => {
        const token = localStorage.getItem('token')
        if(token != null)
            return false
        return true
    }