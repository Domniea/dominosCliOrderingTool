🍕 DomiNode Pizza CLI Tool

A Node.js-based CLI tool to have a pizza delivered right to your home (or wherever you are).

Craving pizza but don’t want the hassle of using the Domino’s app or website? Look no further! DomiNode lets you order a pizza directly from your command line. Built with Node.js, Commander, and Inquirer, this interactive tool makes it easy to get exactly what you want, whenever you want — delivered to your door.



🚀 Features

Order a pizza directly from your CLI without needing the Domino’s app or website.

Uses deconstructed Domino’s REST APIs to place an order.

Interactive prompts powered by Commander and Inquirer to customize your order.

Seamless checkout experience with minimal hassle.



📦 Installation

Clone this repository and install dependencies:

git clone https://github.com/<your-username>/dominode.git
cd dominode
npm install



▶️ Usage

Start the CLI tool with:

npm start



🖥️ Demo

Here’s an example session of ordering a pizza:

dominosApp on  main [!?] is 📦 v1.0.0 via  v22.14.0 
❯ npm start

> order-a-dominos-pizza@1.0.0 start
> node index.js ask

? Welcome to my Dominos Pizza Ordering CLI tool. 
What type of toppings would you like on your pizza? 
 (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)

 PROTEINS
❯◯ Pepperoni
 ◯ Ham
 ◯ Beef
 ◯ Salami
 ◯ Sausage
 ◯ Chicken
(Move up and down to reveal more choices)

? What is your first name? john
? What is your last name? does
? What is your phone number? 8128128123
? What is your email? johndoe@email.com
? What is your street address? 123 street
? What is your unit number? 42
? What is your city? Salt Lake
? What is your state? Ut



🛠️ Tech Stack

Node.js

Commander

Inquirer

Domino’s REST API



📖 Notes

This project is for educational/demo purposes only. It is not affiliated with or endorsed by Domino’s Pizza.