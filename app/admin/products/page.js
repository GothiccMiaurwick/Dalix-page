"use client";

import { useState, useEffect } from "react";
import { generateSlug } from "@/lib/utils";

function ProductForm({ productToEdit, onFormSubmit, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
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
    } else {
      setTitle("");
      setSlug("");
      setPrice("");
      setImage("");
      setDescription("");
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
      // Also update the slug field to show the user the sanitized version
      setSlug(finalSlug);
      return;
    }

    const productData = {
      title,
      slug: finalSlug, // Use the sanitized slug
      price: parseInt(price),
      image,
      description,
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
            Título
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
            Slug
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
            Precio (en pesos)
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
            Ruta de Imagen (ej: /img/RopaDalix1.jpg)
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
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
    setEditingProduct(null); // Exit editing mode
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

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Administrar Productos</h1>

      <ProductForm
        productToEdit={editingProduct}
        onFormSubmit={handleFormSubmit}
        onCancelEdit={() => setEditingProduct(null)}
      />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Lista de Productos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Precio</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="py-2 px-4 border-b">{product.id}</td>
                  <td className="py-2 px-4 border-b">{product.title}</td>
                  <td className="py-2 px-4 border-b">
                    {product.formatted_price}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
