import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';
import netlify from "@astrojs/netlify/functions";
const env = loadEnv("", process.cwd(), 'STORYBLOK');


// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [compress(), mdx(), tailwind(), storyblok({
    accessToken: env.STORYBLOK_TOKEN,
    components: {
      // Add your components here
      blogPost: 'storyblok/BlogPost',
      blogPostList: 'storyblok/BlogPostList',
      page: 'storyblok/Page'
    },
    apiOptions: {
      // Choose your Storyblok space region
      region: 'us' // optional,  or 'eu' (default)
    }
  })],
  adapter: netlify()
});