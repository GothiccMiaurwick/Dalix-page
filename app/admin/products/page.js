"use client";

import { useState, useEffect } from "react";
import { generateSlug } from "@/lib/utils";

function ProductForm({ productToEdit, onFormSubmit, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [collection, setCollection] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const isEditing = !!productToEdit;

  // Effect to auto-generate slug from title
  useEffect(() => {
    if (!isEditing) {
      setSlug(generateSlug(title));
    }
  }, [title, isEditing]);

  // Effect to populate form when editing
  useEffect(() => {
    if (isEditing) {
      setTitle(productToEdit.title);
      setSlug(productToEdit.slug);
      setPrice(productToEdit.price.toString());
      setImage(productToEdit.image);
      setDescription(productToEdit.description || "");
      setIsFeatured(productToEdit.is_featured || false);
      setCollection(productToEdit.collection || "");
    } else {
      setTitle("");
      setSlug("");
      setPrice("");
      setImage("");
      setDescription("");
      setIsFeatured(false);
      setCollection("");
    }
    setError(null);
    setSuccess(null);
  }, [productToEdit, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const finalSlug = generateSlug(slug);

    if (!title || !finalSlug || !price || !image) {
      setError(
        "Por favor, completa los campos requeridos: Título, Slug, Precio, Imagen.",
      );
      setSlug(finalSlug);
      return;
    }

    const productData = {
      title,
      slug: finalSlug,
      price: parseInt(price),
      image,
      description,
      is_featured: isFeatured,
      collection: collection || null,
    };

    try {
      const url = isEditing
        ? `/api/products/${productToEdit.id}`
        : "/api/products";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Algo salió mal");
      }

      const result = await response.json();
      setSuccess(
        isEditing
          ? `¡Producto "${result.title}" actualizado!`
          : `¡Producto "${result.title}" creado!`,
      );

      onFormSubmit(result);

      if (!isEditing) {
        setTitle("");
        setSlug("");
        setPrice("");
        setImage("");
        setDescription("");
        setIsFeatured(false);
        setCollection("");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg bg-gray-50 mb-8"
    >
      <h2 className="text-xl font-semibold">
        {isEditing
          ? `Editando: ${productToEdit.title}`
          : "Crear Nuevo Producto"}
      </h2>
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      {success && (
        <div className="p-3 bg-green-100 text-green-700 rounded">{success}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Título *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700"
          >
            Slug *
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            onBlur={(e) => setSlug(generateSlug(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Precio (en pesos) *
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Ruta de Imagen (ej: /img/RopaDalix1.jpg) *
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="collection"
            className="block text-sm font-medium text-gray-700"
          >
            Colección (ej: Temporada 2025)
          </label>
          <input
            type="text"
            id="collection"
            value={collection}
            onChange={(e) => setCollection(e.target.value)}
            placeholder="Opcional"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="flex items-center pt-6">
          <input
            type="checkbox"
            id="isFeatured"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
          />
          <label
            htmlFor="isFeatured"
            className="ml-2 block text-sm font-medium text-gray-700"
          >
            Destacar en Colección
          </label>
        </div>
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descripción
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        ></textarea>
      </div>
      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
        >
          {isEditing ? "Actualizar Producto" : "Crear Producto"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filterFeatured, setFilterFeatured] = useState("all"); // all, featured, not-featured

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Error fetching products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFormSubmit = (resultProduct) => {
    if (editingProduct) {
      // Update
      setProducts(
        products.map((p) => (p.id === resultProduct.id ? resultProduct : p)),
      );
    } else {
      // Create
      setProducts((prevProducts) => [resultProduct, ...prevProducts]);
    }
    setEditingProduct(null);
  };

  const handleDelete = async (productId) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este producto?")
    ) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error al eliminar el producto");
        }
        setProducts(products.filter((p) => p.id !== productId));
        alert("Producto eliminado con éxito");
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert(error.message);
      }
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFeatured = async (product) => {
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...product,
          is_featured: !product.is_featured,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el producto");
      }

      const updatedProduct = await response.json();
      setProducts(
        products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
      );
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar el producto");
    }
  };

  const filteredProducts = products.filter((product) => {
    if (filterFeatured === "featured") return product.is_featured;
    if (filterFeatured === "not-featured") return !product.is_featured;
    return true;
  });

  const featuredCount = products.filter((p) => p.is_featured).length;

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Administrar Productos</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-medium">Total Productos</p>
          <p className="text-3xl font-bold text-blue-900">{products.length}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-600 font-medium">En Colección</p>
          <p className="text-3xl font-bold text-green-900">{featuredCount}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-600 font-medium">Sin Destacar</p>
          <p className="text-3xl font-bold text-purple-900">
            {products.length - featuredCount}
          </p>
        </div>
      </div>

      <ProductForm
        productToEdit={editingProduct}
        onFormSubmit={handleFormSubmit}
        onCancelEdit={() => setEditingProduct(null)}
      />

      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Lista de Productos</h2>

          {/* Filter Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilterFeatured("all")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterFeatured === "all"
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Todos ({products.length})
            </button>
            <button
              onClick={() => setFilterFeatured("featured")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterFeatured === "featured"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              En Colección ({featuredCount})
            </button>
            <button
              onClick={() => setFilterFeatured("not-featured")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                filterFeatured === "not-featured"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Sin Destacar ({products.length - featuredCount})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                  Nombre
                </th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                  Precio
                </th>
                <th className="py-3 px-4 border-b text-left text-sm font-semibold text-gray-700">
                  Colección
                </th>
                <th className="py-3 px-4 border-b text-center text-sm font-semibold text-gray-700">
                  Destacado
                </th>
                <th className="py-3 px-4 border-b text-center text-sm font-semibold text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 border-b text-sm">{product.id}</td>
                  <td className="py-3 px-4 border-b text-sm font-medium">
                    {product.title}
                  </td>
                  <td className="py-3 px-4 border-b text-sm">
                    {product.formatted_price}
                  </td>
                  <td className="py-3 px-4 border-b text-sm">
                    {product.collection ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {product.collection}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">
                        Sin colección
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <button
                      onClick={() => toggleFeatured(product)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        product.is_featured
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {product.is_featured ? (
                        <>
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Sí
                        </>
                      ) : (
                        "No"
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600 text-sm transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No hay productos en esta categoría
          </div>
        )}
      </div>
    </div>
  );
}
