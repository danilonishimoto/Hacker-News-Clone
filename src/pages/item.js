import baseUrl from "../utils/baseUrl";
import view from "../utils/view";
import Story from "../components/Story";
import Comment from "../components/Comment";

export default async function Item() {
    let story = null;
    let hasError = false;
    let hasComments = false;

    try {
        story = await getStory();
        hasComments = story.comments.length > 0;
    } catch (error) {
        hasError = true;
    }

    if(hasError) {
            view.innerHTML = `<div class='error'>Error fetching story</div>`
    }

    view.innerHTML = `
    <div>
        ${Story(story)}
    </div>
    <hr/>
    ${hasComments ? story.comments.map((comment) => Comment(comment)).join('') : 'No comments'}
    `
}

async function getStory() {
    const storyId = window.location.hash.split('?id=')[1];
    const response = await fetch(`${baseUrl}/item/${storyId}`);
    const story = await response.json();

    return story;
}