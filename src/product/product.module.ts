import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TeaController } from './tea/tea.controller';
import { TeaModule } from './tea/tea.module';
import { CategoryModule } from './category/category.module';

@Module({
  controllers: [ProductController, TeaController],
  providers: [ProductService],
  imports: [TeaModule, CategoryModule],
})
export class ProductModule {}
