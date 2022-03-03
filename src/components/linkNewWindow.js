import { INLINES } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import React from "react"

const RichTextOptions = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, next) => {
      return (
        <a
          href={node.data.uri}
          target={
            node.data.uri.startsWith("https://cowichandressage.ca")
              ? ""
              : "_blank"
          }
        >
          {next[0]}
        </a>
      )
    },
  },
}

export const RichTextLinks = content => renderRichText(content, RichTextOptions)
