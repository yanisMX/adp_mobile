const faker = require("faker");
const fs = require("fs");

// Configuration
const numUsers = 2;
const numCategories = 5;
const numSpendings = 15;

function clearDataFiles(filenames) {
  filenames.forEach((filename) => {
    fs.writeFile(filename, JSON.stringify([], null, 2), (err) => {
      if (err) {
        console.error(`Error clearing ${filename}:`, err);
      } else {
        console.log(`Data successfully cleared in ${filename}`);
      }
    });
  });
}

clearDataFiles(["users.json", "categories.json", "spendings.json"]);
// Générer des utilisateurs
const users = [];
for (let i = 1; i <= numUsers; i++) {
  users.push({
    ID: i,
    fullname: faker.name.findName(),
    email: faker.internet.email(),
    nickname: faker.internet.userName(),
    password: faker.internet.password(),
    revenus: faker.finance.amount(),
  });
}

// Générer des catégories
const categories = [];
for (let i = 1; i <= numCategories; i++) {
  categories.push({
    ID: i,
    name: faker.commerce.department(),
    budget: faker.finance.amount(),
    user_id: faker.random.arrayElement(users).ID,
  });
}

// Générer des dépenses
const spendings = [];
for (let i = 1; i <= numSpendings; i++) {
  let spendingValue = parseFloat(faker.finance.amount());
  while (spendingValue < 5 || spendingValue > 40) {
    spendingValue = parseFloat(faker.finance.amount());
  }
  spendings.push({
    ID: i,
    name: faker.commerce.productName(),
    category_id: faker.random.arrayElement(categories).ID,
    value: spendingValue.toFixed(2), // Assurez-vous d'avoir 2 décimales
    reccuring: faker.random.arrayElement([
      "monthly",
      "weekly",
      "daily",
      "yearly",
      "",
    ]),
    user_id: faker.random.arrayElement(users).ID,
    createdat: faker.date.past(),
  });
}

// Fonction pour écrire les données dans un fichier JSON
function writeDataToFile(filename, data) {
  fs.writeFile(filename, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(`Error writing to ${filename}:`, err);
    } else {
      console.log(`Data successfully written to ${filename}`);
    }
  });
}

writeDataToFile("users.json", users);
writeDataToFile("categories.json", categories);
writeDataToFile("spendings.json", spendings);
