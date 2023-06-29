const services = [
    {
        name: 'Venue Service',
        options: [
            { name: 'Option 1: Secret luxury location outside the city', price: 7500, id: 1.1 },
            { name: 'Option 2: 5-star hotel within the city', price: 4500, id: 1.2 }
        ]
    },
    {
        name: 'Catering Service',
        options: [
            { name: 'Option 1: Premium selection', price: 2000, id: 2.1 },
            { name: 'Option 2: Standard selection', price: 1500, id: 2.2 }
        ]
    },
    {
        name: 'Decoration Service',
        options: [
            { name: 'Option 1: Exclusive High-End Decor', price: 10000, id: 3.1 },
            { name: 'Option 2: Traditional Decor', price: 8000, id: 3.2 }
        ]
    },
    {
        name: 'Photography & Videography',
        options: [
            { name: 'Option 1: Artistic Masterpieces', price: 5000, id: 4.1 },
            { name: 'Option 2: Classic captures', price: 4000, id: 4.2 }
        ]
    },
    {
        name: 'Wedding Attire',
        options: [
            { name: 'Option 1: Couture Elegance', price: 10000, id: 5.1 },
            { name: 'Option 2: Sophisticated Charm', price: 7000, id: 5.2 }
        ]
    },
    {
        name: 'Entertainment Service',
        options: [
            { name: 'Option 1: Luxury Entertainment Showcase', price: 15000, id: 6.1 },
            { name: 'Option 2: Classic Performances', price: 10000, id: 6.2 }
        ]
    },
    {
        name: 'Invitations & Stationery Service',
        options: [
            { name: 'Option 1: Opulent Designs', price: 3000, id: 7.1 },
            { name: 'Option 2: Traditional Invitations and Stationery', price: 2000, id: 7.2 }
        ]
    },
    {
        name: 'Accommodation Service',
        options: [
            { name: 'Option 1: 5-star hotel', price: 15000, id: 8.1 },
            { name: 'Option 2: 4-star hotel', price: 11000, id: 8.2 }
        ]
    },
    {
        name: 'Wedding Cake Service',
        options: [
            { name: 'Option 1: Sylvia Weinstock Cakes', price: 5000, id: 9.1 },
            { name: 'Option 2: Local baker cake', price: 2000, id: 9.2 }
        ]
    },
    {
        name: 'Hair & Makeup Service',
        options: [
            { name: 'Option 1: Makeup by Patrick Ta and Hair by Guido Palau', price: 7500, id: 10.1 },
            { name: 'Option 2: Makeup and Hair by local make-up artist and hairstylist', price: 2000, id: 10.2 }
        ]
    },
];

const containers = document.querySelectorAll('.containerOne, .containerTwo, .containerThree, .containerFour, .containerFive, .containerSix, .containerSeven, .containerEight, .containerNine, .containerTen');

const addedServices = [];

// Function to add a service option to the shopping cart
function addToShoppingCart(serviceName, optionName, price) {
    const tableBody = document.getElementById('bodytable');

    // Create a new row for the option
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${serviceName}</td>
    <td>${optionName}</td>
    <td>${price}</td>
  `;

    tableBody.appendChild(row);

    const serviceToAdd = {
		name: serviceName,
		option: optionName,
		price: price,
	};
	addedServices.push(serviceToAdd);

    const totalCost = addedServices.reduce((total, serviceToAdd) => total + serviceToAdd.price, 0);

    updateTotalCost(totalCost);

    calculateWedPlanner();
    calculateTotalWed();

}

// Function to update the total cost of the services
function updateTotalCost(totalCost) {
    const totalRow = document.getElementById('totalRow');
    totalRow.innerHTML = `
    <td colspan="2">Subtotal:</td>
    <td>${totalCost}</td>
  `;


    //Storage
    localStorage.setItem('addedServices', JSON.stringify(addedServices));
}

// Event click listeners
containers.forEach((container, index) => {
    const serviceName = container.querySelector('h3').textContent;
    const buttons = container.querySelectorAll('.buy');

    buttons.forEach((button) => {
        const optionIndex = button.dataset.optionIndex;
        const option = services[index].options[optionIndex];

        button.addEventListener('click', function () {
            addToShoppingCart(serviceName, option.name, option.price);
        });
    });
});

// Function to extract the option prices from addedServices array

function extractOptionPrices() {
    return addedServices.map(service => service.price);
}

//Function to add the wedding planner cost

function calculateWedPlanner() {
    const totalCost = addedServices.reduce((total, serviceToAdd) => total + serviceToAdd.price, 0);
    const weddingPlanner = totalCost * 0.1;

    const weddingPlannerElement = document.querySelector('.containerEleven p');
    weddingPlannerElement.textContent = `Wedding Planner services: $${weddingPlanner}`;
}

//Function to calculate the total cost of the wedding

function calculateTotalWed() {  
    const totalCost = addedServices.reduce((total, serviceToAdd) => total + serviceToAdd.price, 0);
    const weddingPlanner = totalCost * 0.1;
    const totalWedding = totalCost + weddingPlanner;

    const totalCostElement = document.querySelector('.containerTwelve p');
    totalCostElement.textContent = `Total: $${totalWedding}`;
}

calculateTotalWed();

// Function to clear the shopping cart and totals

function clearShoppingCart() {
    const tableBody = document.getElementById('bodytable');
    const totalRow = document.getElementById('totalRow');
    const weddingPlannerElement = document.querySelector('.containerEleven p');
    const totalCostElement = document.querySelector('.containerTwelve p');

    tableBody.innerHTML = '';
    totalRow.innerHTML = '<td colspan="2">Total:</td><td></td>';
    weddingPlannerElement.textContent = 'Wedding Planner services: $0';
    totalCostElement.textContent = 'Total: $0';
    addedServices.length = 0;
}

// Event listener for the Checkout button
const checkoutButton = document.querySelector('.finish');
checkoutButton.addEventListener('click', clearShoppingCart);


