window.addEventListener('load', () => {
  const BASE_URL = 'https://jsonplaceholder.typicode.com/';
  const app = document.getElementById('app');

  function loadUsers(url, parentNode) {
    const usersTable = document.createElement('table');

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
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
  data.map((user) => `
                            <tr>
                                <td>${user.name}</td>
                                <td class="action"><button class="btn" data-id=${user.id}>Posts</button></td>
                            </tr>
                        `).join('')
}
            `;
        parentNode.appendChild(usersTable);

        const btns = document.querySelectorAll('.btn');

        btns.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            const userId = e.target.dataset.id;
            fetch(`${url}/${userId}/posts`)
              .then((response) => response.json())
              .then((posts) => {
                const postsList = `
                            <h2>Posts</h2>
                            <ul class="posts">
                                ${
  posts.map((post) => `
                                        <li>
                                            <details>
                                                <summary>${post.title}</summary>
                                                <p>${post.body}</p>
                                            </details>  
                                        </li>  
                                        `).join('')
}
                            </ul>
                            `;
                parentNode.innerHTML = postsList;
              });
          });
        });
      });
  }

  loadUsers(`${BASE_URL}users`, app);
});