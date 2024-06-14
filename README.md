# Exhibition Curator Web Application

Hosted here --> https://aloan93-exhibitioncurator.netlify.app/

A web application where users can browse antiquities & fine artwork from public collections and curate their own virtual exhibitions. Currently users have the ability to browse collections from the ['Metropolitan Museum of Art'](https://metmuseum.github.io/) and the ['Cleveland Museum of Art'](https://openaccess-api.clevelandart.org/) via open access APIs. Collections can be queried with a text input which will return all artworks that relate to the query within their API data set. Artefacts in list view can be viewed in isolation where they will return more images and information when available, including links to their original collection's website to learn more.

**PS. Users' own virtual exhibitions persist for the duration of their session only! (Navigating away from the site or refreshing will cause the exhibition to be flushed)**

## Running the App Locally

To run this project locally you will first need to have Node.js installed on your machine (minimum version required - v20.3.1).

Instructions for doing this can be found...

Here! --> https://nodejs.org/en/download

### Step 1: Cloning

Clone this repository to your machine and navigate to the root directory with the following terminal commands:

```
git clone https://github.com/aloan93/fe-exhibition-curator.git
cd fe-exhibition-curator
```

### Step 2: Installing Dependencies

Install all the packages required to run this depositry via NPM using the following terminal command:

```
npm install
```

### Step 3: Launching the App

Once all the dependancies have been installed you will then be able to run the application, and for this purpose you can use the following script in your terminal:

```
npm run dev
```

Your terminal should now show show your local host along with the port being used. If your local host does not automatically open in your browser, you open a tab manually by ctrl + click on the local link.

### And Done! Happy Curating
