import { INLINES } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const RichTextOptions = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, next) => {
      return `<a href="${node.data.uri}"${
        node.data.uri.startsWith("https://cowichandressage.ca")
          ? ""
          : ' target="_blank"'
      }>${next(node.content)}</a>`
    },
  },
}

export const RichTextLinks = content => renderRichText(content, RichTextOptions)
