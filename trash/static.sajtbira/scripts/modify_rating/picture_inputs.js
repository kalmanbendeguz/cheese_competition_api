const max_file_size_in_bytes = 524288,
  add_picture_button = document.querySelector("#add_picture"),
  remove_picture_buttons = document.querySelectorAll(".remove_picture_button"),
  picture_inputs = document.querySelectorAll(".picture_input"),
  picture_previews = document.querySelector(".picture_preview");
add_picture_button.addEventListener("click", on_add_picture_button_click);
for (let e of remove_picture_buttons)
  e.addEventListener("click", on_remove_picture_button_click);
function on_add_picture_button_click(e) {
  const t = document.querySelectorAll(
    'div.picture_input_block[style*="display: none;"], div.picture_input_block[style*="display:none;"], div.picture_input_block[style*="display: none"], div.picture_input_block[style*="display:none"]'
  );
  if (1 === t.length) {
    e.target.disabled = !0;
    document.querySelector("#max_picture_count_reached").style.display = "flex";
  }
  const r = t[0],
    i = r.querySelector("input"),
    o = r.querySelector(".picture_input_label");
  (i.disabled = !1),
    (r.style.display = "flex"),
    (i.style.display = "flex"),
    (o.style.display = "flex");
}
function on_remove_picture_button_click(e) {
  e.target.parentNode.style.display = "none";
  (document.querySelector("#max_picture_count_reached").style.display = "none"),
    (add_picture_button.disabled = !1);
  e.target.parentNode.querySelector("input").disabled = !0;
  e.target.parentNode.querySelector(".picture_preview").innerHTML = "";
  (e.target.parentNode.querySelector(".progress_bar").style.display = "none"),
    e.target.parentNode.parentNode.appendChild(e.target.parentNode),
    (e.target.style.display = "none");
}
for (let e of picture_inputs)
  (e.style.opacity = 0), e.addEventListener("change", update_image_display);
const compress_options = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 1920,
  useWebWorker: !0,
  fileType: "image/png",
};
async function update_image_display(e) {
  const t = e.target.parentNode.querySelector(".picture_preview"),
    r = e.target.parentNode.querySelector(".picture_input"),
    i = e.target.parentNode.querySelector(".progress_bar"),
    o = e.target.parentNode.querySelector(".remove_picture_button"),
    n = e.target.parentNode.querySelector(".picture_input_label");
  if (
    ((r.style.display = "none"),
    (n.style.display = "none"),
    t.hasChildNodes() && (t.innerHTML = ""),
    0 === r.files.length)
  )
    return;
  i.style.display = "flex";
  try {
    const e = await imageCompression(r.files[0], {
        ...compress_options,
        onProgress: picture_compress_on_progress(i),
      }),
      t = new File([e], e.name, { type: e.type }),
      o = new DataTransfer();
    o.items.add(t), (r.files = o.files);
  } catch (e) {
    console.log(e);
  }
  const l = document.createElement("img");
  (l.src = URL.createObjectURL(r.files[0])),
    console.log(`current_file.size: ${r.files[0].size}`),
    (t.innerHTML = ""),
    t.appendChild(l),
    (o.style.display = "flex");
}
function picture_compress_on_progress(e) {
  return function (t) {
    e.style.setProperty("--width", t),
      100 === t &&
        ((e.style.display = "none"), e.style.setProperty("--width", 0));
  };
}
const preloaded_picture_blocks = document.querySelectorAll(
  "div.picture_input_block.preloaded"
);
for (let e = 0; e < preloaded_picture_blocks.length; ++e) {
  const t = preloaded_picture_blocks[e].querySelector(".picture_input"),
    r = new DataTransfer(),
    i = preloaded_picture_blocks[e]
      .querySelector(".picture_preview")
      .querySelector("img").src;
  fetch(i)
    .then((e) => e.blob())
    .then((i) => {
      const o = new File([i], `picture_${e + 1}.png`, { type: i.type });
      r.items.add(o), (t.files = r.files);
    });
}
if (5 === preloaded_picture_blocks.length) {
  add_picture_button.disabled = !0;
  document.querySelector("#max_picture_count_reached").style.display = "flex";
}
