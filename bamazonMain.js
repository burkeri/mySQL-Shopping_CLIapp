// dependencies
var inquirer = require("inquirer");

// require files
var customer = require("./bamazonCustomer");

// app
inquirer.prompt([

    {
        name: "welcome",
        type: "list",
        message: "\nWelcome to Bamazon! How may I help you?\n",
        choices: ["I am a customer.", "I am a store manager.", "I am a branch supervisor."]
    }

]).then(function(res){

    switch(res.welcome){

        case "I am a customer.":
            customer.customer();
            break;
    }


});