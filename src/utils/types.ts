export type Song = {
  title: string;
  album: string;
  albumImage: string;
  duration: number;
  rating: number;
};

export type Hobby = {
  title: string;
  description: string;
  imageUrl?: string; // optional, falls back to a gradient
};
