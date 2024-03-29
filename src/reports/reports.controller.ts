import {
  Controller,
  Post,
  Body,
  UseGuards,
  Param,
  Patch,
  Get,
  Query,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { AuthGaurd } from '../gaurds/auth.gaurd';
import { ReportsService } from './reports.service';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGaurd } from '../gaurds/admin.gaurd';
import { GetEstimateDto } from './dtos/get-estimate-dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportService: ReportsService) {}

  @UseGuards(AuthGaurd)
  @Post()
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    // console.log('this is body', body);
    // console.log('current User', user);
    return this.reportService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGaurd)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    console.log(id);
    console.log(body.approved);
    return this.reportService.changeApproval(id, body.approved);
  }

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportService.createEstimate(query);
  }
}
