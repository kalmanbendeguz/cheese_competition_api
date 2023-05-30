const score_inputs = document.querySelectorAll("input.score_input");
score_inputs.forEach((e) => {
  e.addEventListener("change", on_score_change);
});
const score_sum_div = document.querySelector("div[id=score_sum]");
function on_score_change(e) {
  let n = 0;
  score_inputs.forEach((e) => {
    const c = parseInt(e.value);
    Number.isNaN(c) || (n += c);
  }),
    (score_sum_div.innerText = n);
}
on_score_change(null);
