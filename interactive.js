let items = [];
let total = 0;

function addToOrder(btn) {
    let card = btn.closest('.product-card');
    let name = card.querySelector('h3').textContent;
    let qty = parseInt(card.querySelector('.qty-input').value);
    let price = parseFloat(card.querySelector('.size-select').value);
    let size = price === 9.99 ? '1L' : '500ml';
    if (qty < 1) { alert('Enter a quantity greater than 0.'); return; }
    items.push({ name: size + ' ' + name, qty: qty, subtotal: qty * price });
    total += qty * price;
    card.querySelector('.qty-input').value = 0;
    render();
}

function render() {
    let list = document.getElementById('order-items');
    list.innerHTML = '';
    items.forEach(function (item) {
        let li = document.createElement('li');
        li.innerHTML = '<span>' + item.qty + 'x ' + item.name + '</span><span>$' + item.subtotal.toFixed(2) + '</span>';
        list.appendChild(li);
    });
    let subtotal = total;
    let tax = subtotal * 0.13;
    let grand = subtotal + tax;
    let li = document.createElement('li');
    li.innerHTML = '<span>Subtotal</span><span>$' + subtotal.toFixed(2) + '</span>';
    list.appendChild(li);
    li = document.createElement('li');
    li.innerHTML = '<span>Tax (13%)</span><span>$' + tax.toFixed(2) + '</span>';
    list.appendChild(li);
    document.getElementById('order-total').textContent = '$' + grand.toFixed(2);
}

function toggleInfo() {
    let box = document.getElementById('product-info-box');
    box.style.display = box.style.display === 'block' ? 'none' : 'block';
}

function calcContactTotal() {
    let rows = document.querySelectorAll('.contact-product');
    let subtotal = 0;
    rows.forEach(function (row) {
        let qty = parseInt(row.querySelector('.cp-qty').value);
        let price = parseFloat(row.querySelector('.cp-size').value);
        let sub = qty * price;
        row.querySelector('.cp-sub').textContent = '$' + sub.toFixed(2);
        subtotal += sub;
    });
    let tax = subtotal * 0.13;
    let grand = subtotal + tax;
    document.getElementById('c-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('c-tax').textContent = tax.toFixed(2);
    document.getElementById('c-grand').textContent = grand.toFixed(2);
}

function confirmOrder() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    if (!name || !email) { alert('Please fill in your name and email.'); return; }

    let rows = document.querySelectorAll('.contact-product');
    let orderList = [];
    rows.forEach(function (row) {
        let qty = parseInt(row.querySelector('.cp-qty').value);
        if (qty > 0) {
            let name = row.getAttribute('data-name');
            let size = parseFloat(row.querySelector('.cp-size').value) === 9.99 ? '1L' : '500ml';
            orderList.push(qty + 'x ' + size + ' ' + name);
        }
    });

    let msg = 'Thanks, ' + name + '! ';
    if (orderList.length > 0) { msg += 'Order: ' + orderList.join(', ') + '. '; }
    else { msg += 'No products selected. '; }
    msg += 'Confirmation sent to ' + email + '.';
    if (document.getElementById('comments').value) { msg += ' We\'ll review your requests.'; }

    document.getElementById('confirm-message').textContent = msg;
    document.getElementById('confirmation').style.display = 'block';
    document.getElementById('contact-form').reset();
    document.getElementById('c-subtotal').textContent = '0.00';
    document.getElementById('c-tax').textContent = '0.00';
    document.getElementById('c-grand').textContent = '0.00';
    document.querySelectorAll('.cp-sub').forEach(function (s) { s.textContent = '$0.00'; });
}

document.addEventListener('DOMContentLoaded', function () {
    let btns = document.querySelectorAll('.add-btn');
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function () { addToOrder(this); });
    }
    if (document.getElementById('update-total-btn')) {
        document.getElementById('update-total-btn').addEventListener('click', render);
    }
    if (document.getElementById('info-btn')) {
        document.getElementById('info-btn').addEventListener('click', toggleInfo);
    }
    if (document.getElementById('calc-contact-btn')) {
        document.getElementById('calc-contact-btn').addEventListener('click', calcContactTotal);
    }
    if (document.getElementById('submit-contact-btn')) {
        document.getElementById('submit-contact-btn').addEventListener('click', confirmOrder);
    }
});
