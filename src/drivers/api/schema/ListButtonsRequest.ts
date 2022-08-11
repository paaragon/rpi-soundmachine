import { Request as ExpressRequest } from 'express';
import Request from './Request';

export default class ListButtonsRequest extends Request {
  constructor() {
    super();
  }

  public validate(req: ExpressRequest): boolean {
    return true;
  }
}
