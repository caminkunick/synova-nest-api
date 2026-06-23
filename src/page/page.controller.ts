import { Controller, Get, Param } from '@nestjs/common';
import { PageService } from './page.service';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get()
  getPage() {
    return { message: 'Hello, this is the page controller!' };
  }

  @Get('id/:id')
  async getPageById(@Param('id') id: string) {
    return await this.pageService
      .getPageById(id)
      .then((data) => ({
        status: 'ok',
        data: data,
      }))
      .catch((error) => ({
        status: 'error',
        message: error.message,
      }));
  }
}
