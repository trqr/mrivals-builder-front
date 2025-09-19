import './App.css'
import {RouterProvider} from "react-router-dom";
import Router from "./router/Router.tsx";
import {ToastContainer} from "react-toastify";


function App() {

  return (
    <>
        <RouterProvider router={Router}>
        </RouterProvider>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
    </>
  )
}

export default App
