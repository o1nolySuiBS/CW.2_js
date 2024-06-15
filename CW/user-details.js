// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на
const url = 'https://jsonplaceholder.typicode.com/users/';

const getUserPosts = async (id) => {
    const response = await fetch(`${url}${id}/posts`);
    return response.json();
}

const getUserDetails = async (id) => {
    const response = await fetch(`${url}${id}`);
    return response.json();
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userDetails = urlParams.get('id');

getUserDetails(userDetails)
    .then((user) => {
        const mainDiv = document.createElement("div");
        mainDiv.classList.add('mainDivId');

        const displayInfo = (obj, parentKey = '') => {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const fullKey = parentKey ? `${parentKey}.${key}` : key;
                    if (typeof obj[key] === 'object' && obj[key] !== null) {
                        displayInfo(obj[key], fullKey);
                    } else {
                        const userDetail = document.createElement("p");
                        userDetail.textContent = `${fullKey}: ${obj[key]}`;
                        mainDiv.appendChild(userDetail);
                    }
                }
            }
        };

        displayInfo(user);


        document.body.appendChild(mainDiv);

// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера

        const divBtn = document.createElement("div");
        divBtn.classList.add("divForBtn");

        const titleBtn = document.createElement("button");
        titleBtn.classList.add("btnForTitle");
        titleBtn.innerHTML = 'User posts';


        divBtn.appendChild(titleBtn);
        mainDiv.appendChild(divBtn);

        titleBtn.addEventListener("click", () => {
            getUserPosts(userDetails)
                .then((userPosts) => {

                    divBtn.innerHTML = '';
                    divBtn.appendChild(titleBtn);

                    userPosts.forEach((post) => {
                        const titlePost = document.createElement("h5");
                        titlePost.innerHTML = post.title;

                        titlePost.addEventListener("click", () => {
                            location.href = `post-details.html?postId=${post.id}&userId=${userDetails}`;
                        });

                        divBtn.appendChild(titlePost);
                    });
                })
                .catch((error) => {
                    console.error('Помилка при отриманні постів користувача:', error);
                });
        })
    })
    .catch((error) => {
        console.error('Помилка при отриманні деталей користувача:', error);
    });

//a (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.

