// // require packages
// var inquirer = require("inquirer");
// var mysql = require("mysql");
// const { table } = require("table");

// // config database
// connection: mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "root",
//     database: "bamazon_DB"
// });

var customer = require("./bamazon_Customer");

customer.test();

// inquirer.prompt([

//     {
//         name: "welcome",
//         type: "list",
//         message: "\nWelcome to Bamazon! How may I help you?\n",
//         choices: ["I am a customer.", "I am a store manager.", "I am a branch supervisor."]
//     }

// ]).then(function(res){

//     switch(res.welcome){

//         case "I am a customer.":
//         customer.customer();
//         break;

//     }


// });


    









// // shop by department
// function customerDepartment() {

//     inquirer.prompt([

//         {
//             name: "dep",
//             type: "input",
//             message: "Enter department name: "
//         }

//     ]).then(function (res) {
//         shopByDep(res.dep);
//     });
// }

// // shop by price
// function customerPrice() {

//     inquirer.prompt([

//         {
//             name: "price1",
//             type: "input",
//             message: "Enter your minimum price: "
//         },
//         {
//             name: "price2",
//             type: "input",
//             message: "Enter your maximum price: "
//         }

//     ]).then(function (res) {
//         shopByPrice(res.price1, res.price2);
//     });
// }

// // go to checkout
// function customerCheckout(){

//     inquirer.prompt([
//         {
//             name: "checkout",
//             type: "input",
//             message: "Enter the id of the item you would like to purchase: "
//         }
//     ]).then(function(res){
//         var item = res.checkout;
//         goToCheckout(res.checkout);
//     }).prompt([
//         {
//             name: "ok",
//             type: "confirm",
//             message: "Is this ok?"
//         }
//     ]).then(function(res){
//         if(res.ok){
//             console.log(item);
//         }
//     })
// }




// // =========================================== MANAGER

// // query search vairables - manager
// var inventory = "SELECT * FROM products";
// var lowInventory = "SELECT * FROM products WHERE stock_quantity <= 5";
// var addToInventory = "UPDATE products WHERE item_id = ? SET stock_quantity = ?";
// var addProduct = "INSERT INTO products SET ?";


// // functions

// // product table config - manager
// function managerView(err, res) {

//     if (err) throw err;

//     var newRow,
//         data,
//         output;

//     data = [
//         ["ID", "Item", "Department", "Price (dollars)", "Quantity"],
//     ];

//     for (i = 0; i < res.length; i++) {
//         newRow = [];
//         newRow.push(
//             res[i].item_id,
//             res[i].product_name,
//             res[i].department_name,
//             res[i].price,
//             res[i].stock_quantity
//         );
//         data.push(newRow);
//         newRow = [];
//     };

//     output = table(data);
//     console.log(output);

//     connection.end();
// }

// // view inventory
// function viewInventory() {
//     connection.query(inventory, function (err, res) {
//         managerView(err, res);
//     });
// }

// // view low inventory
// function viewLowInventory() {
//     connection.query(lowInventory, function (err, res) {
//         managerView(err, res);
//     });
// }

// // add to inventory
// function addToInventory() {
//     connection.query(addToInventory, function (err, res) {
//         managerView(err, res);
//     });
// }

// // add new product
// function addProduct() {
//     connection.query(addProduct, function (err, res) {
//         managerView(err, res);
//     });
// }