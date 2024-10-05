db = db.getSiblingDB("mongo_db");

db.createUser({
  user: "user",
  pwd: "password",
  roles: [{ role: "dbOwner", db: "mongo_db" }]
});
