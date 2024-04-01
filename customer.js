const mongoose = require("mongoose");
const { Schema } = mongoose;

main()
  .then(() => console.log("connection successful"))
  .catch((err) => console.error(err));

async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/myapp");
    console.log("MongoDB connected successfully!");
    await addOrders(); // Wait for orders to be added before adding customer
    await addCustomer();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

const orderSchema = new Schema({
  item: String,
  price: Number
});

const customerSchema = new Schema({
  name: String,
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order"
    }
  ]
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const addOrders = async () => {
  try {
    let res = await Order.insertMany([
      { item: "samosa", price: 12 },
      { item: "chips", price: 10 },
      { item: "chocolate", price: 40 }
    ]);
    console.log("Orders added successfully:", res);
  } catch (error) {
    console.error("Error adding orders:", error);
  }
};

const addCustomer = async () => {
  try {
    let cust1 = new Customer({ name: "rahul kumar" });

    let order1 = await Order.findOne({ item: "chips" });
    let order2 = await Order.findOne({ item: "chocolate" });

    cust1.orders.push(order1);
    cust1.orders.push(order2);

    let result = await cust1.save();
    console.log("Customer added successfully:", result);
  } catch (error) {
    console.error("Error adding customer:", error);
  }
};
