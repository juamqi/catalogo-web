import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Phone, Mail, Loader2 } from "lucide-react"
import userProducts from "./query"

export default function CatalogoProductos() {
  const [searchParams] = useSearchParams()
  const email = searchParams.get("email")

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [order, setOrder] = useState("none")

  useEffect(() => {
    if (!email) return
    const fetchUser = async () => {
      setLoading(true)
      try {
        const res = await fetch("https://realnodegraphapi-production.up.railway.app/api/findUsers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userProducts(email))
        })
        const data = await res.json()
        setUser(data.items?.[0] || null)
        setError(null)
      } catch {
        setError("Hubo un error al cargar los datos.")
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [email])

  const products = useMemo(() => {
    if (!user?.saved_product) return []
    return user.saved_product.map(({ product, props }) => {
      const basePrice = product.props.price
      let finalPrice = basePrice
      if (props.type_of_profit === "mount") finalPrice += props.value
      else if (props.type_of_profit === "percentage") finalPrice += basePrice * (props.value / 100)
      return {
        ...product,
        image: product.props.images?.[0],
        rawPrice: finalPrice,
        price: `$${finalPrice.toLocaleString("es-AR", { maximumFractionDigits: 2 })}`
      }
    })
  }, [user])

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category))
    return ["Todos", ...Array.from(set)]
  }, [products])

  const filteredProducts = useMemo(() => {
    let list = selectedCategory === "Todos" ? products : products.filter(p => p.category === selectedCategory)
    if (order === "asc") list = [...list].sort((a, b) => a.rawPrice - b.rawPrice)
    if (order === "desc") list = [...list].sort((a, b) => b.rawPrice - a.rawPrice)
    return list
  }, [products, selectedCategory, order])

  if (!email) return <div className="text-center py-20 text-blue-600 text-xl">URL inválida: falta el email.</div>
  if (loading) return <div className="flex justify-center py-20 text-blue-600 text-xl"><Loader2 className="animate-spin mr-2" /> Cargando...</div>
  if (error) return <div className="text-center py-20 text-red-500 text-lg">{error}</div>
  if (!user) return <div className="text-center py-20 text-blue-600 text-lg">Usuario no encontrado.</div>
  if (!products.length) return <div className="text-center py-20 text-blue-600 text-lg">Este usuario no tiene productos guardados.</div>

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Catálogo de Productos</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Perfil */}
        <div className="bg-white rounded-lg shadow-md border-blue-400 border mb-6 p-6 flex flex-col sm:flex-row gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500">
            <img  
            src={user.image || "https://thumbs.dreamstime.com/b/vector-de-perfil-avatar-predeterminado-foto-usuario-medios-sociales-icono-183042379.jpg"} 
            alt={user.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-1">{user.name} {user.last_name}</h2>
            <p className="text-blue-600 mb-2">Vendedor destacado</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <button className="flex items-center gap-2 text-blue-600">
                <Phone className="w-4 h-4" />{user.phone || "No especificado"}
              </button>
              <button className="flex items-center gap-2 text-blue-600">
                <Mail className="w-4 h-4" />{user.email}
              </button>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm border ${selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border-blue-300 hover:bg-blue-100"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
          <select
            value={order}
            onChange={e => setOrder(e.target.value)}
            className="border border-blue-300 rounded px-3 py-2 text-sm bg-white"
          >
            <option value="none">Ordenar por</option>
            <option value="asc">Precio: menor a mayor</option>
            <option value="desc">Precio: mayor a menor</option>
          </select>
        </div>

        {/* Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <div key={idx} className="bg-white border border-blue-100 rounded-lg shadow hover:shadow-lg transition">
              <div className="aspect-square bg-blue-50">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-blue-900">{product.name}</h3>
                <p className="text-sm text-blue-700 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex flex-wrap gap-1 text-xs mb-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{tag}</span>
                  ))}
                </div>
                <div className="flex justify-end items-center">
                  <span className="text-lg font-bold text-blue-800">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}