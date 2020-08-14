import * as fs from 'fs';
import * as path from 'path';
import { ModelCtor } from 'sequelize/types/lib/model';
import { BaseModel } from './base';

export type IDatabaseModel = Record<
  string,
  typeof BaseModel & ModelCtor<BaseModel>
>;

const openFile = async (file) => await import(file);

/**
 * exports all Model classes of files that end with '.model.ts'
 * */
export const modelsLoader = async (): Promise<IDatabaseModel> => {
  const models = {};

  const files = getFilesRecursively(__dirname).filter(
    (fileName) =>
      fileName.endsWith('model.ts') || fileName.endsWith('model.js'),
  );

  await Promise.all(
    files.map(
      async (file): Promise<void> => {
        const modelClass = await openFile(file);

        Object.keys(modelClass).forEach((key) => {
          if (
            modelClass[key].constructor != null &&
            modelClass[key].ModelName != null
          ) {
            models[modelClass[key].ModelName] = modelClass[key];
          }
        });
      },
    ),
  );

  return models;
};

const getAllSubFolders = (baseFolder: string, folderList: string[] = []) => {
  const folders: string[] = fs
    .readdirSync(baseFolder)
    .filter((file) => fs.statSync(path.join(baseFolder, file)).isDirectory());
  folders.forEach((folder) => {
    folderList.push(path.join(baseFolder, folder));
    getAllSubFolders(path.join(baseFolder, folder), folderList);
  });
  return folderList;
};
const getFilesInFolder = (rootPath: string) => {
  return fs
    .readdirSync(rootPath)
    .filter(
      (filePath) => !fs.statSync(path.join(rootPath, filePath)).isDirectory(),
    )
    .map((filePath) => path.normalize(path.join(rootPath, filePath)));
};
const getFilesRecursively = (rootPath: string): string[] => {
  const rootFiles = getFilesInFolder(rootPath);
  const subFolders = getAllSubFolders(rootPath);
  const allFiles = subFolders.map(getFilesInFolder);
  return [].concat.apply([...rootFiles], allFiles);
};

// endregion

// endregion
