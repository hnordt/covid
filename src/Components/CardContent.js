import React from "react"
import cn from "classnames"

export function CardContent(props) {
  return (
    <div className={cn("flex-1 p-6", props.className)}>{props.children}</div>
  )
}
