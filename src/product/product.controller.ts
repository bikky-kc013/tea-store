import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CategoryDto } from './category/dto/category-insert.dto';
import { dynamicStorage, fileFilter } from '../config/multer.config';

@Controller('/api/v1/product')
export class ProductController {
  constructor() {}

  @Post('upload/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: dynamicStorage('./uploads/image'),
      fileFilter,
    }),
  )
  async uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Body() data: CategoryDto,
  ) {
    if (!image) {
      throw new BadRequestException('Image file is missing');
    }

    console.log(data);
  }

  @Post('upload/pdfs')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: dynamicStorage('./uploads/product/pdf'),
      fileFilter,
    }),
  )
  async uploadPdfs(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() data: CategoryDto,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    console.log(files);
    console.log(data);
  }
}
