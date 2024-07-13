# Exhibition Curator Web Application

Hosted here --> https://aloan93-exhibitioncurator.netlify.app/

A web application where users can browse antiquities & fine artwork from public collections and curate their own virtual collections/exhibitions. Currently users have the ability to browse collections from the ['Metropolitan Museum of Art'](https://metmuseum.github.io/) and the ['Cleveland Museum of Art'](https://openaccess-api.clevelandart.org/) via open access APIs. Museum collections can be queried with a text input which will return all artworks that relate to the query within their API data set. Artefacts in list view can be viewed in isolation where they will return more images and information when available, including links to their original collection's website to learn more.

The application utilises both Firebase Authentication and Firestore Database to allow users to sign-up and log-in with an email address and password. Registered users are able to save up to three collections as exhibitions for permanent viewing and sharing. Sharing links are also able to be viewed by non-registered users.

**PS. A user's "My Collection" persists for the duration of their session only! (Navigating away from the site or refreshing will cause the collection to be flushed) -**
**Users can save up to three of these collections permanently to their profile if signed in with a registered account**

## Running the App Locally

To run this project locally you will first need to have Node.js installed on your machine (minimum version required - v20.3.1).

Instructions for doing this can be found...

Here! --> https://nodejs.org/en/download

### Step 1: Cloning

Clone this repository to your machine and navigate to the root directory with the following terminal commands:

```
git clone https://github.com/aloan93/fe-exhibition-curator.git
cd exhibition-curator
```

### Step 2: Installing Dependencies

Install all the packages required to run this depositry via NPM using the following terminal command:

```
npm install
```

### Step 3: Creating the '.env' File

In order for the application to connect to firebase you will need to create a **.env** file within the root directory. This file will need to include the following variables:

```
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID
```

For access to the development values, please feel free to contact myself - ['aloan93'](https://github.com/aloan93)

Alternatively, you can create your own firebase project. This will need to make use of email/password authentication and firestore.

For firestore, only one database is required - "Exhibitions". Exhibition ids will need to be set to auto-generate, and documents will need to adhere to the follow structure:

```
{
    artefacts: { collection: string, id: number }[],
    exhibitionName: string,
    user: reference
}
```

### Step 4: Launching the App

Once all the dependancies have been installed and your .env file is in place with a valid set of variables and values, you will then be able to run the application, and for this purpose you can use the following script in your terminal:

```
npm run dev
```

Your terminal should now show show your local host along with the port being used. If your local host does not automatically open in your browser, you open a tab manually by ctrl + click on the local link.

### And Done! Happy Curating
