
    let images = document.getElementsByClassName('main-img');
    let modal = document.getElementById('modal-main');
    let modalImg = document.getElementById('modalImg');
    let closeBtn = document.getElementById('closeBtn');
    let rateForm = document.getElementById('rateForm');
    let imgRate = document.getElementById('imgRate');
    var currentImg = '';

    // add event listeners
    for (let image of images) {
        image.addEventListener('click', openModal)
    }
    closeBtn.addEventListener('click', closeModal);
    rateForm.addEventListener('submit', formSubmit);

    // functions
    function openModal() {
        // set modal parameters
        modalImg.src = this.src;
        currentImg = this.id;
        // display user message - toggle visability of form and p
        rateForm.style.display = 'block';
        document.getElementById('thankYou').style.display = 'none';
        // display modal
        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function formSubmit(e){
        e.preventDefault();
        // display user message - toggle visability of form and p
        rateForm.style.display = 'none';
        document.getElementById('thankYou').style.display = 'block'
        
        // update database
        let xhr = new XMLHttpRequest();
        xhr.open('post', rateForm.action + currentImg, true);
        // update values under the image on home page
        xhr.onload = function () {
            let response = JSON.parse(this.responseText);
            // response contains an id as the currentImg will be reset by 
            // the time this asyncronous function runs
            document.getElementById('n' + response.id)
                .innerHTML = response.number;
            document.getElementById('r' + response.id)
                .innerHTML = response.score;
            // clear form
            rateForm.reset();
        }
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader("X-CSRFToken", document.getElementsByName('csrfmiddlewaretoken')[0].value);
        xhr.send('rating=' + imgRate.value);


        // reset currentImg for the next use of the function
        currentImg = '';
    }
