var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

module.exports = {

    test: function() {
        console.log("hi");
    }
}

// require packages
var inquirer = require("inquirer");
var mysql = require("mysql");
const { table } = require("table");

// config database
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
var byPrice = "SELECT item_id, product_name, department_name, price FROM products WHERE price BETWEEN ? AND ?";

function customer () {

    inquirer.prompt([
        {
            name: "customer",
            type: "list",
            message: "What would you like to do?",
            choices: ["View all products", "Shop by department", "Shop by price"]
        }
    ]).then(function (res) {

        switch (res.customer) {

            case "View all products":
                viewProducts();
                contin();
                break;

            case "Shop by department":
                customerDepartment();
                break;

            case "Shop by price":
                customerPrice();
                break;
        }
    });
}

// product table config
function customerView (err, res) {
    if (err) throw err;

    var newRow,
        data,
        output;

    data = [
        ["ID", "Item", "Department", "Price (dollars)"],
    ];

    for (i = 0; i < res.length; i++) {
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
function viewProducts () {
    connection.query(products, function (err, res) {
        customerView(err, res);
    });
}

// keep shopping or go to checkout
function contin() {

    inquirer.prompt([
        {
            name: "continue",
            type: "list",
            choices: ["Keep shopping.", "Go to checkout"]
        }
    ]).then(function (res) {

        switch (res.continue) {

            case "Keep shopping.":
                this.customer();
                break;

            case "Go to checkout":
                console.log("DONE");
                break;
        }
    })
}

module.exports = customer();

// shop products by department - table config
function shopByDep(dep) {
    connection.query(byDep, dep, function (err, res) {
        this.customerView(err, res);
    });
}

// shop products by price - table config
function shopByPrice(p1, p2) {
    connection.query(byPrice, [p1, p2], function (err, res) {
        this.customerView(err, res);
    });
}

//
function goToCheckout(id) {
    connection.query(checkout, id, function (err, res) {
        console.log("\n" + res[0].product_name + "\n");
        connection.end();
    });
}






