import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoryDto } from './dto/category-insert.dto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async insert(data: CategoryDto, imageData: Express.Multer.File) {
    const image = imageData.filename;
    const doExists = await this.categoryRepository.getByName(data.name);
    if (doExists) {
      throw new HttpException(
        'Category with similar name already exixts',
        HttpStatus.CONFLICT,
      );
    }
    const savedCategory = await this.categoryRepository.insert(data, image);
    return savedCategory;
  }
}
