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
  email: String
});

const postSchema = new Schema({
    content :String,
    Likes: Number,
    user:{
    type: Schema.Types.ObjectId,
    ref: "User"
    }
})


const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const addData = async () => {
    let user1 = await user.findOne({username: "rahulkumar"});
    
    let post1 = new Post({
        content: "by by",
        Likes: 23
    })
    
    post2.user = user1;


    await post2.save();

}
addData();