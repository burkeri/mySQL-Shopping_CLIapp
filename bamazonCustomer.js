// require packages
var inquirer = require("inquirer");
var mysql = require("mysql");
const { table } = require("table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

// query search variables
var products = "SELECT item_id, product_name, department_name, price FROM products";

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
    console.log("\n");
    console.log(output);
    console.log("\n");
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
                module.exports.customer();
                break;

            case "Go to checkout":
                console.log("DONE");
                connection.end();
                break;
        }
    })
}

module.exports = {

    customer: function() {
        inquirer.prompt([
            {
                name: "customer",
                type: "list",
                message: "What would you like to do?",
                choices: ["View all products", "Shop by department", "Shop by price"]
            }
        ]).then(function (res) {

            switch(res.customer) {
                case "View all products":
                    viewProducts();
                    contin();
                    break;

                case "Shop by department":
                    break;
            }
        });
    }
}