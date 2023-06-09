//The data:
const people = [
    { name: "Jane", pic: "http://knight.gamebanana.com/img/ico/sprays/patrick_star_preview_2.png", score: 300 },
    { name: "Brenda", pic: "https://3.bp.blogspot.com/-_3f5QzVwocE/U3G4_PeOoTI/AAAAAAAAeC0/uanC3ua1cu4/s1600/OldSpongeBobStock5-25-13.png", score: 10} ,
    { name: "Wanda", pic: "https://3.bp.blogspot.com/-_3f5QzVwocE/U3G4_PeOoTI/AAAAAAAAeC0/uanC3ua1cu4/s1600/OldSpongeBobStock5-25-13.png", score: 60 },
    { name: "Maria", pic: "http://knight.gamebanana.com/img/ico/sprays/patrick_star_preview_2.png", score: 80 },
    { name: "Jasper", pic: "https://3.bp.blogspot.com/-_3f5QzVwocE/U3G4_PeOoTI/AAAAAAAAeC0/uanC3ua1cu4/s1600/OldSpongeBobStock5-25-13.png", score: 600 },
    { name: "Malik", pic: "http://knight.gamebanana.com/img/ico/sprays/patrick_star_preview_2.png", score: 40 }
];

const playerToHTML = (player) => {
    return `<div class="card">
            <img src="${player.pic}">
            <p>${player.name}'s high score is: ${player.score}</p>
    </div>`;
}

for(const player of people) {
    // for each payer:
    // 1. Create an HTML chunk to represent them
    // 2. Target an element in your document and add this HTML chunk as a chi element.

    // 1.
    const html = playerToHTML(player);

    // 2.
    document.querySelector(card.player);
}

/**
 * Your job:
 * Loop through the people array and create a card for all of the
 * players. 
 *   * Create a function that generates a card from a template
 *   * Use the build-in map method to apply the template to each person
 *   * Add the rendered templates to the DOM
 */