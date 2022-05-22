/**
 * It takes an id, checks if it's in the localStorage, if it is, it removes it, if it isn't, it adds
 * it.
 * @param {number} id - number - the id of the pokemon
 */
const favoriteToggle = (id: number) => {


    let favorits: number[] = JSON.parse(localStorage.getItem("pokeFavorits") || "[]");

    favorits.includes(id) ? favorits = favorits.filter((pokId) => pokId !== id) : favorits.push(id);

    localStorage.setItem("pokeFavorits", JSON.stringify(favorits))


}

/**
 * It checks if the id is in the favorits array
 * @param {number} id - number - the id of the pokemon
 * @returns A function that takes an id and returns a boolean.
 */
const ifExistPokeInFavorits = (id:number):boolean => {

    if (typeof window === "undefined")  return false;

    const favorits: number[] = JSON.parse(localStorage.getItem("pokeFavorits") || "[]");

    return favorits.includes(id)
}

/**
 * It returns an array of numbers, or an empty array if the localStorage item "pokeFavorits" is not
 * set.
 * @returns An array of numbers.
 */
const pokemons = ():number[] => {
    return JSON.parse(localStorage.getItem("pokeFavorits") || "")
}

export default {
    favoriteToggle,
    ifExistPokeInFavorits,
    pokemons
}