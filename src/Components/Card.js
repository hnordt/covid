import React from "react"
import cn from "classnames"
import { Link } from "Components/Link"

export function Card(props) {
  return (
    <div
      className={cn(
        "flex flex-col shadow-sm border-b border-gray-200 rounded-md bg-white",
        props.className
      )}
    >
      <div className="border-b border-gray-200 p-6">
        <h1 className="font-medium text-gray-900 text-lg leading-6">
          {props.title}
        </h1>
        <p className="text-gray-500 text-sm leading-5 mt-1">
          {props.description}
        </p>
      </div>
      {props.children}
      {(props.elaboration || props.dataSource) && (
        <div className="border-t border-gray-200 p-6">
          {props.elaboration && (
            <p className="text-gray-500 text-sm leading-5 mb-3">
              <strong>Explicação detalhada:</strong> {props.elaboration}
            </p>
          )}
          {props.dataSource && (
            <p className="text-gray-500 text-sm leading-5">
              <strong>Fonte:</strong>{" "}
              {typeof props.dataSource === "string" ? (
                props.dataSource
              ) : (
                <Link href={props.dataSource.url} target="_blank">
                  {props.dataSource.name}
                </Link>
              )}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
