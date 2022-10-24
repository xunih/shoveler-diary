# DH2643 Project

## Purpose
A forum for users to post pet images, post questions related to pets, and post pet adoption information.

## Features
1. Register and Login
2. Upload images
3. Create a discussion topic and add comments
4. Admin user can delete posts (The only admin user: xunih@outlook.com)

## Tech stack
Backend - Node.js, Express.js, Local MongoDB database (Own API)

Frontend - Vue with Javascript

## Architecture
Model-View-Controller

## How to run locally

After clone the git repository, please add an .env file where you store all the required sensitive variables. Then go to the project folder and run the following commands in the terminal
```
npm run install
```
```
cd server
```
```
npm run dev
```
Open another terminal and run the following commands
```
cd client
```
```
npm run serve
```
Open http://localhost:8080/#/
