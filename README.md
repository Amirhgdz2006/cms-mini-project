##example of using this headless cms:


1- signup (http://localhost:5000/api/auth/signup)
raw-body:
{
    "username":"example",
    "email":"example@gmail.com",
    "password":"example"
}

output:
{
    "message": "Your account has been created successfully"
}


#------------------------------------------------------#


2- login (http://localhost:5000/api/auth/login)
raw-body:
{
    "email":"example@gmail.com",
    "password":"example"
}

output:
{
    "message": "You’ve successfully logged in"
}


#------------------------------------------------------#

3- creating content type (http://localhost:5000/api/content-type)
raw-body:(example)
{
  "name": "article",
  "fields": [
    { "name": "title", "type": "string", "required": true },
    { "name": "slug", "type": "string", "required": true, "unique": true },
    { "name": "body", "type": "text", "required": false }
  ]
}

output:
{
    "message": "article model created successfully",
    "contentType": {
        "name": "article",
        "fields": [
            {
                "name": "title",
                "type": "string",
                "required": true,
                "unique": false,
                "_id": "6901edb89209579f66235c45"
            },
            {
                "name": "slug",
                "type": "string",
                "required": true,
                "unique": true,
                "_id": "6901edb89209579f66235c46"
            },
            {
                "name": "body",
                "type": "text",
                "required": false,
                "unique": false,
                "_id": "6901edb89209579f66235c47"
            }
        ],
        "_id": "6901edb89209579f66235c44",
        "createdAt": "2025-10-29T10:34:32.883Z",
        "__v": 0
    }
}


#------------------------------------------------------#


4- creating content (http://localhost:5000/api/content/{content-type}) example --> article
raw-body:(example)
{
  "title": "Dark Cat",
  "slug": "dark-cat",
  "body": "This is a mysterious article about a dark cat."
}


output:
{
    "message": "article created successfully",
    "record": {
        "title": "Dark Cat",
        "slug": "dark-cat",
        "body": "This is a mysterious article about a dark cat.",
        "_id": "6901ee2e9209579f66235c4b",
        "createdAt": "2025-10-29T10:36:30.807Z",
        "__v": 0
    }
}