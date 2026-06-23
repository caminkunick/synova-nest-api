import { Controller, Get, Param } from '@nestjs/common';
import { PageService } from './page.service';
import { renderAppToString } from '../../client/src/ssr';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get()
  async getPage() {
    const data = await this.pageService.getPageById("69cb658178869b63ab4f04fc");
    return await renderAppToString(data);
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
