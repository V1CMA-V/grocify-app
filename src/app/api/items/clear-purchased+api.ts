import { clearPurchasedItems } from "@/lib/server/db-actions";

export async function POST() {
  try {
    await clearPurchasedItems();

    return Response.json({ ok: true })
  } catch (error) {
    console.error("Error clearing purchased items:", error);
    return Response.json({ ok: false, error: "Failed to clear purchased items" }, { status: 500 });
  }
}
