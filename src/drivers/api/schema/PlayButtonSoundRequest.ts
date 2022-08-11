import { Request as ExpressRequest } from 'express';
import Request from './Request';

export default class PlayButtonSoundRequest extends Request {
  public params: { id: string };

  constructor() {
    super();
  }

  public validate(req: ExpressRequest): boolean {
    const { id } = req.params;

    return id && !isNaN(parseInt(id, 10));
  }
}
