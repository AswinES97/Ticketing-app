import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {

  constructor(
    private toast: ToastrService,
  ) { }

  handleError(error: HttpErrorResponse) {
    if(error.status.toString().startsWith('4'))
      this.toast.error(error.error.error[0].message)
    else
      this.toast.error('Something went Wrong')
    
    return throwError(() => new Error('Something bad happened; please try again later.')); 
  }
}
