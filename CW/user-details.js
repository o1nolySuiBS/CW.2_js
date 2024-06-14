// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
const url = 'https://jsonplaceholder.typicode.com/users/';

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
        console.log(user);
    })
    .catch((error) => {
        console.error('Помилка при отриманні деталей користувача:', error);
    });

// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера

// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
//     6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.

