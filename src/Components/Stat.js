import React from "react"

export function Stat(props) {
  return (
    <div className="text-center pt-8 px-8">
      <p className="text-indigo-600 font-extrabold text-2xl leading-8 sm:text-3xl sm:leading-9">
        {props.value}
      </p>
      <p className="text-gray-500 font-medium text-base leading-6">
        {props.label}
      </p>
    </div>
  )
}
