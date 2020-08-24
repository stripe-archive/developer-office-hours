document.addEventListener('DOMContentLoaded', (event) => {
  initApplication();
});

function initApplication() {
  const PUBLISHABLE_KEY = document.querySelector('#data').dataset.pk; 
  const CLIENT_SECRET_ID = document.querySelector('#data').dataset.client_secret; 

  var stripe = Stripe(PUBLISHABLE_KEY); 
  var elements = stripe.elements();

  var style = {
    base: {
      fontFamily: 'Helvetica Neue',  
      color: '#32325d',
      fontWeight: 300,
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      },
      ':-webkit-autofill': {
        color: '#32325d',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
      ':-webkit-autofill': {
        color: '#fa755a',
      },
    },
  };

  var options = {
    style: style,
    supportedCountries: ['SEPA'],
    placeholderCountry: 'IE',
  };

  var ibanElement = elements.create("iban", options);
  ibanElement.mount("#iban");

  var errorContainer = document.querySelector("#error");
  var successContainer = document.querySelector("#success");
  var submitButton = document.querySelector("#submit-button");

  ibanElement.on('change', function(event) {
    if (event.complete) {
      submitButton.disabled = false;
      submitButton.classList.remove("disabled");
    } else if (event.error) {
      errorContainer.classList.add("visible");
      errorContainer.innerHTML = event.error.message;
      setTimeout(function(){ 
        errorContainer.classList.remove("visible");
      }, 3000);
    }
  });

  var form = document.querySelector("#iban-form");

  var name = document.querySelector('#data').dataset.name;
  var email = document.querySelector('#data').dataset.email;

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    submitButton.disabled = true;
    document.querySelector("#working").classList.add("visible");
    document.querySelector("#button-text").classList.add("hidden");

    stripe.confirmSepaDebitPayment(CLIENT_SECRET_ID, {
      payment_method: {
        sepa_debit: ibanElement,
        billing_details: {
          name: name,
          email: "foo@bar.com"
        }
      }
    }).then(function(result) {
      if (result.paymentIntent) {
        successContainer.classList.add("visible");
        successContainer.innerHTML = "Thank you! Your payment is being processed";

        document.querySelector("#working").classList.remove("visible");
        document.querySelector("#button-text").classList.remove("hidden");

        setTimeout(function(){ 
          successContainer.classList.remove("visible");
        }, 3000);
      }
    });
  });
}
