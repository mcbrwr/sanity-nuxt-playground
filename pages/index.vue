<template>
  <main>
    <nav>
      <ul>
        <li v-for="section in nav">
          {{ section.title }}
          <ul v-if="section.links">
            <li v-for="link in section.links">
              {{ link.title }}
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <h1>Checking this sanity shizzle out</h1>
    <section class="articles" v-if="posts">
      <article v-for="post in posts">
        <h2>{{ post.title }}</h2>
        <p class="post__author">{{ post.author }}</p>
        <div class="article__text">
          <block-content :blocks="post.body"/>
        </div>
      </article>
    </section>
  </main>
</template>

<script>
import sanity from "../sanity-config.js";


const query = `*[_type == "post"]{
  _id,
  title,
  "author" : author->name,
  body
}[0...50]`;

// get the nav named SomeNav
const navigationTree = `*[name == 'SomeNav'][0]['sections'] {
  ...,
  sections[]{
    ...,
    target->{title, slug, _id},
    links[]{
      ...,
      target->{title, slug, _id},
      children[]{
        ...,
        target->{title, slug, _id}
      }
    }
  }
}
`

export default {
  name: "Home",
  data() {
    return {
      loading: true,
      posts: [],
      nav: [],
    };
  },
  created() {
    this.fetchNav();
    this.fetchPosts();
  },
  methods: {
    fetchNav() {
      this.error = this.nav = null;
      this.loading = true;
      sanity.fetch(navigationTree).then(
        (nav) => {
          this.loading = false;
          this.nav = nav;
        },
        (error) => {
          this.error = this.error + ' ' . error;
        }
      );
    },
    fetchPosts() {
      this.error = this.post = null;
      this.loading = true;
      sanity.fetch(query).then(
        (posts) => {
          this.loading = false;
          this.posts = posts;
        },
        (error) => {
          this.error = this.error + ' ' . error;
        }
      );
    },
  },
};
</script>

<style>
  body {
    max-width: 38em;
    margin: 3em auto;
    padding: 1em;
  }
</style>