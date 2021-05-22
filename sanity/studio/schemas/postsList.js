export default {
    name: "postsList",
    title: "Posts list",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title above the posts list",
        type: "string",
        validation: (Rule) => Rule.required(),
      },
      {
        name: "body",
        title: "Intro above the posts list",
        type: "blockContent",
      },
    ],
  }
  