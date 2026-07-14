import {
  deleteGroceryItem,
  setGroceryItemPurchased,
  updateGroceryItemQuantity,
} from '@/lib/server/db-actions'

export async function PATCH(request: Request, { id }: { id: string }) {
  try {
    const body = await request.json()

    const item = body.quantity
      ? await updateGroceryItemQuantity(id, body.quantity)
      : await setGroceryItemPurchased(id, body.purchased ?? true)

    if (!item)
      return Response.json({ error: 'Item not found' }, { status: 404 })

    return Response.json({ ok: true, item })
  } catch (error) {
    console.error('Error updating grocery item:', error)
    return Response.json(
      { ok: false, error: 'Failed to update grocery item' },
      { status: 500 },
    )
  }
}

export async function DELETE(_request: Request, { id }: { id: string }) {
  try {
    await deleteGroceryItem(id)

    return Response.json({ ok: true })
  } catch (error) {
    console.error('Error deleting grocery item:', error)
    return Response.json(
      { ok: false, error: 'Failed to delete grocery item' },
      { status: 500 },
    )
  }
}
