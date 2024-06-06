import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

// Multer configuration
export const multerConfig = {
  dest: './public',
};

export const multerOptions = {
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination: (req: any, file: any, cb: any) => {
      try {
        const uploadPath = multerConfig.dest;
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      } catch (error) {
        cb(
          new HttpException(
            `Error creating directory: ${error.message}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
          false,
        );
      }
    },
    filename: (req: any, file: any, cb: any) => {
      try {
        const filename = `${uuid()}${extname(file.originalname)}`;
        cb(null, filename);
      } catch (error) {
        cb(
          new HttpException(
            `Error generating filename: ${error.message}`,
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
          false,
        );
      }
    },
  }),
};
