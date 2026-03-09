function createStore(reducer) {
    let currentState = reducer(undefined, {});

    return {
        getState: () => currentState,
        dispatch: action => {
            currentState = reducer(currentState, action);
        }
    }
}

const initialState = {
    favorites: JSON.parse(localStorage.getItem('favorites')) || []
}

function favoritesReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_FAVORITE": {
            const addedFavorite = action.payload.favorite;
            const favorites = [...state.favorites, addedFavorite];
            localStorage.setItem('favorites', JSON.stringify(favorites))
            return { favorites };
        }
        case "REMOVE_FAVORITE": {
            const removedFavorite = action.payload.favorite;
            const favorites = state.favorites.filter(favorite => favorite.id !== removedFavorite.id);
            localStorage.setItem('favorites', JSON.stringify(favorites))
            return { favorites };
        }
        default:
            return state;
    }
}

const store = createStore(favoritesReducer);

export default store;