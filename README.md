This project was generated using Angular CLI ~10.

`npm i` to install packages

`npm start` to run project locally.

Also, the project is hosted online using Vercel here : https://todo-example.vercel.app/

This is bassed on an example rest endpoint (https://todo-example-server.vercel.app/db.json), that produces something like :

| id | title                                  | description                                   | created  | due\_date |
|----|----------------------------------------|-----------------------------------------------|----------|-----------|
| 1  | Call Mom                               | Don't forget to give her order numbers        | 8/6/2020 | 8/6/2020  |
| 2  | Visit the bank                         | Ask for help with taxes                       | 8/6/2020 | 8/6/2020  |
| 3  | Commit Code                            | Just commit it                                | 8/6/2020 | 8/6/2020  |
| 4  | Pack for travel                        | \- Shoes, Jeans, \.\.,\.\.\.\.\.\.\.,\.\.\.\. | 8/6/2020 | 8/6/2020  |
| 5  | Pick up the dogs\.                     |                                               | 8/6/2020 | 8/6/2020  |
| 6  | Piano Practice : Get sheets from Thabo |                                               | 8/6/2020 | 8/6/2020  |
| 7  | Order stands from takealot             |                                               | 8/6/2020 | 8/6/2020  |
| 8  | Return Wallace's call\.                |                                               | 8/6/2020 | 8/6/2020  |


**Limitations**

1. Because caching on the server needs a user to be authenticated, there's currently no capability to store this on the server and view on your other devices. Will improve that. To actually see a server request, comment out the `http` request in the `dataservice` class.
2. Adding images to new tasks.

**Future Improvements**
1. Authentication
2. Reminder Notifications using a service and firebase notifications.

**Libraries.**
- Angular
- Localforage
- Material
