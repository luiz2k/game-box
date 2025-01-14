import data from "./data.json";

export type Game = {
  id: number;
  title: string;
  genre: string[];
  developer: string[];
  distributor: string[];
  release_date: string;
  cover: string;
  summary: string;
};
