import path from 'path';

const rootDir = process.cwd();

export const resolve = (name: string) => {
    return path.resolve(rootDir, name);
}
