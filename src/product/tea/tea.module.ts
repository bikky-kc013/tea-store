import { Module } from '@nestjs/common';
import { TeaController } from './tea.controller';
import { TeaService } from './tea.service';

@Module({
  controllers: [TeaController],
  providers: [TeaService]
})
export class TeaModule {}
