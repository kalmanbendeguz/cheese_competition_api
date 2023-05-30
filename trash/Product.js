const get_product = async (query, user) => {
  // always send back an array.
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update_product = async (query, body, user) => {
  // if query finds one, one will be updated. if it finds more, then more
  // body cannot be array. we can only update using one update object!

  // if query finds one, only one will be updated.
  // want to authorize like this:
  // query = authorize(query)
  // document = authorize(document)
  // document + verb + user
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const delete_product = async (query, user) => {
  // any document that matches the filter will be deleted.
  // if a unique field is provided, this will be one document.
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
