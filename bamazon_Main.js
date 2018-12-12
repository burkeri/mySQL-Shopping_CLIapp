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
var products = "SELECT item_id, product_name, department_name, price FROM products";
var byDep = "SELECT item_id, product_name, department_name, price FROM products WHERE department_name = ?";

// functions
// view all products
function viewProducts(){

    connection.query(products, function(err, res){     
        
        if (err) throw err;

        var newRow, 
            data, 
            output;
        
        data = [
            ["ID", "Item", "Department", "Price (dollars"],
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
    });
};

// shop products by department
function shopByDep(){

    connection.query(byDep, function(err, res){     
        
        if (err) throw err;

        var newRow, 
            data, 
            output;
        
        data = [
            ["ID", "Item", "Department", "Price (dollars"],
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
    });
};