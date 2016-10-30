# Javascript Apriori Algorithm Implementation

This is a simple implementation of the Apriori Algorithm in JavaScript.

# What is the Apriori Algorithm?

In case you are unfamiliar with what an Apriori Algorithm is or maybe you just need a refresher, here it is!

The Apriori Algorithm is a way of taking in data as an input in the form of item sets and then finding which item sets
occur the most frequent. The other and more powerful aspect of the Apriori Algorithm is to then find Associations within those
inputs.

Here's a less abstract example:

Let's say you have an online store selling Sci-Fi Movie Posters and Business is booming! You have about 4 years worth of data in the form of orders that people
have made. To take your Business to the next level, you decide that you want to start offering other products that may be of interest to 
them depending on what they have in their cart.

Here is where the Apriori Algorithm can help you.

Let's say that we represent each order as an array of items that people bought:

order1 = ["Star Trek", "Lord of the Rings", "2001 A Space Odyssey"]
order2 = ["Star Wars", "Harry Potter", "Indiana Jones"]
order3 = ["Star Trek", "Babylon 5", "Indiana Jones"]
order4 = ["Star Wars", "Indiana Jones", "Logan's Run"]
order5 = ["Star Trek", "Babylon 5", "2001 A Space Odyssey"]

The Apriori Algorithm will first, find the frequently occurring sets:

["Star Trek", "Babylon 5"]
["Star Trek", "2001 A Space Odyssey"]
["Star Wars", "Indiana Jones"]

Next, the Apriori Algorithm will determine rules based on these frequent item sets:

 - If someone buys a Star Trek poster, then they likely would buy a Babylon 5 poster as well
 - If someone buys a Star Trek poster, then they likely would buy a 2001 A Space Odysset poster as well
 - If someone buys a Star Wars poster, then they likely would buy an Indiana Jones poster as well

Please note that this is an extremely simplistic example and that a real world example would have an untold thousands of item sets 
and many more complex rules, this is just for the sake of example.

#Usage
```
	//Include the JS file in your project, then call methods as needed.
	    var trainingSet = [
            ["test1", "test2", "test3"],
            ["test1", "test2", "test4"]
        ];

        apriori = new Apriori(trainingSet);
        apriori.initialize();
```
