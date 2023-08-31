import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
const postDirectory = path.join(process.cwd(), "posts");
export function getSortedPostData() {
  //Get File names under /post

  const fileNames = fs.readdirSync(postDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" form file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });

  // sort post by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  //   use remark to convert markdown into html string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  // combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
