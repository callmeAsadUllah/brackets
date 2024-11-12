import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  exports: [SearchService],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
