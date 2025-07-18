import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StrapiGatewayService {
  constructor(private readonly http: HttpService) {}

  async getBanners() {
    const url = `${process.env.STRAPI_URL}/api/banners`;
    const response = await firstValueFrom(
      this.http.get(url, {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
        },
      }),
    );
    return response.data;
  }

  async createBanner(data: any) {
    const url = `${process.env.STRAPI_URL}/api/banners`;
    const response = await firstValueFrom(
      this.http.post(url, data, {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_ADMIN_TOKEN}`,
        },
      }),
    );
    return response.data;
  }

}
