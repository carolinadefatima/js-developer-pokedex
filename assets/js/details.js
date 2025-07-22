const detailsContainer = document.querySelector('.details');

const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD"
};

const params = new URLSearchParams(window.location.search);
const number = params.get('number');

if (!number) {
    detailsContainer.innerHTML = '<h1>Pokémon não encontrado.</h1>';
} else {
    fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
        .then(response => response.json())
        .then(poke => {
            const types = poke.types.map(t => t.type.name);

            // Limpa classes antigas
            detailsContainer.className = 'details';

            // Define fundo com base nos tipos
            const color1 = typeColors[types[0]];
            const color2 = types[1] ? typeColors[types[1]] : color1;

            detailsContainer.style.background = `linear-gradient(135deg, ${color1}, ${color2})`;

            // Conteúdo
            detailsContainer.innerHTML = `
                <h1>#${poke.id} - ${poke.name}</h1>
                <img src="${poke.sprites.other['official-artwork'].front_default || poke.sprites.front_default}" alt="${poke.name}">
                <p><strong>Altura:</strong> ${poke.height / 10} m</p>
                <p><strong>Peso:</strong> ${poke.weight / 10} kg</p>
                <p><strong>Habilidades:</strong> ${poke.abilities.map(a => a.ability.name).join(', ')}</p>
                <p><strong>Tipos:</strong> ${types.join(', ')}</p>
                <h2>Stats:</h2>
                <div>
                ${poke.stats.map(s => `<p>${s.stat.name}: ${s.base_stat}</p>`).join('')}
                </div>

            `;
        })
        .catch(error => {
            console.error(error);
            detailsContainer.innerHTML = '<h1>Erro ao carregar Pokémon.</h1>';
        });
}
