import { Controller, Post, Body } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createDto: CreateCategoryDto) {
    return this.categoriesService.create(createDto);
  }
}
