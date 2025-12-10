import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Layout {
  
 width = signal(window.innerWidth);
  height = signal(window.innerHeight);
  fontKoef=signal(30);
  defaultWidth = 1920;       // эталонное значение
  depenedsonFont = signal(16);       // коэффициент на размер шрифта

  // computed сигнал для количества строк на страницу
  charsPerPage = computed(() => {
    const power = this.width() * this.height();
    //const koef = this.width() / this.defaultWidth;
   
    return power / this.fontKoef() / this.depenedsonFont();
  });

  // метод для обновления размеров
  updateSize(width: number, height: number) {
    this.width.set(width);
    this.height.set(height);
  }

}
