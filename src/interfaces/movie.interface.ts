export interface Movie {
  title: string,
  description: string,
  shortDescription: string,
  duration: number,
  created_at?: string,
  releaseDate: string,
  images: MovieImages,
  genres: [string],
  actors?: [string],
  platformProduct?: boolean,  
}

export interface MovieImages {
  cover: string,
  poster?: string,
  captures?: [string]
}