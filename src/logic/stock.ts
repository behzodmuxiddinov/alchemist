import type { IIngredient } from '@/types/game.types';

const MIN_STOCK = 2;
const MAX_STOCK = 15;

export function createStock(
  ingredients: readonly IIngredient[],
): Record<string, number> {
  const stock: Record<string, number> = {};

  for (const ingredient of ingredients) {
    stock[ingredient.id] =
      Math.floor(Math.random() * (MAX_STOCK - MIN_STOCK + 1)) + MIN_STOCK;
  }

  return stock;
}

export function getStock(stock: Record<string, number>, id: string): number {
  return stock[id] ?? 0;
}

export function hasStock(stock: Record<string, number>, id: string): boolean {
  return getStock(stock, id) > 0;
}

export function decreaseStock(
  stock: Record<string, number>,
  id: string,
): Record<string, number> {
  return hasStock(stock, id)
    ? { ...stock, [id]: getStock(stock, id) - 1 }
    : stock;
}
