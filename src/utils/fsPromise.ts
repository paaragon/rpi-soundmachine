import fs from 'fs';

export async function readDir(path: string): Promise<string[]> {
  return new Promise((res, rej) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        return rej(err);
      }

      res(files);
    });
  });
}

export async function writeFile(path: string, file: Buffer): Promise<void> {
  return new Promise((res, rej) => {
    fs.writeFile(path, file, (err) => {
      if (err) {
        return rej(err);
      }

      res();
    })
  });
}

export async function deleteFile(path: string): Promise<void> {
  return new Promise((res, rej) => {
    fs.unlink(path, (err) => {
      if (err) {
        return rej(err);
      }

      res();
    })
  });
}
