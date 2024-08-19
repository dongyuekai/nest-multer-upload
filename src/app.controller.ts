import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  UploadedFiles,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 单文件上传
  @Post('aaa')
  @UseInterceptors(
    // 使用FileInterceptor来提取aaa字段 然后通过UploadedFile装饰器把它作为参数传入
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log('body---', body);
    console.log('file---', file);
  }

  // 多文件上传
  @Post('bbb')
  @UseInterceptors(
    FilesInterceptor('bbb', 3, {
      dest: 'myUploads',
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('body---', body);
    console.log('files---', files);
  }

  // 多个文件字段
  @Post('ccc')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'aaa', maxCount: 2 },
        { name: 'bbb', maxCount: 3 },
      ],
      {
        dest: 'myUploads',
      },
    ),
  )
  uploadFileFields(
    @UploadedFiles()
    files: { aaa?: Express.Multer.File[]; bbb?: Express.Multer.File[] },
    @Body() body,
  ) {
    console.log('body---', body);
    console.log('files---', files);
  }
}
