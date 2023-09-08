const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const modalMensagem = document.getElementById('modal-mensagem')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <div id="clicavel" onclick="showPokemonDetrails('${pokemon.name}')">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
        </div>
    `
}

function createModal(pokemon) {
    return `    
        <div class="modal-dialog">
            <div class="modal-content ${pokemon.type}">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span>×</span></button>
                    <h4 class="modal-title">${pokemon.name} #${pokemon.number} </h4>
                </div>
                <div class="modal-body">
                    
                    <img src="${pokemon.photo}"
                    alt="${pokemon.name}">

                    <ol class="pokemonInfo">
                         ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>     

                    <div class = "status">
                        <p>Base stats:</p>
                        <p>height: ${pokemon.height}</p>
                        <p>weight: ${pokemon.weight}</p>
                        <p>HP: ${pokemon.HP}</p>
                        <p>attack: ${pokemon.attack}</p>
                        <p>defense: ${pokemon.defense}</p>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>`
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function showPokemonDetrails(pokemonName){

    pokeApi.getPokemon(pokemonName).then((pokemon) => {
        modalMensagem.innerHTML = createModal(pokemon)
    })

    $("#modal-mensagem").modal();
}
