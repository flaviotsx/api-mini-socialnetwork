const uuid = require("uuid/v1");
const storage = require("../storage");

const posts = [];

const resolvers = {
  Query: {
    posts: () => {
      return posts;
    }
  },

  Mutation: {
    async addPost(parent, { post }) {
      const { picture, description } = post;
      const { mimetype, createReadStream } = await picture;

      const { path } = storage.upload(createReadStream(), mimetype);
      const newPost = {
        id: uuid(),
        picture: path,
        description: description,
        createdAt: new Date().toString(),
        claps: 0
      };

      posts.push(newPost);

      return newPost;
    },
    clap(parent, { postId }) {
      const index = posts.findIndex(element => {
        element.id == postId;
      });
      if (index != -1) {
        posts[index].claps += 1;
        return posts[index];
      }
      return null;
    }
  }
};

module.exports = { resolvers };
