const BASE_URL = 'https://www.dnd5eapi.co'

export async function getAllSpells() {
    const spellIndexes = await fetch(BASE_URL + "/api/spells")
    .then((response) => response.json());
}
