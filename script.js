/** @type {SVGCircleElement} */

const circle = document.getElementById("progress_circle");
const bar_label = document.getElementById("bar_label");
const percent_texts = document.querySelectorAll(".percent_text")

let radius;
let u;

window.addEventListener("load", () => {
    radius = circle.r.baseVal.value;

    u = radius * 2 * Math.PI;

    circle.style.strokeDasharray = u.toString();
    circle.style.strokeDashoffset = u.toString();

    progress(Math.random() * 100)
})

function progress(percent) {
    if (percent > 100 || percent < 0 ||  typeof percent !== "number") {
        console.error("Sytax error:\n[line 12]: progress(percent)\npercent must be an number in the range from 0 to 100")
        return
    }

    circle.style.strokeDashoffset = u - (u / 100) * percent;
    bar_label.style.transform = `translateX(-${100 - percent}%)`;

    let curr_percent_text = (percent.toString().split(".")[1] !== undefined) ? parseFloat("0." + percent.toFixed(1).split(".")[1]) : 0;
    let speed = 1000 / percent;
    
    let count = setInterval(() => {
        percent_texts.forEach((element) => {
            element.innerText = curr_percent_text + "%";
        })
        if (Math.round(curr_percent_text) === Math.round(percent)) clearInterval(count);
        curr_percent_text++;
    }, speed)
}

