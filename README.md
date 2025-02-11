# Lights Store

Lights Store is a project that simulates an e-commerce website, built for SoftUni, React Exam. The website offers brand new lights in the Catalog Page and used lights in the Markeplace Page. Registered and not registered users have an access to both pages and they can see the details about every single light. If an user wants to add a light to their Cart, they need to create an account or login. If an user has already had an account, they would also be able to see the lights they added to their Cart before. Authorized users have the option to sell their old lights by adding information about them and public them on the Marketplace Page. If they want to edit the information about the lights they published or just delete them, they have the option to do it.
When an user clicks to see the details of a certain light, they can also see the current stock. If an user adds a light to their Cart, the stock changes straight away. A light can be added to their Cart only once, so the same user would not be able to add it a second time.

When the project was created for the React Exam, the design was based on HTML template using JQUERY and BOOTSTRAP, but in order to show my knowledge regarding CSS, the project no longer uses the template and its libraries, so changes are underway. The desing is expected to be completed at the end of February 2025.

The project uses its own server to process all requests, MongoDB to store the records and Firebase to store the images.

## Description

* ### The website has the following main pages: Home, About, Catalog and Markeplace. 

    - #### The Home Page has a banner with a link to the Catalog Page, followed by information regarding the services that the company offers. 

    ![Alt text](images-readme/home-services.png)

    - #### Then there are two links for Integrated LED and Bulb Type lights. The links lead to the Catalog Page and the lights are filtered automatically. 

    ![Alt text](images-readme/our-lights.png)

    - #### Next section is filled with the 8 newest comments left by users (guest and logged in). There is a slider that changes them every few seconds, but users can click the yellow buttons as well. 

    ![Alt text](images-readme/comments.png)

    - #### Last section is the Footer and the Copyright. The Footer consists of contact details, links to the pages in the Header and link following to the Leave us a comment Page. 

    ![Alt text](images-readme/footer-copyright.png)

    - #### The Leave us a comment Page can be filled in by authenticated or guest users and has front-end and back-end validation for all fields. 

    ![Alt text](images-readme/leave-us-comment.png)


* ### Catalog Page shows all lights created by the Admin Account. Users(authenticated or guests) can click each light and see the detais. The page has search and sort options and uses pagination.

![Alt text](images-readme/catalog.png)

* ### Marketplace Page shows all lights created by all users. Users(authenticated or guests) can click each light and see the detais. The page has search and sort options and uses pagination.

![Alt text](images-readme/marketplace.png)

* ### Login Page is available for not authenticated users and has front-end and back-end validation for all     fields. 

    ![Alt text](images-readme/login.png)

    - #### If the email or the password are not correct, a toaster notification shows. 

    ![Alt text](images-readme/login-wrong.png)

* ### Register Page is available for not authenticated users and has front-end and back-end validation for all fields. 
    ![Alt text](images-readme/register.png)

    - #### The email has to be unique, if there is another user with the same email, a toaster notification shows. 
    
    ![Alt text](images-readme/register-wrong.png)
 
 * ### Authenticated users can access Cart and Profile Pages, and click the Logout Button. 
 
![Alt text](images-readme/nav-authenticated.png)

* ### Cart Page shows all lights the user has added to their cart. The lights Ids are stored in MongoDB, which means that every time the user logges in, it shows the lights they added last time. The user has the option to see the details about the light. Also, they can remove the light by the link at the bottom of each light. 

![Alt text](images-readme/cart.png)

* ### Profile Page shows all lights created by the user. They can click each light and see the detais. The page uses pagination. It has the option to sell an old light by clicking the link 'Give your old light a new life'. 

![Alt text](images-readme/profile.png)

* ### Create Light Page shows a form that has front-end and back-end validation for all fields. When the light is created, it shows in the Profile Page. 

![Alt text](images-readme/create-light-1.png) 
![Alt text](images-readme/create-light-2.png)

* ### Details Page for guest users shows information about the light. When Buy button is clicked it leads to the Login Page. 

![Alt text](images-readme/details-guest.png)

* ### Details Page for authenticated users shows information about the light. Buy button shows if light has 1 or more quantities. 

    ![Alt text](images-readme/details-authenticated.png)

    - ####  When Buy button is clicked, it shows a message saying that light has been added to the Cart. Quantities and Cart change straight away. 
    
    ![Alt text](images-readme/details-in-stock.png)

* ### Details Page for authenticated users shows information about the light and out of stock message - when light has 0 quantities. 

![Alt text](images-readme/details-no-stock.png)

* ### Details Page for authenticated users shows information about the light in the Profile Page. It shows Edit and Delete buttons. 

    ![Alt text](images-readme/details-profile.png)

    - #### Edit Page fills all fields automatically and has front-end and back-end validation for all fields. 
    
    ![Alt text](images-readme/edit-1.png) 
    ![Alt text](images-readme/edit-2.png)

    - #### Delete Page shows a message where the user can choose to confrim or cancel the delete request. 
    
    ![Alt text](images-readme/delete.png)

## Getting Started

### Installing

* Clone the repository or download all files.

### Executing program

* Run Client

    - The client is deployed on Firebase, so you can open the following link in your browser:

        ```
        https://light-store-b0435.web.app/
        ```

    - The client can be run on localhost by copying these commands to the terminal:

        ```
        npm cd client
        ```
        ```
        npm install
        ```
        ```
        npm run dev
        ```

* Run Server
    ```
    npm cd server
    ```
    ```
    npm install
    ```
    ```
    npm start
    ```

* Info about MongoDB

The database is stored on MongoDB Atlas Cluster, so in order to get access to the database, I have to confirm your IP address. If you want to get access, please send an email to krasenboychev11@gmail.com, write shortly why you need access and inculde your IP address.
