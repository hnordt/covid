---
to: src/<%= m %>/Components/<%= name %>.js
---
import React from "react"

export function <%= name %>(props) {
  return <div className="">{props.children}</div>
}
