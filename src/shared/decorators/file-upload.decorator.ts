import { SetMetadata } from '@nestjs/common';

export const fileUpload = (fileName: string) =>
  SetMetadata('fileName', fileName);
