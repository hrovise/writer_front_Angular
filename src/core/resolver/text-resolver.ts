import { ResolveFn } from '@angular/router';
import { FileService } from '../file-service/file-service';
import { inject } from '@angular/core';

export const textResolver: ResolveFn<any> = (route, state) => {
  const fileService=inject(FileService);

    const width = window.innerWidth;
  const height = window.innerHeight;
  return fileService.getText(`?pageSize=${500}&currentPage=${1}`);
};
