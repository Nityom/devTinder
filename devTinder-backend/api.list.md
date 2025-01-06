# DevTinnder APIs

### authRouter
- POST /signup
- POST /login
- POST /logout

### profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password // forgot password api

### connectionRequestRouter
- POST /request/send/:status/:userId

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

### userRouter
- GET /user/connections
- GET /user/requests/received
- GET /feed - gets you the profiles of either users in platform

Status : ignore,interested,accepted,rejected
