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
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';

import { storage } from './storage';
import { FileSizeValidationPipe } from './file-size-validation-pipe';

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

  // 不知道有哪些字段是file
  @Post('ddd')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads',
    }),
  )
  uploadAnyFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('body---', body);
    console.log('files---', files);
  }

  // storage实现文件保存后的改名等
  @Post('eee')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: storage,
    }),
  )
  uploadAnyFilesWithStorage(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('body---', body);
    console.log('files---', files);
  }

  @Post('fff')
  @UseInterceptors(
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  uploadFile2(
    @UploadedFile(FileSizeValidationPipe) file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('body---', body);
    console.log('file---', file);
  }
}
