import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
@Injectable({providedIn:'root'})
export class Authservice {
   private http = inject(HttpClient);
   private token = "access_token"
   private route=  inject(Router);
   isAuthenticated = signal(!!localStorage.getItem(this.token));


   login(email:string, password:string):void{
    const body={
      email:email,
      password:password
    }
     this.http.post<{access_token:string}>(`${environment.API_URL}/api/user/login`, body).subscribe(res=>{

       localStorage.setItem(this.token, res.access_token);
       this.isAuthenticated.set(true); 
       this.route.navigate(['/dragtext']);
     })
   }

   logout(){
    localStorage.removeItem(this.token);
    this.isAuthenticated.set(false);
   }
  
   getToken(){
    return localStorage.getItem(this.token);
   }


   getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      
      const decoded: any = jwtDecode(token);
      console.log('decoded',decoded)
      return decoded.role || null;
    } catch (e) {
      return null;
    }
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ADMIN';
  }
}
