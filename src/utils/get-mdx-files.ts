import fs from 'fs/promises';
import path from 'path';

/**
 * 지정된 디렉토리에서 MDX 파일 목록을 가져옵니다.
 */
export const getMDXFiles = async (dir: string) => {
  const files = await fs.readdir(dir);
  return files.filter(file => path.extname(file) === '.mdx');
};
