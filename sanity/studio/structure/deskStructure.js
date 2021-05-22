import S from "@sanity/desk-tool/structure-builder";
import {
  FaRegFolderOpen,
  FaRegFile,
} from "react-icons/fa";
import {
  MdSettings,
  MdShare,
  MdList,
  MdInfo,
  MdPerson,
  MdDashboard,
  MdRssFeed,
} from "react-icons/md";

const hiddenDocTypes = (listItem) =>
  ![
    "siteSettings",
    "menuLink",
    "socialLink",
    "author",
    "page",
    "post",
    "project",
    "theme",
    "themeLmColor",
    "themeDmColor",
    "postsList",
  ].includes(listItem.getId());

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .icon(MdSettings)
        .child(
          S.list()
            .title("Site Settings")
            .items([
              S.listItem()
                .title("Metadata")
                .icon(MdInfo)
                .child(
                  S.document()
                    .title("Metadata")
                    .schemaType("siteSettings")
                    .documentId("siteSettings")
                ),
              S.listItem()
                .title("Authors")
                .icon(MdPerson)
                .child(S.documentTypeList("author").title("Author")),
              S.listItem()
                .title("Navigation Links")
                .icon(MdList)
                .child(
                  S.documentTypeList("menuLink").title("Navigation Links")
                ),
              S.listItem()
                .title("Social Links")
                .icon(MdShare)
                .child(S.documentTypeList("socialLink").title("Social Links")),
              S.listItem()
                .title("Theme-UI")
                .icon(MdDashboard)
                .child(
                  S.document()
                    .schemaType("theme")
                    .documentId("theme")
                    .title("Theme-UI Theme")
                ),
            ])
        ),
      // Add a visual divider (optional)
      S.divider(),
      S.listItem()
        .title("Posts")
        .icon(MdRssFeed)
        .child(
          S.list()
            .title("Posts")
            .items([
              S.listItem()
                .title("Posts list page")
                .icon(MdSettings)
                .child(
                  S.document()
                    .title("The Posts list page")
                    .schemaType("postsList")
                    .documentId("postsList")
                ),
              S.divider(),
              S.listItem()
                .title("Posts")
                .child(S.documentTypeList("post").title("The posts")),
            ])
        ),
      S.listItem()
        .title("Projects")
        .child(S.documentTypeList("project").title("Projects")),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);
