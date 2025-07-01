import { useState } from "react"
import { Phone, Mail, ExternalLink, Eye } from "lucide-react"

const categories = ["Todos", "Tecnología", "Ropa e indumentaria"]

// Datos del usuario de los productos guardados
const userData = {
  name: "Joaquin",
  lastName: "Strusiat", 
  email: "joaquinpjs@gmail.com",
  phone: "‪+543644522173‬",
  image: "https://avatars.githubusercontent.com/u/133779855?v=4",
  website: "github.com/joaquinstrusiat"
}

// Productos convertidos desde los datos proporcionados
const products = [
  {
    id: 1,
    name: "Campera The North Face Antora",
    description: "Campera impermeable para actividades al aire libre.",
    price: "$134.999",
    category: "Ropa e indumentaria",
    image: "https://http2.mlstatic.com/D_NQ_NP_714826-CBT81361751784_122024-O.webp",
    tags: ["campera", "impermeable", "outdoor"]
  },
  {
    id: 2,
    name: "Remera Nike Dri-FIT",
    description: "Remera deportiva con tecnología Dri-FIT que absorbe la transpiración.",
    price: "$17.999",
    category: "Ropa e indumentaria", 
    image: "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw922533bc/products/NI_CV2982-010/NI_CV2982-010-1.JPG",
    tags: ["remera", "nike", "entrenamiento"]
  },
  {
    id: 3,
    name: "Buzo Puma Essentials",
    description: "Buzo con capucha de algodón, ideal para el uso diario.",
    price: "$38.999",
    category: "Ropa e indumentaria",
    image: "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwe23b8da3/products/PU684727-01/PU684727-01-1.JPG",
    tags: ["buzo", "puma", "urbano"]
  },
  {
    id: 4,
    name: "Zapatillas Adidas Ultraboost 22",
    description: "Zapatillas running con tecnología Boost para máxima amortiguación.",
    price: "$89.999",
    category: "Ropa e indumentaria",
    image: "https://assets.adidas.com/images/w_600,f_auto,q_auto/2ae5bc18afdc4ad49b2fad75010dcaa5_9366/ZAPATILLAS_ULTRABOOST_22_Negro_GX5587_01_standard.jpg",
    tags: ["zapatillas", "running", "adidas"]
  },
  {
    id: 5,
    name: "Samsung Galaxy S24 Ultra",
    description: "Smartphone de alta gama con cámara de 200 MP, pantalla AMOLED y S-Pen.",
    price: "$1.199.999",
    category: "Tecnología",
    image: "https://www.cordobadigital.net/wp-content/uploads/2024/08/S24-Ultra-black.webp",
    tags: ["smartphone", "samsung", "android", "alta gama"]
  },
  {
    id: 6,
    name: "iPhone 15 Pro Max",
    description: "Smartphone Apple con chip A17 Pro, diseño en titanio y cámara de última generación.",
    price: "$1.649.999",
    category: "Tecnología",
    image: "https://http2.mlstatic.com/D_NQ_NP_896495-MLA71783169542_092023-O.webp",
    tags: ["smartphone", "apple", "ios", "premium"]
  }
]

export default function CatalogoProductos() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")

  const filteredProducts = selectedCategory === "Todos" 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const handleContactClick = () => {
    window.open(`mailto:${userData.email}`, '_blank')
  }

  const handlePhoneClick = () => {
    window.open(`tel:${userData.phone}`, '_blank')
  }

  const handleWebsiteClick = () => {
    window.open(`https://${userData.website}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Catálogo de Productos</h1>
          <button 
            onClick={handleContactClick}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors text-sm sm:text-base w-full sm:w-auto"
          >
            Contacto
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm border mb-6 sm:mb-8">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex-shrink-0 overflow-hidden mx-auto sm:mx-0">
                <img
                  src={userData.image}
                  alt={`${userData.name} ${userData.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {userData.name} {userData.lastName}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  Vendedor especializado en productos de tecnología y ropa deportiva. 
                  Ofrezco productos de alta calidad con garantía y el mejor servicio al cliente.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 text-sm text-gray-600">
                  <button 
                    onClick={handlePhoneClick}
                    className="flex items-center justify-center sm:justify-start gap-2 hover:text-gray-800 transition-colors p-2 sm:p-0 hover:bg-gray-50 sm:hover:bg-transparent rounded"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="break-all">{userData.phone}</span>
                  </button>
                  <button 
                    onClick={handleContactClick}
                    className="flex items-center justify-center sm:justify-start gap-2 hover:text-gray-800 transition-colors p-2 sm:p-0 hover:bg-gray-50 sm:hover:bg-transparent rounded"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="break-all">{userData.email}</span>
                  </button>
                  <button 
                    onClick={handleWebsiteClick}
                    className="flex items-center justify-center sm:justify-start gap-2 text-blue-600 hover:text-blue-800 transition-colors p-2 sm:p-0 hover:bg-blue-50 sm:hover:bg-transparent rounded"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Visitar perfil</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 text-center sm:text-left">
            Mis Productos
          </h3>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-6">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-square bg-gray-100 relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2">
                    {product.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <span className="text-base sm:text-lg font-bold text-gray-900">
                      {product.price}
                    </span>
                    <button 
                      className="flex items-center justify-center gap-1 px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors w-full sm:w-auto"
                      onClick={() => alert(`Viendo detalles de: ${product.name}`)}
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm sm:text-base">No hay productos en esta categoría.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
