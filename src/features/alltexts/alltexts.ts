import { Component, inject, signal, OnDestroy } from '@angular/core';
import { FileService } from '../../core/file-service/file-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Authservice } from '../../core/authservice/authservice';

@Component({
  selector: 'app-alltexts',
  imports: [CommonModule],
  templateUrl: './alltexts.html',
  styleUrl: './alltexts.css'
})
export class Alltexts implements OnDestroy {
  private textService = inject(FileService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();
  protected authService = inject(Authservice);

  texts = signal<any[]>([]);
  
  
  hoverIndex = -1;
  selectedTitle = signal<string | null>(null);

  constructor() {
    this.loadTexts();
  }

  loadTexts() {
    this.textService.getAllTexts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.texts.set(res);
        },
        error: (error) => {
          console.error('Ошибка загрузки текстов:', error);
          // TODO: Добавить уведомление пользователю
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openText(title: string) {
    this.router.navigate(['/text'], { queryParams: { title } });
    // this.selectedTitle.set(title);
  }
 openEdit(id:string){
  this.router.navigate(['/dragtext'], { queryParams: { id, editMode: true } });
 }

 
  activeIndex = signal(0);

  prev() {
    const idx = this.activeIndex() - 1;
    if (idx >= 0) this.activeIndex.set(idx);
  }

  next() {
    const idx = this.activeIndex() + 1;
    if (idx < this.texts().length) this.activeIndex.set(idx);
  }
}
