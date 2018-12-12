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

// query search variables
var products = "SELECT item_id, product_name, department_name, price FROM products";
var byDep = "SELECT item_id, product_name, department_name, price FROM products WHERE department_name = ?";
var byID = "SELECT item_id, product_name, department_name, price FROM products WHERE item_id BETWEEN ? AND ?";
var byPrice = "SELECT item_id, product_name, department_name, price FROM products WHERE price BETWEEN ? AND ?";

// functions
// customer view of products
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
function shopByDep(){
    connection.query(byDep, process.argv[2], function(err, res){     
        customerView(err, res);
    });
}

// shop products by id
function shopByID(){
    connection.query(byID, process.argv[0], function(err, res){
        customerView(err, res);
    });
}

// shop products by price
function shopByPrice(){
    connection.query(byPrice, process.argv[0], function(err, res){
        customerView(err, res);
    });
}

inquirer.prompt([
    {
        name
    }
]).then({});