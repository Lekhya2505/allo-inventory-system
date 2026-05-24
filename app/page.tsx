"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  async function fetchProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function reserve(productId: string, warehouseId: string) {
    const res = await fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        warehouseId,
        quantity: 1,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Reservation successful");
      fetchProducts();
    } else {
      setMessage(data.error);
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Inventory System
      </h1>

      <p className="mb-4 text-blue-600">
        {message}
      </p>

      <div className="space-y-4">
        {products.map((item) => (
          <div
            key={item.inventoryId}
            className="border p-4 rounded"
          >
            <h2 className="text-xl font-semibold">
              {item.product}
            </h2>

            <p>Warehouse: {item.warehouse}</p>

            <p>
              Available Stock: {item.availableStock}
            </p>

            <button
              disabled={item.availableStock === 0}
              onClick={() =>
                reserve(
                  item.productId,
                  item.warehouseId
                )
              }
              className="mt-2 bg-black text-white px-4 py-2 rounded disabled:bg-gray-500"
            >
              {item.availableStock === 0
                ? "Out of Stock"
                : "Reserve"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}