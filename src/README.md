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
Bonus is I can use the sample file as the initial DB, so no need to build migration/ETL tooling.