import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4 text-center">
      <div className="bg-white p-8 rounded-xl shadow-md border border-blue-200 max-w-md">
        <div className="flex justify-center mb-4 text-blue-600">
          <AlertTriangle className="w-16 h-16" />
        </div>
        <h1 className="text-4xl font-extrabold text-blue-800 mb-2">404</h1>
        <p className="text-lg font-medium text-blue-700 mb-4">Página no encontrada</p>
        <p className="text-blue-600 mb-6">
          Para acceder a nuestro catálogo, por favor verifique la url a la que quiere acceder.
        </p>
      </div>
    </div>
  )
}
