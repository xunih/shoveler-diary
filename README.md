# DH2643 Project

## Purpose
A forum for users to post pet images, post questions related to pets, and post pet adoption information.

## Features
1. Register and Login
2. Upload images
3. Create a discussion topic and add comments
4. Admin user can delete posts (The only admin user: xunih@outlook.com)

## Current bugs
When it's the first time opening http://localhost:8080/#/, after login, users cannot create a post, create a discussion topic, or edit the username. After refreshing the webpage it works well.

## How to run locally

After clone the git repository, please run the following commands in the terminal
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

The first time you log in and go to another page for example "My profile", please refresh the webpage in order to get rid of an unfixed bug!
