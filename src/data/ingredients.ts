import type { IIngredient } from '@/types/game.types';
import dragonTears from '@/assets/icons/dragon-tears.svg?raw';
import fairyDust from '@/assets/icons/fairy-dust.svg?raw';
import frostLotus from '@/assets/icons/frost-lotus.svg?raw';
import mandrakeRoot from '@/assets/icons/mandrake-root.svg?raw';
import causticAcid from '@/assets/icons/caustic-acid.svg?raw';
import essenceOfTheVoid from '@/assets/icons/essence-of-the-void.svg?raw';
import phoenixFeather from '@/assets/icons/phoenix-feather.svg?raw';
import toadSlime from '@/assets/icons/toad-slime.svg?raw';

export const INGREDIENTS: readonly IIngredient[] = [
  {
    id: 'dragon-tears',
    name: 'Dragon Tears',
    icon: dragonTears,
    temperature: 25,
    density: 8,
    magicPower: 10,
  },
  {
    id: 'fairy-dust',
    name: 'Fairy Dust',
    icon: fairyDust,
    temperature: 12,
    density: 9,
    magicPower: 12,
  },
  {
    id: 'frost-lotus',
    name: 'Frost Lotus',
    icon: frostLotus,
    temperature: -18,
    density: 4,
    magicPower: 14,
  },
  {
    id: 'mandrake-root',
    name: 'Mandrake Root',
    icon: mandrakeRoot,
    temperature: -5,
    density: 20,
    magicPower: 8,
  },
  {
    id: 'caustic-acid',
    name: 'Caustic Acid',
    icon: causticAcid,
    temperature: 10,
    density: 14,
    magicPower: 22,
  },
  {
    id: 'essence-of-the-void',
    name: 'Essence of the Void',
    icon: essenceOfTheVoid,
    temperature: -20,
    density: -10,
    magicPower: 40,
  },
  {
    id: 'phoenix-feather',
    name: 'Phoenix Feather',
    icon: phoenixFeather,
    temperature: 50,
    density: -10,
    magicPower: 30,
  },
  {
    id: 'toad-slime',
    name: 'Toad Slime',
    icon: toadSlime,
    temperature: 5,
    density: 30,
    magicPower: 0,
  },
];

export function findIngredient(id: string): IIngredient | undefined {
  return INGREDIENTS.find((ingredient) => ingredient.id === id);
}

export function getShelfIngredients(shelfSize: number): IIngredient[] {
  return INGREDIENTS.slice(0, shelfSize);
}
