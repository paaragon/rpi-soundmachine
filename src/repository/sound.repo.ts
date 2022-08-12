import ButtonInRepo from '../models/ButtonInRepo';
import { deleteFile, readDir, writeFile } from '../utils/fsPromise';

const soundFolder = `${__dirname}/../../sounds`;

export default {
  async getButtons(): Promise<ButtonInRepo[]> {
    const files: string[] = await readDir(soundFolder);

    const buttons: ButtonInRepo[] = files.map((file) => {
      const splitted = file.split('-');
      const id = parseInt(splitted[0], 10);
      const sound = splitted[1];
      return {
        id,
        sound,
        path: buildSoundPath(id, sound),
      }
    });

    return buttons;
  },

  async getButton(id: number): Promise<ButtonInRepo | undefined> {
    const files: string[] = await readDir(soundFolder);

    const buttons: ButtonInRepo[] = files.map((file) => {
      const splitted = file.split('-');
      const id = parseInt(splitted[0], 10);
      const sound = splitted[1];
      return {
        id,
        sound,
        path: buildSoundPath(id, sound),
      }
    });

    return buttons.find((button) => button.id === id);
  },

  async updateButton(id: number, name: string, data: Buffer): Promise<ButtonInRepo> {
    const fileName = sanitizeFileName(name);
    const soundName = `${id}-${fileName}`;
    const path = `${soundFolder}/${soundName}`;

    await this.deleteButton(id);

    await writeFile(path, data);

    return {
      id,
      sound: fileName,
      path: buildSoundPath(id, fileName),
    }
  },

  async deleteButton(id: number): Promise<void> {
    const buttons = await this.getButtons();
    const currentButton = buttons.find((button) => button.id === id);
    if (currentButton) {
      await deleteFile(currentButton.path);
    }
  },
};

function sanitizeFileName(fileName: string): string {
  return fileName.replace(/-/g, '_').replace(/ /g, '_');
}

function buildSoundPath(id: number, name: string): string {
  return `${soundFolder}/${id}-${name}`;
}
