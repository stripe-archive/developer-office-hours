var stripe = Stripe('pk_test_vAZ3gh1LcuM7fW4rKNvqafgB00DR9RKOjN');

var elements = stripe.elements();
var cardElement = elements.create('card');
cardElement.mount('#card');

let setupIntentSecret;
debug('Creating setup intent...');
fetch('/setup_intents')
  .then((response) => response.json())
  .then((data) => {
    setupIntentSecret = data.client_secret;
    debug('Setup intent created! ' + setupIntentSecret);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

var payBtn = document.getElementById('pay');
var emailInput = document.getElementById('email-input');
var installmentsInput = document.getElementById('installments-input');
payBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  debug('Confirming card setup...');
  const confirmation = await stripe.confirmCardSetup(
    setupIntentSecret,
    {
      payment_method: {
        card: cardElement,
        billing_details: {
          email: emailInput.value,
        },
      }
    }
  );
  if (confirmation.error) {
    debug('Confirmation of card details failed');
    debug(JSON.stringify(confirmation, null, 2));
    return;
  }

  debug('Confirmed card setup');

  debug('Creating customer and subscription...');

  fetch('/buy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: emailInput.value,
      installments: parseInt(installmentsInput.value, 10),
      payment_method: confirmation.setupIntent.payment_method,
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log('Success:', data);
    debug('Created customer and sub!');
    debug(JSON.stringify(data, null, 2));
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});


function debug(message) {
  var debugMessage = document.getElementById('debug-message');
  console.log('Debug: ', message);
  debugMessage.innerText += '\n' + message;
}
