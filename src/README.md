Hi!

Welcome to my solution for the coding interview. 

# Not finished

This is not complete, the instructions were it would take 5 hours and I am 15 hours in and easily could do another 15 hours to get it to the bar I expect from "production" ready as in the instructions.

As you can see the backend is complete and started with proper testing approach and ensuring a clean setup but once I realised I was running out of time a lot of trade offs, especially on the UI, were made which would be an interesting discussion topic. 

If you would like more examples of my coding, there is plenty at: https://github.com/rmaclean

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

## Not production ready

This is obviously not production ready, just due to how long that would take. It needs:
- Logging in the API
- Metrics in the API
- Client side monitoring (like a new relic)

## New Invoice is not a flyout

While the design asked for a flyout, again due to how massive this project is, there just was not time so a trade off was made to get it in. This also had the benefit of working nicely with handlebars for refreshing the data automatically.

## Why not Vue/React?

This did not need state management as it is very constrained simple system which has the needs met with Handlebars and pure JS. In my day to day, I use React for UI but those are much more complex systems. 

The only area which really could've used a proper state system would've line items when creating an invoice; but just building a naive approach with in memory one.

# This should've used S*SS

When I started, seemed simple enough for CSS but breaking it into SASS so it is not so big would've been ideal. Again, just ran out of time to refactor that.