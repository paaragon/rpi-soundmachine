
import soundRepo from '../../repository/sound.repo';
import playerService from '../../services/player.service';
import ListButtonsRequest from '../schema/ListButtonsRequest';
import ListButtonsResponse from '../schema/ListButtonsResponse';
import PlayButtonSoundRequest from '../schema/PlayButtonSoundRequest';
import PlayButtonSoundResponse from '../schema/PlayButtonSoundResponse';
import UpdateButtonRequest from '../schema/UpdateButtonRequest';
import UpdateButtonResponse from '../schema/UpdateButtonResponse';

export default class ButtonController {
  static async getButtons(req: ListButtonsRequest): Promise<ListButtonsResponse> {
    const buttons = await soundRepo.getButtons();

    return {
      error: false,
      buttons: buttons.map((b) => ({ id: b.id, sound: b.sound })),
    };
  }

  static async updateButton(req: UpdateButtonRequest): Promise<UpdateButtonResponse> {
    const { id } = req.params;
    const { sound } = req.files;

    const button = await soundRepo.updateButton(parseInt(id, 10), sound.name, sound.data);

    return {
      error: false,
      button: { id: button.id, sound: button.sound },
    }
  }

  static async playButtonSound(req: PlayButtonSoundRequest): Promise<PlayButtonSoundResponse> {
    const { id } = req.params;

    const button = await soundRepo.getButton(parseInt(id, 10));

    playerService.play(button.path);

    return {
      error: false,
    }
  }
}
