import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CategoryDto } from './dto/category-insert.dto';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async insert(category: CategoryDto, image: string): Promise<Category> {
    const save = await this.categoryRepo.save({
      id: v4(),
      name: category.name,
      description: category.description,
      image,
    });
    return save;
  }

  async getById(id: string): Promise<Category> {
    try {
      const findOne = await this.categoryRepo.findOne({
        where: { id },
      });
      return findOne;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(): Promise<Category[]> {
    try {
      const findAll = await this.categoryRepo.find({
        order: {
          createdAt: 'DESC',
        },
      });
      return findAll;
    } catch (error) {
      console.log(error);
    }
  }

  async getByName(name: string): Promise<Category> {
    try {
      const findOne = await this.categoryRepo.findOne({
        where: {
          name: name,
        },
      });
      return findOne;
    } catch (error) {
      console.log(error);
    }
  }

  async updated(
    id: string,
    category: CategoryDto,
    image: string,
  ): Promise<Category> {
    try {
      const update = await this.categoryRepo.save({
        id: id,
        name: category.name,
        description: category.description,
        image,
      });
      return update;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(category: Category): Promise<Category> {
    try {
      const remove = await this.categoryRepo.remove(category);
      return remove;
    } catch (error) {
      console.log(error);
    }
  }
}
