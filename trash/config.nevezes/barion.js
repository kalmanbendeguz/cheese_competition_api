const Barion = require("node-barion");

const barion = new Barion({
  //POSKey: '325cc0fd-021a-49e9-b04f-406705546edd', // prod
  POSKey: "b3a30b131f924c249b4a00ffbb55fa17", // test
  Environment: "test",
  Secure: true,
  FundingSources: ["All"],
  GuestCheckOut: true,
  Locale: "hu-HU",
});

module.exports = barion;
