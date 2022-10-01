Hi!

Welcome to my solution for the coding interview. 

# You'll need

- node 16 (there us a nvm file if you prefer)
- yarn

# To run 

- `yarn install`
- `yarn start`
- The server should start up on http://localhost:3000

# Design notes

## On databases

I've opted to use a JSON file for the database. There is no requirements listed for a DB explictly; the one requirement listed that influenced this is
> Imagine you're building this application for a single user (yourself)
Single user, running by themselves, no need for a lot of the complexity. Everything is abstracted out so switching to a DB would be easy enough if needed.
Bonus is I can use the test file as the initial DB, so no need to build migration/ETL tooling.

## On validation

I ended up with two different approaches for validating Invoices versus Line Items. Invoices uses JSON Schema validation because it is a lot, but Line Items are simple enough that I could test the 3 properties easily enough. If it got more complex, I would move it to schema validation but balancing cost (CPU, and understanding) versus simple code is the reason for difference.

## Postman Collection

Inside `docs` is a postman collection for exploring the API if you want to try it directly. In the real world this would be the start of API tests which could be integrated into the pipeline but for this, a simple tool for smoke testing is enough.