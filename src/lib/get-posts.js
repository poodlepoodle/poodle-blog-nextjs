import matter from 'gray-matter';
import path from 'path';
import fs from 'fs/promises';
import { cache } from 'react';

export const getPosts = cache(async () => {
  const posts = await fs.readdir('./posts');

  return Promise.all(
    posts
      .filter((file) => path.extname(file) === '.mdx')
      .map(async (file) => {
        const filePath = `./posts/${file}`;
        const postContent = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(postContent);

        if (data.published === false) {
          return null;
        }

        return { ...data, body: content };
      })
  );
});

export async function getSortedPosts() {
  const posts = await getPosts();
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPost(slug) {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
}
