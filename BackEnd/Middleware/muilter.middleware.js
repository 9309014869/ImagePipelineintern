

import multer from 'multer';
import { diskStorage } from 'multer';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, resolve(__dirname, '../UploadedContaint'));  // Use the resolved __dirname
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

export const upload = multer({ 
    storage, 
})