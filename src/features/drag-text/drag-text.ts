import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileService } from '../../core/file-service/file-service';
import { TextDTO } from '../../shared/dtoText';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './drag-text.html',
  styleUrls: ['./drag-text.css']
})
export class DragTextComponent {
  private dragtextService = inject(FileService); 
  private route=inject(ActivatedRoute);
  
  file: File | null = null;
  imageFile?: File|null=null;
  title: string = '';
  genre: string = '';
fileText: string = '';
editMode?:string|null='';
editableId?:string|null='';
  onFileDropped(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.file = event.dataTransfer.files[0];
          this.readFile(this.file);
         
    }
  }
  ngOnInit(): void {
   
    this.route.queryParamMap.subscribe(params => {
   
     this.editMode=params.get('editMode');
     this.editableId=params.get('id');
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
  
      this.readFile(this.file);
         
    }
  }
onFileSelectedImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imageFile = input.files[0];
  
    }
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  onImageDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files?.length) this.imageFile = files[0];
  }
  submitForm() {
     if (this.imageFile) 
    if(this.file){
    const data :TextDTO={
        title: this.title,
      genre: this.genre,
      file:this.file,
      text: this.fileText,
      imageFile: this.imageFile
      
    }
   
    this.dragtextService.uploadText(data)
  }

  }

  private readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.fileText = reader.result as string;
    };
    reader.readAsText(file, 'UTF-8');
  }
    updateForm(){
  if (this.imageFile) {
  const data: Pick<TextDTO, 'imageFile'> = {
    imageFile: this.imageFile
  };
     
   if(this.editMode=='true'){
      this.dragtextService.updateText(data, this?.editableId)
    
   }

  }
}
}