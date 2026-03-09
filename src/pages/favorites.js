import store from "../store";
import Story from "../components/Story";
import view from "../utils/view";
import checkFavorite from "../utils/checkFavorite";

export default function Favorites() {
    const { favorites } = store.getState();
    const hasFavorites = favorites.length > 0;

    view.innerHTML = 
     `
       <div>
           ${hasFavorites ? favorites.map((story, i) => Story({ ...story, index: i + 1, isFavorite: checkFavorite(favorites, story) })).join("") : "Add some favorites"}
       </div>
    `

        document.querySelectorAll('.favorite').forEach(favoriteButton => {
        favoriteButton.addEventListener('click', function () {
            const story = JSON.parse(this.dataset.story);
            const isFavorited = checkFavorite(favorites, story)
            store.dispatch({
                type: isFavorited ? 'REMOVE_FAVORITE' : "ADD_FAVORITE",
                payload: {
                    favorite: story
                }
            })
            Favorites();
        })
    })
}