const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("connection successful"))
  .catch((err) => console.error(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/myapp");
}

const userSchema = new Schema({
  username: String,
  addresses: [{
    _id: false,
    location: String,
    city: String
  }]
});

const User = mongoose.model("User", userSchema);

const addUsers = async () => {
  let user1 = new User({
    username: "shekholder",
    addresses: [{
      location: "2218 bakers street",
      city: "London"
    }]
  });

  user1.addresses.push({ location: "P32 Wallstreet", city: "London" });
  let result = await user1.save();
  console.log(result);
};

addUsers();
