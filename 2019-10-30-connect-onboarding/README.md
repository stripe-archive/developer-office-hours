# Custom Connect Onboarding 2019-10-30

Learn how to build an onboarding flow to create Custom Connect Accounts. Also
learn about new Connect account requirements, and see how to leverage Stripe
hosted Connect Onboarding to simply enable onboarding globally.

> [🎬 Watch on YouTube](https://www.youtube.com/watch?v=RYiscsdICrs&list=PLy1nL-pvL2M6IYfRCmhOPcyC70zJqFoCs&index=2&t=0s)

# Getting Started

Follow these instructions to spin-up a copy of this demo project up on your
local machine for development and testing purposes. This is meant to be a guide
to show you how to go about evolving a webhook handling system.

### Prerequisites
* Node
* [Stripe CLI](https://github.com/stripe/stripe-cli/)
* [Create a stripe account](https://dashboard.stripe.com/register)
* [Stripe API Keys](https://stripe.com/docs/keys)

## Step by Step

1. Download and Install dependencies

```sh
git clone git@github.com:stripe-samples/developer-office-hours.git
cd developer-office-hours/2019-10-30-connect-onboarding/server/node
npm install
```

2. Update API keys

Copy `.env.example` and update the keys to your [Stripe API Keys](https://dashboard.stripe.com/test/apikeys)

3. Start the server

```sh
node server.js
```

4. Browse to `http://localhost:4242`

Create the account and copy the account ID

5. Browse to `http://localhost:4242/person.html?account={{account_id}}`

Create the person


### Updating documents for person objects.

In the demo we ran out of time to demonstrate how to upload documents and attach
them to person objects. The following is the client and server code to update
the verification document:


```js
// client.
function uploadDocument() {
  var fd = new FormData();
  fd.set('purpose', 'identity_document');
  fd.set('file', document.getElementById('file').files[0]);

  // NOTE: this is `files.stripe.com`

  return fetch('https://files.stripe.com/v1/files', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${stripe._apiKey}`
    },
    body: fd
  }).then(function(r) {
    return r.json();
  }).then(function(response) {
    return response.id;
  });
}
```

```js
// server
app.post("/update-person-file", async (req, res) => {
  const data = req.body;
  try {
    var person = await stripe.accounts.updatePerson(
      data.account,
      data.person, {
        verification: {
          document: {
            front: data.file
          }
        }
      }
    )
  } catch (err) {
    console.log(err);
    res.status(400)
    res.send({ error: err })
    return;
  }
  res.send(person);
});
```
