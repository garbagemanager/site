let slideIndex = 0;
let slideInterval;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
    if (slides.length === 0) return;
    
    slides.forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });
    
    slideIndex = (n + slides.length) % slides.length;
    
    slides[slideIndex].style.display = 'block';
    setTimeout(() => {
        slides[slideIndex].classList.add('active');
    }, 50);
}

function changeSlide(step) {
    clearInterval(slideInterval);
    showSlide(slideIndex + step);
    startSlideShow();
}

function startSlideShow() {
    if (slides.length > 0) {
        showSlide(slideIndex);
        slideInterval = setInterval(() => {
            changeSlide(1);
        }, 3000);
    }
}

document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.background = '#555';
    });
    link.addEventListener('mouseout', () => {
        link.style.background = '';
    });
});

function loadMessages() {
    if (document.getElementById('messages-list')) {
        fetch('load_messages.php')
            .then(response => response.text())
            .then(data => {
                document.getElementById('messages-list').innerHTML = data;
            })
            .catch(() => {
                document.getElementById('messages-list').innerHTML = '<p>Ошибка загрузки сообщений</p>';
            });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('h1, h2, .content > p');
    elements.forEach(el => {
        el.style.opacity = 0;
        el.style.transition = 'opacity 1s';
        setTimeout(() => el.style.opacity = 1, 200);
    });

    if (document.getElementById('news')) {
        fetch('news.txt')
            .then(response => response.text())
            .then(data => {
                document.getElementById('news').innerHTML = data.split('\n').map(n => `<p>${n}</p>`).join('');
            })
            .catch(() => document.getElementById('news').innerHTML = 'Новостей пока нет.');
    }


    const form = document.querySelector('#feedback-form');
    if (form) {
        loadMessages();
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const message = document.querySelector('#message').value;

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('message', message);

            fetch('save_message.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert('Сообщение успешно отправлено и сохранено!');
                document.querySelector('#name').value = '';
                document.querySelector('#email').value = '';
                document.querySelector('#message').value = '';
                loadMessages();
            })
            .catch(error => {
                alert('Ошибка: ' + error);
            });
        });
    }

    startSlideShow();
});