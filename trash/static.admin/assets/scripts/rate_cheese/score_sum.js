const score_inputs = document.querySelectorAll("input.score_input");

score_inputs.forEach((score_input) => {
  score_input.addEventListener("change", on_score_change);
});

const score_sum_div = document.querySelector("div[id=score_sum]");

function on_score_change(e) {
  let score_sum = 0;
  score_inputs.forEach((score_input) => {
    const partial_sum = parseInt(score_input.value);
    if (!Number.isNaN(partial_sum)) score_sum += partial_sum;
  });
  score_sum_div.innerText = score_sum;
}

on_score_change(null);
