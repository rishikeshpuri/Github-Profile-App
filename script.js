const GITHUB_API = "https://api.github.com/users/";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


const getProfile = async (userName) => {
    const responsive = await fetch('https://api.github.com/users/' + userName);
    const data = await responsive.json();
    console.log(data);
    // console.log(data.followers);

    createUserCard(data);

    getRepos(userName);
    
}

const getRepos = async (userName) => {
    const responsive = await fetch('https://api.github.com/users/' + userName + '/repos');
    const respData = await responsive.json();

    addReposToCard(respData);
}

const addReposToCard = async (repos)=> {
    const reposId = document.getElementById('repos');

    repos.sort( (a, b)=> b.stargazers_count - a.stargazers_count ).slice(0,10).forEach( (repo)=>{
        // console.log(rep);
        const repoElement = document.createElement('a');
        repoElement.classList.add('repo');

        repoElement.href = repo.html_url;
        repoElement.target = "_blank";
        repoElement.innerText = repo.name;

        // console.log(repoElement.innerText);
        reposId.appendChild(repoElement);
    } )
}


 
const createUserCard = (user) => {
    // const card = document.createElement('div');
    // card.classList.add('card');

    const htmlDATA = `
        <div class="card">
            <div class="img-container">
                <img class="avatar" src="${user.avatar_url}" alt="${user.name}"/>
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
            
                <ul class="info">
                    <li>${user.followers}<strong>Followers </strong></li>
                    <li>${user.following}<strong>Following </strong></li>
                    <li>${user.public_repos}<strong>Repos </strong></li>
                </ul>
                <h4>Repos:</h4>
                <div class="repos" id="repos" >
            
                </div>

            </div>
        </div>
    `;

    // main.insertAdjacentHTML('afterbegin', htmlDATA);
    main.innerHTML = htmlDATA;
}

// form submit event
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;
    if(user){
        getProfile(user);
        search.value = '';
    }




})

getProfile("florinpop17");