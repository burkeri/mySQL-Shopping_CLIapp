// require packages
var inquirer = require("inquirer");
var mysql = require("mysql");
const {table} = require("table");

// config db connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

// query search vairables
var inventory = "SELECT * FROM products";
var lowInventory = "SELECT * FROM products WHERE stock_quantity <= 5";
var addToInventory = "UPDATE products WHERE item_id = ? SET stock_quantity = ?";
var addProduct = "INSERT INTO products SET ?";

// =========================================== CUSTOMER

// query search variables
var products = "SELECT item_id, product_name, department_name, price FROM products";
var byDep = "SELECT item_id, product_name, department_name, price FROM products WHERE department_name = ?";
var byID = "SELECT item_id, product_name, department_name, price FROM products WHERE item_id BETWEEN ? AND ?";
var byPrice = "SELECT item_id, product_name, department_name, price FROM products WHERE price BETWEEN ? AND ?";

// functions

// product table config - custoemr
function customerView(err, res){

    if (err) throw err;

    var newRow, 
        data, 
        output;
    
    data = [
        ["ID", "Item", "Department", "Price (dollars)"],
    ];

    for (i=0; i<res.length; i++){
        newRow = [];
        newRow.push(
            res[i].item_id,
            res[i].product_name,
            res[i].department_name,
            res[i].price
        );
        data.push(newRow);
        newRow = [];
    };

    output = table(data);
    console.log(output);

    connection.end(); 
}

// view all products
function viewProducts(){
    connection.query(products, function(err, res){       
        customerView(err, res); 
    });
}

// shop products by department
function shopByDep(dep){
    connection.query(byDep, dep, function(err, res){     
        customerView(err, res);
    });
}

// shop products by id
function shopByID(id){
    connection.query(byID, id, function(err, res){
        customerView(err, res);
    });
}



// shop products by price
function shopByPrice(p1, p2){
    connection.query(byPrice, [p1, p2], function(err, res){
        customerView(err, res);
    });
}

function customerPrice () {

    inquirer.prompt([

        {
            name: "price1",
            type: "input",
            message: "Enter your minimum price: "
        },
        {
            name: "price2",
            type: "input",
            message: "Enter your maximum price: "
        }

    ]).then(function(res){
        shopByPrice(res.price1, res.price2);
    });
}

// customer - user interaction
function customer(){

    viewProducts();

    inquirer.prompt([
        {
            name: "customer",
            type: "list",
            message: "What would you like to do?",
            choices: ["Shop by department", "Shop by price", "Shop by product id"]
    
        }
    ]).then(function(res){
        
        if (res.choices[0]){}
        else if (res.choices[1]){}
        else {}

    });

}

// ===========================================

// manager functions
// manager view of products
function managerView(err, res){

    if (err) throw err;

    var newRow, 
        data, 
        output;
    
    data = [
        ["ID", "Item", "Department", "Price (dollars)", "Quantity"],
    ];

    for (i=0; i<res.length; i++){
        newRow = [];
        newRow.push(
            res[i].item_id,
            res[i].product_name,
            res[i].department_name,
            res[i].price,
            res[i].stock_quantity
        );
        data.push(newRow);
        newRow = [];
    };

    output = table(data);
    console.log(output);

    connection.end(); 
}

// view inventory
function viewInventory(){
    connection.query(inventory, function(err, res){       
        managerView(err, res); 
    });
}

// view low inventory
function viewLowInventory(){
    connection.query(lowInventory, function(err, res){       
        managerView(err, res); 
    });
}

// add to inventory
function addToInventory(){
    connection.query(addToInventory, function(err, res){       
        managerView(err, res); 
    });
}

// add new product
function addProduct(){
    connection.query(addProduct, function(err, res){       
        managerView(err, res); 
    });
}