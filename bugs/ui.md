# UI bugs
### Login page:
- Wrong username breaks page - Error code: 405

### Benefits page:
- Table border is not responsive to size under 1000px width, results in border covering text
- After loging out using the Log Out button clicking back on browser will log you into the page
- No error or user alert for wrong or missing inputs in add amployee and update employee for all fields
- Long names shift UI, table border does not behave responsively.
When sesion times out, account remains logged in with information visible. (not editable)
- First and last name are switched in table columns.
- Edit employee tab id title is "Add Employee"
- No confirmation message appears when adding or updating employee data


## Bug report examples

### Title: No error or user alert for wrong or missing inputs in add amployee and update employee for all fields

**Summary:** When working in add or update employee and any or all of the values are input incorectly there is no alert or speciification of wrong input.

**Steps:**

Prerequisite: being logged in

Add Employee
1. Go to benefits page
2. Click "Add employee" which opens the employee modal
3. Add incorect data - empty fields, dependants over 32
4. Click "Add" button
5. No messege is displayed

Update Employee
1. Go to benefits page
2. Click the square and pen symbol in the actions column which opens the employee modal
3. Add incorect data - empty fields, dependants over 32
4. Click "Update" button
5. No messege is displayed

**Expected result:** Employee is not created, user receives an error message with specifications of error.

**Actual result:** Employee is not created, no error message displayed, user recieves no information about the mistake made.

---

### Title: Wrong username breaks login page

**Summary:** When wrong username is input the page displays Error code: 405

**Steps:**

Prerequisite: none

1. Open login page
2. Input wrong username
3. Input any password
4. Click "log in" button
5. Page shows Error code: 405

**Expected result:** the following messege appears: There were one or more problems that prevented you from logging in:
The specified username or password is incorrect.

**Actual result:** Page shows Error code: 405