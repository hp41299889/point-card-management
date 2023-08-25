import { Game } from "@/pages/api/game/interface";

export interface Product extends PostProduct {
  [key: string]: any;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  game: Game;
}

export interface PostProduct extends PatchProduct {
  name: string;
  gameId: number;
}

export interface PatchProduct {
  name?: string;
  note?: string;
  gameId?: number;
  game?: Game;
}
