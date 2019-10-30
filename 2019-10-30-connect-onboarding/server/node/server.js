const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const { resolve } = require("path");
const env = require("dotenv").config({ path: resolve("../../.env") });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.use(express.static("../../client"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  const path = resolve("../../client/index.html");
  res.sendFile(path);
});


// Part 1: hosted Connect Custom Onboarding
app.post("/create-account-hosted", async (req, res) => {
  const data = req.body;
  try {
    // Create account
    var account = await stripe.accounts.create({
      type: 'custom',
      business_type: 'individual',
      requested_capabilities: ['card_payments', 'transfers'],
    });

    // Create accountLink
    var accountLink = await stripe.accountLinks.create({
      account: account.id,
      success_url: 'http://localhost:4242?success',
      failure_url: 'http://localhost:4242?failure',
      type: 'custom_account_verification',
      collect: 'eventually_due'
    });
  } catch (err) {
    console.log(err);
    res.status(400)
    res.send({ error: err })
    return;
  }
  res.send(accountLink);
});

// Part 2: custom onboarding flow
function now() {
  return Math.round((new Date()).getTime() / 1000);
}

app.post("/create-account", async (req, res) => {
  const data = req.body;
  try {
    var account = await stripe.accounts.create({
      type: 'custom',
      requested_capabilities: ['card_payments', 'transfers'],
      business_type: 'company',
      external_account: data.external_account,
      tos_acceptance: {
        date: now(),
        ip: req.ip
      },
      business_profile: {
        mcc: 7623,
        url: data.url,
      },
      company: {
        name: data.name,
        phone: data.phone,
        tax_id: data.tax_id,
        address: {
          line1: data.line1,
          city: data.city,
          state: data.state,
          postal_code: data.postal_code,
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400)
    res.send({ error: err })
    return;
  }
  res.send(account);
});

app.post("/create-person", async (req, res) => {
  const data = req.body;
  try {
    var person = await stripe.accounts.createPerson(
      data.account, {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        id_number: data.id_number,
        dob: {
          day: 1,
          month: 1,
          year: 1901,
        },
        address: {
          line1: data.line1,
          city: data.city,
          state: data.state,
          postal_code: data.postal_code,
        },
        relationship: {
          title: data.title,
          percent_ownership: data.percent_ownership,
          owner: data.owner,
          representative: data.representative
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


app.listen(4242, () => console.log());
