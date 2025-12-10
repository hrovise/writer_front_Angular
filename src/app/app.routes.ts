import { Routes } from '@angular/router';
import { DragTextComponent } from '../features/drag-text/drag-text';
import { Textreader } from '../features/textreader/textreader';
import { textResolver } from '../core/resolver/text-resolver';
import { Alltexts } from '../features/alltexts/alltexts';
import { authGuard } from '../core/guards/auth-guard';
import { Login } from '../features/login/login';

export const routes: Routes = [
      { path: '', redirectTo: 'titles', pathMatch: 'full' },
  { path: 'dragtext',
    
     component: DragTextComponent,
    canActivate: [authGuard] },
    {path:'login',
    component:Login},
  { path: 'titles', component: Alltexts },
  { path: 'text', 
    component: Textreader,
  //  resolve:{
  //    text:textResolver}
   }
   
];
