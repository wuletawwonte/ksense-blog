window.addEventListener("load", () => {

    const BASE_URL = 'https://jsonplaceholder.typicode.com/';
    const app = document.getElementById("app");
    const usersTable = document.createElement("table");

    fetch(BASE_URL + "users")
        .then(response => response.json())
        .then(data => {
            usersTable.innerHTML = `
                <tr>
                    <th>
                        Name
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
                ${
                    data.map(user => {
                        return `
                            <tr>
                                <td>${user.name}</td>
                                <td><button>Posts</button></td>
                            </tr>
                        `;
                    }).join('')   
                }
            `;
            app.appendChild(usersTable);
        })

});