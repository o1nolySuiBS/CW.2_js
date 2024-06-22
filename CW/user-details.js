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
        mainDiv.style.margin = "0";
        mainDiv.style.width = "98vw";
        mainDiv.style.height = "99vh";

        const DivForDetail = document.createElement("div")
        DivForDetail.style.backgroundColor="LightCyan"
        DivForDetail.style.width="90vw"
        DivForDetail.style.marginLeft ="5vw"
        DivForDetail.style.height = "45vh"
        DivForDetail.style.margintop ="5px"
        DivForDetail.style.borderRadius="15px"
        DivForDetail.style.marginTop="1vh"
        DivForDetail.style.display="flex"
        DivForDetail.style.flexDirection="column"
        DivForDetail.style.border ="1px solid blue"


        mainDiv.appendChild(DivForDetail)
        const displayInfo = (obj, parentKey = '') => {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const fullKey = parentKey ? `${parentKey}.${key}` : key;
                    if (typeof obj[key] === 'object' && obj[key] !== null) {
                        displayInfo(obj[key], fullKey);
                    } else {
                        const userDetail = document.createElement("div");
                        userDetail.style.marginTop="3px"
                        userDetail.style.paddingLeft ="15px"

                        userDetail.textContent = `${fullKey}: ${obj[key]}`;
                        DivForDetail.appendChild(userDetail);
                    }
                }
            }
        };


        displayInfo(user);
        document.body.appendChild(mainDiv);

        // Додаємо кнопку для показу постів
        const divBtn = document.createElement("div");
        divBtn.classList.add("divForBtn");
        divBtn.style.display = "flex";
        divBtn.style.justifyContent = "center";
        divBtn.style.height = "9.5vh";

        const titleBtn = document.createElement("button");
        titleBtn.classList.add("btnForTitle");
        titleBtn.innerHTML = 'User posts';

        titleBtn.style.backgroundColor = "DodgerBlue";
        titleBtn.style.borderRadius = "25px";
        titleBtn.style.color = "white";
        titleBtn.style.width = "12vw";
        titleBtn.style.marginTop ="2vh"
        titleBtn.style.marginBottom="2vh"


        divBtn.appendChild(titleBtn);
        mainDiv.appendChild(divBtn);

        let postsVisible = false; // прапорець для відстеження стану постів
        let postsContainer = null; // контейнер для постів

        titleBtn.addEventListener("click", () => {
            if (postsVisible) {
                // Якщо пости видимі, ховаємо їх
                if (postsContainer) {
                    mainDiv.removeChild(postsContainer);
                }
                postsVisible = false;
            } else {
                // Якщо пости не видимі, завантажуємо та показуємо їх
                getUserPosts(userDetails)
                    .then((userPosts) => {
                        postsContainer = document.createElement("div");
                        postsContainer.classList.add("postsContainer");
                        postsContainer.style.backgroundColor="LightCyan"
                        postsContainer.style.width="90vw"
                        postsContainer.style.marginLeft ="5vw"
                        postsContainer.style.margintop ="5px"
                        postsContainer.style.borderRadius="15px"
                        postsContainer.style.marginTop="1vh"
                        postsContainer.style.border ="1px solid blue"


                        userPosts.forEach((post, index) => {
                            const titlePost = document.createElement("div");
                            titlePost.style.paddingLeft="15px"
                            titlePost.innerHTML =`${index + 1}. ${post.title}`;
                            titlePost.style.cursor = "pointer";
                            titlePost.style.margin = "5px 0";

                            titlePost.addEventListener("click", () => {
                                location.href = `post-details.html?postId=${post.id}&userId=${userDetails}`;
                            });

                            postsContainer.appendChild(titlePost);
                        });

                        mainDiv.appendChild(postsContainer);
                        postsVisible = true;
                    })
                    .catch((error) => {
                        console.error('Помилка при отриманні постів користувача:', error);
                    });
            }
        });
    })
    .catch((error) => {
        console.error('Помилка при отриманні деталей користувача:', error);
    });
//a (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//   a  6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.

