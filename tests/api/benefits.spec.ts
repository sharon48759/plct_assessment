import test from "@playwright/test";
import { defaultEmployee } from "../../data/users";

test.use({
  extraHTTPHeaders: {
    Authorization: "Basic VGVzdFVzZXI4ODc6PltWMSVIWVhpNGNR", //retrieve from environment variable or secret in real tests
  },
});

const path = "api/employees";

test("Get employees", async ({ request }) => {
  const response = await request.get(path);
  const responseBody = await response.json();
  test.expect(response.status()).toBe(200);
  test.expect(responseBody.length).toBeGreaterThan(0);
});

test("Add employee", async ({ request }) => {
  const response = await request.post(path, {
    data: defaultEmployee,
  });
  const responseBody = await response.json();
  test.expect(response.status()).toBe(200);
  test.expect(responseBody.firstName).toBe(defaultEmployee.firstName);
  test.expect(responseBody.lastName).toBe(defaultEmployee.lastName);
  test.expect(responseBody.dependants).toBe(defaultEmployee.dependants);
});

test("Edit employee", async ({ request }) => {
  const addResponse = await request.post(path, {
    data: defaultEmployee,
  });
  const addResponseBody = await addResponse.json();
  const updatedEmployee = {
    id: addResponseBody.id,
    firstName: "Updated",
    lastName: "Employee",
    dependants: 5,
  };
  const updateResponse = await request.put(path, {
    data: updatedEmployee,
  });
  const updateResponseBody = await updateResponse.json();
  test.expect(updateResponse.status()).toBe(200);
  test.expect(updateResponseBody.firstName).toBe(updatedEmployee.firstName);
  test.expect(updateResponseBody.lastName).toBe(updatedEmployee.lastName);
  test.expect(updateResponseBody.dependants).toBe(updatedEmployee.dependants);
});

test("Delete employee", async ({ request }) => {
  const response = await request.post(path, {
    data: defaultEmployee,
  });
  const responseBody = await response.json();
  const deleteResponse = await request.delete(`${path}/${responseBody.id}`);
  test.expect(deleteResponse.status()).toBe(200);
});

[
  {
    title: "Add employee without first name",
    firstName: "",
    lastName: "Employee",
    dependants: 3,
  },
  {
    title: "Add employee without last name",
    firstName: "Test",
    lastName: "",
    dependants: 3,
  },
  {
    title: "Add employee with negative dependants",
    firstName: "Test",
    lastName: "Employee",
    dependants: -1,
  },
  {
    title: "Add employee with 50 dependants",
    firstName: "Test",
    lastName: "Employee",
    dependants: 50,
  },
].forEach((testCase) => {
  test(testCase.title, async ({ request }) => {
    const response = await request.post(path, {
      data: {
        firstName: testCase.firstName,
        lastName: testCase.lastName,
        dependants: testCase.dependants,
      },
    });
    test.expect(response.status()).toBe(400);
  });
});
