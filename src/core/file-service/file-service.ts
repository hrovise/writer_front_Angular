import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TextDTO } from '../../shared/dtoText';
import { ITextResponse } from '../../shared/textResponse';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class FileService {
   private http = inject(HttpClient);
  private router=inject (Router);

     uploadText(data: TextDTO): void {
     const formData = new FormData();
  formData.append('file', data.file); 
  formData.append('imageFile', data.imageFile);  // имя должно совпадать с @UseInterceptors(FileInterceptor('file'))
  formData.append('title', data.title);
    formData.append('genre', data.genre);

    console.log('form',formData)
    
    this.http.post(`${environment.URL}/api/text/createNew`, formData).subscribe({
      next:response=>{this.router.navigate(['/'])},
      error:error=>{console.log('error:', error)},
      complete:()=>{console.log('succeed')}
    });
  }
updateText(data: Pick<TextDTO,'imageFile'>, ids:string|null|undefined): void {
     const formData = new FormData();
  const id=ids;
  formData.append('imageFile', data.imageFile);  // имя должно совпадать с @UseInterceptors(FileInterceptor('file'))
 

    console.log('form',formData, id)
    
    this.http.post(`${environment.URL}/api/text/update/${id}`, formData).subscribe({
      next:response=>{this.router.navigate(['/'])},
      error:error=>{console.log('error:', error)},
      complete:()=>{console.log('succeed')}
    });
  }
  getText(query:string){
    console.log('querSERV',query)
    return this.http.get<ITextResponse>(`${environment.URL}/api/text/chunk${query}`,)
  }
    getAllTexts() {
   return  this.http.get<any>(` ${environment.URL}/api/text/titles`);
  }
}
