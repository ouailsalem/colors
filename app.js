const box = document.querySelectorAll('#box');
const game = document.querySelector('.game');
let timer;
let clicks = 0;
let loading = false;
const start = document.getElementById('start')
const miserable = document.getElementById('miserable')
const trackerspan = document.getElementById('tracker')

let arr = ["red", "magenta", "blue", "black", "pink", "green", "red", "magenta", "blue", "black", "pink", "green"];

let boxClicked = [];
let successBoxes = [];

start.addEventListener('click', () => {

    for (let i = 0; i < 12; i++) {
        box[i].style.backgroundColor = "white"
    }
    clicks = 0;
    trackerspan.innerHTML = clicks;
    start.style.display ="none";
    play()
})

function play() {
    clicks = 0;
    shuffle(arr);
    for (let i = 0; i < 12; i++) {
        if (loading) {
            return;
        } else {
            box[i].addEventListener("click", (e) => {
                if (successBoxes.includes(box[i])) {
                    return
                }
                else {
                    loading = true;
                    box[i].style.backgroundColor = arr[i];
                    boxClicked.push(box[i]);
                    setTimeout(() => {
                        if (boxClicked.length > 1) {
                            if (boxClicked[1].style.backgroundColor == boxClicked[0].style.backgroundColor && boxClicked[1].classList !== boxClicked[0].classList) {
                                clicks++;
                                successBoxes.push(boxClicked[1]);
                                successBoxes.push(boxClicked[0]);
                                boxClicked = [];
                                trackerspan.innerHTML = clicks;

                                if (successBoxes.length == 12) {
                                    game.style.display = "none";
                                    miserable.style.display = "block";
                                }
                            } else {
                                boxClicked[0].style.backgroundColor = "white";
                                boxClicked[1].style.backgroundColor = "white";
                                clicks++;
                                boxClicked = [];
                                trackerspan.innerHTML = clicks
                            }
                        }
                        loading = false;
                    }, 150)

                }


            })
        }
    }
}


function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}


