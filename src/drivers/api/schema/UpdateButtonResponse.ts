import Response from './Response';

export default interface UpdateButtonResponse extends Response {
    error: boolean;
    button: { id: number, sound: string };
}
