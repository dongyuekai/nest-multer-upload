Nest的文件上传也是基于multer实现的，它对multer api封装了一层，提供了FileInterceptor、FilesInterceptor、FileFieldsInterceptor、AnyFilesInterceptor的拦截器，分别用到了multer包的single、array、fields、any方法。
它们把文件解析出来，放到request的某个属性上，然后再用@UploadedFile、@UploadedFiles的装饰器取出来传入handler

并且这个过程还可以使用ParseFilePipe来做文件的验证，它内置了MaxFileSizeValidator、FileTypeValidator，你也可以实现自己的FileValidator

这就是Nest里处理文件上传的方式