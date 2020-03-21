import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Playground />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

function Playground() {
  return <div className="p-8">PWA Template</div>
}
