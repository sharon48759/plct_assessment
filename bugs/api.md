# API Test

### Found bugs

- Get Favicon.ico request recieves 403
https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/favicon.ico
- Get all employees returns 403 instead of 400
- POST add employee returns 405 when dependents are a string that cannot be converted to a number
- 500 internal server error on request with wrong token, expected 401
- PUT creates new employee if id does not exist with 0 salary

## Bug report examples

### Title: PUT creates new employee if id does not exist with 0 salary

**Summary:** PUT request creates a new employee with 0 salary if the provided id does not exist

**Steps:**

1. prepare put request with non existant id in a valid format
2. send request

**Method:** PUT 

**Url:** https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees

**Body:** {"firstName":"0123","lastName":"ass","dependants":1,"id":"026ac913-2c69-4eb6-aaaa-826eef6a19db"}

**Expected result:** user should not be created, expecting 404 not found

**Actual result:** 200 ok, employee created  without salary

---

### Title: 500 internal server error on request with wrong token, expected 401

**Summary:** Sending a request with an invalid token returns a 500 server error

**Steps:**

1. Prepare any reques (checked with GET, POST, PUT)
2. Enter an invalid authorization token
3. send request

**Url:** https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees

**Expected result:** 401 unauthorized

**Acctual result:** 500 Internal Server Error
