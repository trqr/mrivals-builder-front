import './App.css'
import {RouterProvider} from "react-router-dom";
import Router from "./router/Router.tsx";

function App() {

  return (
    <>
        <RouterProvider router={Router}>
        </RouterProvider>
    </>
  )
}

export default App
