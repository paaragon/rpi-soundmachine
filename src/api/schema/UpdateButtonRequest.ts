import { Request as ExpressRequest } from 'express';
import fileUpload from 'express-fileupload';
import Request from './Request';

const validMimeTypes = [
  'audio/mpeg',
];

export default class UpdateButtonRequest extends Request {
  public params: { id: string };
  public files: { sound: fileUpload.UploadedFile };

  constructor() {
    super();
  }

  public validate(req: ExpressRequest): boolean {
    const { id } = req.params;
    const { sound } = req.files;

    return sound &&
      !Array.isArray(sound) &&
      validMimeTypes.includes(sound.mimetype) &&
      id && !isNaN(parseInt(id, 10));
  }
}
