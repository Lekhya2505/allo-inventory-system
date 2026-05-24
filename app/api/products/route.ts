import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const inventories = await prisma.inventory.findMany({
    include: {
      product: true,
      warehouse: true,
    },
  });

  const formatted = inventories.map((item) => ({
    inventoryId: item.id,
    product: item.product.name,
    warehouse: item.warehouse.name,
    totalStock: item.totalStock,
    reservedStock: item.reservedStock,
    availableStock: item.totalStock - item.reservedStock,
    productId: item.productId,
    warehouseId: item.warehouseId,
  }));

  return NextResponse.json(formatted);
}