# Verde Blocks

Verde Blocks in a blockchain powered energy marketplace to connect buyers and wholesale renewable energy sellers.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

* [Node.js 8.X](https://nodejs.org/en/download/)
* [PostgreSql](https://www.postgresql.org/download/)
** not required for development.
** Developers may choose to do this for convenience only.

## Database Setup

Create a user apn: 
`createuser apn`

Login into postgres as postgres user:
`sudo -i -u postgres psql`

Set password for apn user:
`\password apn`

Create Database:
`CREATE DATABASE vblocks;`

Grant privileges to apn:
`GRANT ALL PRIVILEGES ON DATABASE vblocks TO apn;`

Go to verdeblocks folder and Run database migrations and seeds:
`npm run db-migrate`

Go to verdeblocks folder and populate database seeds:
`npm run run-seeds`

Go to verdeblocks folder and populate database seeds:
`npm run price-seed`

After populating the seeds in the DB run following command in postgres terminal connected to vblocks(`\c vblocks`):
`ALTER SEQUENCE "Users_userId_seq" RESTART WITH 2;`

## Start Server

Start the development server:
`npm start`
Start the server in debug mode:
`npm run debug`

Server is running at http://localhost:5000
For Swagger documentation, go to http://localhost:5000/api-docs

## Running lint

Verifying code style and practices.

`npm run lint`

Fix Lint issues

`npm run lint-fix`

This will verify that all code matches the lint guidelines.