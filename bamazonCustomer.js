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
var byDep = "SELECT item_id, product_name, department_name, price FROM products WHERE department_name = ?";
var byPrice = "SELECT item_id, product_name, department_name, price FROM products WHERE price BETWEEN ? AND ?";
var findPrice = "SELECT price, product_name FROM products WHERE item_id = ?";

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
        contin();
    });
}

// shop products by department - table config
function shopByDep(dep) {
    connection.query(byDep, dep, function (err, res) {
        customerView(err, res);
        contin();
    });
}

// shop by department
function customerDepartment() {

    inquirer.prompt([

        {
            name: "dep",
            type: "input",
            message: "Enter department name: "
        }

    ]).then(function (res) {
        shopByDep(res.dep);
    });
}

// shop products by price - table config
function shopByPrice(p1, p2) {
    connection.query(byPrice, [p1, p2], function (err, res) {
        customerView(err, res);
        contin();
    });
}

// shop by price
function customerPrice() {

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

    ]).then(function (res) {
        shopByPrice(res.price1, res.price2);
    });
}

// inquirer will take in the id of the desired item
// we capture that input and store it in a variable
// inquirer will capture the quantity
// we will capture quantity in a variables
// then we will do the math to get the total and print
// "quatity"x of "name of product" - total: "full price"
// is this ok?
// if yes update the db, if no run contin

function goToCheckout() {

    inquirer.prompt([
        {
            name: "enterId",
            type: "input",
            message: "Enter the id of the item you would like to purchase: ",
        },
        {
            name: "enterQuant",
            type: "input",
            message: "How many would you like to purchase? "
        }
    ]).then(function(res){
        
        // set the quantity to a variable
        var quanitity = parseInt(res.enterQuant);

        // get the price from the db
        connection.query(findPrice, res.enterId, function (err, res) {
            if(err) throw err;

            // set the price eqaul to a variable
            var price = res[0].price;
            // set the name to a variable
            var name = res[0].product_name;
            // calculate the total
            var total = (price * quanitity);

            console.log("\n" + quanitity + "x" + " " + name + " - Total: $" + total + "\n");

            inquirer.prompt([
                {
                    name: "ok",
                    type: "confirm",
                    message: "Is this ok?"
                }
            ]).then(function(res){
                if(!res.ok){
                    contin();
                }
                else{
                    contin();
                }
            })
 
        });
    
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
                goToCheckout();
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
}