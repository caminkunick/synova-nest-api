import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PageService {
  async getPageById(id: string) {
    const endpoint = `${process.env.PAYLOAD_URL}/api/pages/cache/${id}`;
    const compare = "https://synova-payload.vercel.app/api/pages/cache/69cb658178869b63ab4f04fc";
    try {
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch page with ID ${id}: ${error.message}`);
    }
  }
}
