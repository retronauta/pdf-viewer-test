import { useState } from "react"
import "./app.css"

// worker de react-pdf-viewer
import { Worker } from "@react-pdf-viewer/core"

// Import the main component
import { Viewer } from "@react-pdf-viewer/core"

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css"

//default layout plugin
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"

// Import styles of default layout plugin
import "@react-pdf-viewer/default-layout/lib/styles/index.css"

function App() {
  // create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  // pdf file state
  const [pdfFile, setPdfFile] = useState(null)

  // pdf error
  const [pdfError, setPdfError] = useState("")

  const handleFile = e => {

    //* Solo se permite cargar archivos pdf
    const allowedFiles = ["application/pdf"]
    //* Archivo pdf seleccionado
    let selectedFile = e.target.files[0]
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        // Creando objeto FileReader() para leer ficheros
        let reader = new FileReader()
        // Leyendo los datos del objeto FileReader()
        reader.readAsDataURL(selectedFile)
        // Propiedad que es ejecutada cuando el load es ejecutado
        reader.onloadend = e => {
          setPdfError("")
          // e.target result contiene codigo base64 (pdf)
          setPdfFile(e.target.result)
        }
      } else {
        setPdfError("Not a valid pdf")
      }
    } else {
      console.log("please select a PDF")
    }
  }

  return (
    <div className="container">
      <form>
        <label>
          <h5>Upload PDF</h5>
        </label>
        <br></br>
        <input
          type="file"
          className="form-control"
          onChange={handleFile}
        ></input>

        {/* Mensaje de error cuando no se selecciona el formato pdf correcto */}
        {pdfError && <span className="text-danger">{pdfError}</span>}
      </form>

      <h5>View PDF</h5>
      <div className="viewer">
        {pdfFile && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
            <Viewer
              fileUrl={pdfFile}
              plugins={[defaultLayoutPluginInstance]}
            ></Viewer>
          </Worker>
        )}

        {/* Renderizado si el estado del pdfFile es null */}
        {!pdfFile && <>No file is selected yet</>}
      </div>
    </div>
  )
}

export default App
