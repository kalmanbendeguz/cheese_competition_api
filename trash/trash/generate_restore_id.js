const generate_restore_id = async () => {
  let restore_id;
  do {
    restore_id = randomstring.generate({
      length: 32,
      charset: alphanumeric,
      capitalization: lowercase,
    });
  } while (
    await Active_Password_Reset_Model.exists({ restore_id: restore_id })
  );
  return restore_id;
};
