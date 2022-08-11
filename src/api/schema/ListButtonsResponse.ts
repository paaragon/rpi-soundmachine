import Response from './Response';

export default interface ListButtonsResponse extends Response {
    error: boolean;
    buttons: { id: number, sound: string }[];
}
