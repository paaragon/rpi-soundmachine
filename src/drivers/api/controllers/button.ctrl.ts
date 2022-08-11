
import soundmachine from '../../../domains/SoundMachine';
import ListButtonsRequest from '../schema/ListButtonsRequest';
import ListButtonsResponse from '../schema/ListButtonsResponse';
import PlayButtonSoundRequest from '../schema/PlayButtonSoundRequest';
import PlayButtonSoundResponse from '../schema/PlayButtonSoundResponse';
import UpdateButtonRequest from '../schema/UpdateButtonRequest';
import UpdateButtonResponse from '../schema/UpdateButtonResponse';

export default class ButtonController {
  static async getButtons(req: ListButtonsRequest): Promise<ListButtonsResponse> {
    const buttons = await soundmachine.getButtons();

    return {
      error: false,
      buttons: buttons.map((b) => ({ id: b.id, sound: b.sound })),
    };
  }

  static async updateButton(req: UpdateButtonRequest): Promise<UpdateButtonResponse> {
    const { id } = req.params;
    const { sound } = req.files;

    const button = await soundmachine.updateButton(parseInt(id, 10), { name: sound.name, data: sound.data });

    return {
      error: false,
      button: { id: button.id, sound: button.sound },
    }
  }

  static async playButtonSound(req: PlayButtonSoundRequest): Promise<PlayButtonSoundResponse> {
    const { id } = req.params;

    soundmachine.playButtonSound(parseInt(id, 10));

    return {
      error: false,
    }
  }
}
