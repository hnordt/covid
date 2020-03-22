import React from "react"
import { Link } from "Components/Link"

export function Card(props) {
  return (
    <div className="shadow-sm border-b border-gray-200 rounded-md bg-white">
      <div className="border-b border-gray-200 p-6">
        <h1 className="font-medium text-gray-900 text-lg leading-6">
          {props.title}
        </h1>
        <p className="text-gray-500 text-sm leading-5 mt-1">
          {props.description}
        </p>
      </div>
      <div className="p-6">{props.children}</div>
      <div className="border-t border-gray-200 p-6">
        {props.elaboration && (
          <p className="text-gray-500 text-sm leading-5 mb-3">
            <strong>Explicação detalhada:</strong> {props.elaboration}
          </p>
        )}
        <p className="text-gray-500 text-sm leading-5">
          <strong>Fonte:</strong>{" "}
          <Link href={props.dataSource.url} target="_blank">
            {props.dataSource.name}
          </Link>
        </p>
      </div>
    </div>
  )
}
