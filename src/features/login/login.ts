import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Authservice } from '../../core/authservice/authservice';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService= inject(Authservice);
  model = {
    email: '',
    password: ''
  };

  onSubmit() {
 
    this.authService.login(this.model.email, this.model.password);
  }
}
