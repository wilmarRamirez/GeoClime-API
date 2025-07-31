import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('records')
export class RecordsController {
  @UseGuards(AuthGuard('jwt'))
  @Post()
  postRecords(@Body() data: any, @Res() res: any) {
    return res.status(HttpStatus.OK).json({ message: data });
  }
}
