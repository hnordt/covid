import React from "react"

export function Link(props) {
  return (
    <a
      className="text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition duration-150 ease-in-out"
      href={props.href}
      {...(props.target === "_blank"
        ? {
            target: "_blank",
            rel: "noopener noreferrer"
          }
        : undefined)}
    >
      {props.children}
    </a>
  )
}
