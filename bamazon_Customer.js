module.exports = {

    // query search variables
    products: "SELECT item_id, product_name, department_name, price FROM products",
    byDep: "SELECT item_id, product_name, department_name, price FROM products WHERE department_name = ?",
    byPrice: "SELECT item_id, product_name, department_name, price FROM products WHERE price BETWEEN ? AND ?",

    // functions

    // customer - user interaction
    customer: function() {

        inquirer.prompt([
            {
                name: "customer",
                type: "list",
                message: "What would you like to do?",
                choices: ["View all products", "Shop by department", "Shop by price"],

            }
        ]).then(function (res) {

            switch (res.customer) {

                case "View all products":
                    this.viewProducts();
                    break;

                case "Shop by department":
                    customerDepartment();
                    break;

                case "Shop by price":
                    customerPrice();
                    break;
            }
        });
    },


    // product table config
    customerView: function (err, res) {
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
    },

// view all products
viewProducts: function () {
    connection.query(products, function (err, res) {
        this.customerView(err, res);
    });
},

// shop products by department - table config
shopByDep: function (dep) {
    connection.query(byDep, dep, function (err, res) {
        this.customerView(err, res);
    });
},

// shop products by price - table config
shopByPrice: function (p1, p2) {
    connection.query(byPrice, [p1, p2], function (err, res) {
        this.customerView(err, res);
    });
},

//
goToCheckout: function(id) {
    connection.query(checkout, id, function (err, res) {
        console.log("\n" + res[0].product_name + "\n");
        connection.end();
    });
}


}





