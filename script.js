let employees = [
{
name: "Arun Kumar",
id: "EMP001",
department: "IT",
role: "Software Developer",
email: "[arun@gmail.com](mailto:arun@gmail.com)",
status: "Active"
},

```
{
    name: "Priya Sharma",
    id: "EMP002",
    department: "HR",
    role: "HR Executive",
    email: "priya@gmail.com",
    status: "Active"
},

{
    name: "Rahul Raj",
    id: "EMP003",
    department: "Finance",
    role: "Accountant",
    email: "rahul@gmail.com",
    status: "Active"
},

{
    name: "Divya S",
    id: "EMP004",
    department: "Marketing",
    role: "Marketing Manager",
    email: "divya@gmail.com",
    status: "Inactive"
}
```

];

const table = document.getElementById("employeeTable");

const searchInput = document.getElementById("searchInput");

const departmentFilter =
document.getElementById("departmentFilter");

const form =
document.getElementById("employeeForm");

/* DISPLAY EMPLOYEES */

function displayEmployees(list = employees) {

```
table.innerHTML = "";

list.forEach((employee, index) => {

    const firstLetter =
        employee.name.charAt(0).toUpperCase();

    const statusClass =
        employee.status.toLowerCase();

    const row = document.createElement("tr");

    row.innerHTML = `

        <td>

            <div class="employee-info">

                <div class="employee-avatar">
                    ${firstLetter}
                </div>

                <div>

                    <div class="employee-name">
                        ${employee.name}
                    </div>

                    <div class="employee-email">
                        ${employee.email}
                    </div>

                </div>

            </div>

        </td>


        <td>
            <strong>${employee.id}</strong>
        </td>


        <td>
            ${employee.department}
        </td>


        <td>
            ${employee.role}
        </td>


        <td>

            <span class="status ${statusClass}">
                ${employee.status}
            </span>

        </td>


        <td>

            <button
                class="action-btn"
                onclick="toggleStatus(${index})"
                title="Change Status">

                <i class="bi bi-arrow-repeat"></i>

            </button>


            <button
                class="action-btn delete"
                onclick="deleteEmployee(${index})"
                title="Delete">

                <i class="bi bi-trash3-fill"></i>

            </button>

        </td>

    `;

    table.appendChild(row);

});

updateStatistics();
```

}

/* ADD EMPLOYEE */

form.addEventListener("submit", function(event) {

```
event.preventDefault();


const name =
    document.getElementById("employeeName").value;

const department =
    document.getElementById("employeeDepartment").value;

const role =
    document.getElementById("employeeRole").value;

const email =
    document.getElementById("employeeEmail").value;


const newEmployee = {

    name: name,

    id: "EMP" +
        String(employees.length + 1)
            .padStart(3, "0"),

    department: department,

    role: role,

    email: email,

    status: "Active"

};


employees.push(newEmployee);


displayEmployees();


form.reset();


const modal =
    bootstrap.Modal.getInstance(
        document.getElementById("employeeModal")
    );

modal.hide();
```

});

/* DELETE EMPLOYEE */

function deleteEmployee(index) {

```
const confirmation =
    confirm("Are you sure you want to delete this employee?");

if (confirmation) {

    employees.splice(index, 1);

    displayEmployees();

}
```

}

/* CHANGE STATUS */

function toggleStatus(index) {

```
if (employees[index].status === "Active") {

    employees[index].status = "Inactive";

} else {

    employees[index].status = "Active";

}

displayEmployees();
```

}

/* SEARCH */

searchInput.addEventListener("input", filterEmployees);

/* DEPARTMENT FILTER */

departmentFilter.addEventListener("change", filterEmployees);

function filterEmployees() {

```
const search =
    searchInput.value.toLowerCase();

const department =
    departmentFilter.value;


const filtered =
    employees.filter(employee => {

        const matchesSearch =

            employee.name
                .toLowerCase()
                .includes(search)

            ||

            employee.role
                .toLowerCase()
                .includes(search)

            ||

            employee.department
                .toLowerCase()
                .includes(search);


        const matchesDepartment =

            department === "all"

            ||

            employee.department === department;


        return matchesSearch &&
               matchesDepartment;

    });


displayEmployees(filtered);
```

}

/* STATISTICS */

function updateStatistics() {

```
document.getElementById("totalEmployees")
    .textContent = employees.length;


const active =
    employees.filter(
        employee => employee.status === "Active"
    ).length;


document.getElementById("activeEmployees")
    .textContent = active;


document.getElementById("newEmployees")
    .textContent =
    employees.length >= 2 ? 2 : employees.length;
```

}

/* INITIAL DISPLAY */

displayEmployees();
