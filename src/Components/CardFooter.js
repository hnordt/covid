import React from "react"
import cn from "classnames"

export function CardFooter(props) {
  return (
    <div className={cn("border-t border-gray-200 p-6", props.className)}>
      {props.children}
    </div>
  )
}
