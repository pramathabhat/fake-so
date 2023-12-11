const mongoose = require("mongoose");

class Database {
  constructor() {
    if (!Database.instance) {
      this.connection = "mongodb://127.0.0.1:27017/fake_so";
      this.isConnectedToDB = false;
      Database.instance = this;
    }

    return Database.instance;
  }

  async connect() {
    if (this.isConnectedToDB) {
      return;
    }

    await mongoose.connect(this.connection);
    this.isConnectedToDB = true;
  }

  disconnect() {
    if (this.isConnectedToDB) {
      mongoose.disconnect();
      this.isConnectedToDB = false;
    }
  }
}

const databaseInstance = new Database();

databaseInstance.connect();

module.exports = databaseInstance;
