import view from "../utils/view";
import Story from "./Story";

export default async function Item() {
    const story = await getStory();
    view.innerHTML = `
    <div>
        ${Story(story)}
    </div>`
}

async function getStory() {
    const storyId = window.location.hash.split('?id=')[1];
    const response = await fetch(`https://node-hnapi.herokuapp.com/item/${storyId}`);
    const story = await response.json();

    return story;
}