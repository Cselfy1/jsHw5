const searchBtn = document.getElementById('searchBtn');
const userCard = document.getElementById('user-card');

async function fetchGitHubUser(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('User not found 😭');
        const data = await response.json();
        displayUserInfo(data);
    } catch (error) {
        alert(error.message);
        userCard.style.display = 'none';
    }
}

function displayUserInfo(user) {
    userCard.style.display = 'block';
    userCard.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}">
        <div class="details">
            <p><strong>Name:</strong> ${user.name || 'Not provided'}</p>
            <p><strong>Login:</strong> ${user.login}</p>
            <p><strong>URL to GitHub:</strong> <a href="${user.html_url}" target="_blank">${user.html_url}</a></p>
            <p><strong>Blog:</strong> <a href="${user.blog}" target="_blank">${user.blog || 'No blog'}</a></p>
            <p><strong>City:</strong> ${user.location || 'Not provided'}</p>
            <p><strong>Email:</strong> ${user.email || 'Not provided'}</p>
            <p><strong>Followers:</strong> ${user.followers}</p>
            <p><strong>Following:</strong> ${user.following}</p>
        </div>  
    `;
}

searchBtn.addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    if (username) {
        fetchGitHubUser(username);
    } else {
        alert('Please enter a GitHub username ✍️');
    }
});
