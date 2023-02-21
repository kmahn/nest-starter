export type UploadFileRequestDto<T = File> = {
  file: T;
};

export type UploadFilesRequestDto<T = File> = {
  files: T[];
};
