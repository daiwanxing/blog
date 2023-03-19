import path from "node:path";
import fs from "node:fs";

const rootDir = path.join(__dirname, "content");

const dirs = fs.readdirSync(rootDir);

const catealog = {}

for (let dir of dirs) {
    const filePath = path.join(rootDir, dir);

    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !isDirectoryEmpty(filePath)) {
        const folders = readMarkdownFiles(filePath);
        catealog[`/content/${dir}/`] = [
            {
                text: "Introduction",
                items: folders,
            }
        ]
    }
}


/**
 * @description 检查目录是否为空
 * @param {string} dirPath 
 * @returns 
 */
function isDirectoryEmpty (dirPath) {
  const files = fs.readdirSync(dirPath);
  return files.length === 0;
}

/**
 * 读取指定目录下的所有 markdown 文件， 并返回一个数组
 * @param {string} dirPath 
 */
function readMarkdownFiles (dirPath) {
    const files = fs.readdirSync(dirPath);

    const markdownFiles = files.filter(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        return stat.isFile() && path.extname(file) === ".md";
    });

    const folderFiles = [];

    markdownFiles.forEach(markdownFile => {
        const markdownFilePath = path.join(dirPath, markdownFile);
        const res = fs.readFileSync(path.join(dirPath, markdownFile), { encoding: "utf-8" })
        const matchResult = res.match(/^#(.+$)/m);
        if (matchResult) {
            const relativePath = markdownFilePath.match(/[\\//](?=content).*/)[0];
            folderFiles.push({
                text: matchResult[0].replace(/^#/, ''),
                link: relativePath
            })
        }
    });

    return folderFiles;
}

module.exports = catealog;