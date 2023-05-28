import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1 style="color:blue;">WELCOME TO My Car Value API</h1><p>Created By : @hemanshu_waghmare</p>';
  }
}
