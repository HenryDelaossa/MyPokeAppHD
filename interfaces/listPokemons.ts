export interface ResponsePokemons {
    count:    number;
    next?:     string;
    previous?: string;
    results:  PokemonsSmall[];
}

export interface PokemonsSmall {
    name: string;
    url:  string;
    id: number;
    img: string
}
