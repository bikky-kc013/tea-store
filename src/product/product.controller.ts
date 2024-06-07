import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer.config';
import { CategoryDto } from './category/dto/category-insert.dto';
import { CategoryService } from './category/category.service';

@Controller('/api/v1/product')
export class ProductController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async upload(@UploadedFile() image, @Body() data: CategoryDto) {
    const inserted = await this.categoryService.insert(data, image);
    return {
      status: 'Success',
      data: inserted,
      message: 'Successfully created category',
    };
  }
}
