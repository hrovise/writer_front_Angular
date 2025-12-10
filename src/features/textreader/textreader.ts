import { Component, ElementRef, HostListener, inject, Renderer2, signal, ViewChild } from '@angular/core';
import { FileService } from '../../core/file-service/file-service';
import { CommonModule } from '@angular/common';
import { ITextResponse, } from '../../shared/textResponse';
import { IChunk } from '../../shared/chunk';
import { Layout } from '../../core/layout/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-textreader',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './textreader.html',
  styleUrls: ['./textreader.css']
})
export class Textreader {
  @ViewChild('textContainer', { static: true }) textContainer!: ElementRef<HTMLDivElement>;

  router = inject(Router)
  layout = inject(Layout);
  startX: number = 0;
  startY: number = 0;
  private fileService = inject(FileService);
  private route = inject(ActivatedRoute);

  private renderer = inject(Renderer2);
  private elRef = inject(ElementRef);
  isDark = signal(false);
  allChunks = signal(0);
  wholeTextLength = signal(0);
  toggleTheme() {
    this.isDark.update(prev => !prev);
  }
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
  }

  // Обработчик для конца свайпа (touchend)
  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;

    const deltaX = endX - this.startX;
    const deltaY = endY - this.startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
     
      if (deltaX > 0) {
        this.onSwipeRight();
      } else {
        this.onSwipeLeft();
      }
    }
  }


  onSwipeLeft() {
    this.nextPage();
  }

 
  onSwipeRight() {
    this.prevPage()

  }
  increaseFont() {
    this.layout.depenedsonFont.update(prev => prev + 2);
    this.layout.fontKoef.update(prev => prev + 2);
    this.rerenderText();
  }
  goBack(): void {
    this.router.navigate(['/']); 
  }
  decreaseFont() {
    this.layout.depenedsonFont.update(prev => Math.max(8, prev - 2));
    this.layout.fontKoef.update(prev => Math.max(8, prev - 2));
    this.rerenderText();
  }

  rerenderText() {
    this.loadPage(this.currentPage());
  }

  // кеш чанков
  chunksCache = new Map<number, string>();
  chunkSizeFromServer = 10000;
  isLoaded = signal(false);
  text = signal('');
  currentPage = signal(1);
  lastPage = signal(1);

  titleText = signal('');

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const t = params.get('title');
      if (t) {
        this.titleText.set(t);
      }
    });
  }

  ngAfterViewInit() {
    this.layout.updateSize(window.innerWidth, window.innerHeight);
    this.loadPage(this.currentPage());
  }

  @HostListener('window:resize')
  onResize() {

    this.layout.updateSize(window.innerWidth, window.innerHeight);
   
    this.loadPage(this.currentPage());
  }

  loadPage(pageIndex: number) {
    const charsPerPage = Math.floor(this.layout.charsPerPage());

    const offset = (pageIndex - 1) * charsPerPage;
    const chunkIndex = Math.floor(offset / this.chunkSizeFromServer);
    const localOffset = offset % this.chunkSizeFromServer;


   
    const currentChunk = this.chunksCache.get(chunkIndex);

  
    if (!currentChunk) {
      this.fetchChunk(chunkIndex, () => this.loadPage(pageIndex));
      return;
    }

   
    let pageText = currentChunk.slice(localOffset, localOffset + charsPerPage);
    
  
    let nextChunkIndex = chunkIndex + 1;
    while (pageText.length < charsPerPage && nextChunkIndex < this.allChunks()) {
      const nextChunk = this.chunksCache.get(nextChunkIndex);
      if (nextChunk) {
      
        const remaining = charsPerPage - pageText.length;
        pageText += nextChunk.slice(0, remaining);
        break;
      } else {
       
        this.fetchChunk(nextChunkIndex, () => this.loadPage(pageIndex));
        return;
      }
    }

  

    this.text.set(pageText);
    this.lastPage.set(Math.ceil(this.wholeTextLength() / this.layout.charsPerPage()));
    this.currentPage.set(pageIndex);
  }
  private fetchChunk(chunkIndex: number, callback?: () => void) {
    const query = `?textTitle=${encodeURIComponent(this.titleText())}&chunkIndex=${chunkIndex}`;

    this.fileService.getText(query).subscribe(res => {
      this.allChunks.set(res.chunksCount);
      this.wholeTextLength.set(res.totalLengthText);
      this.chunksCache.set(chunkIndex, res.chunks[0].text);

      this.isLoaded.set(true);
      callback?.();
    });
  }

  nextPage() {
    if (this.currentPage() < this.lastPage()) {
      this.loadPage(this.currentPage() + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.loadPage(this.currentPage() - 1);
    }
  }
}

