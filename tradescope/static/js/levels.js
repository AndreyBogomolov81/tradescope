document.addEventListener('DOMContentLoaded', function () {
    // работа с тегами
    // выделение тега при клике
    const tagsItems = document.querySelectorAll('.tag-cloud .tag-badge');
    const selectedTagContainer = document.querySelector('#selected-tags');
    
    //получаем нчальный массив с выделенными по умолчанию тегами
    let selectedTag = Array.from(tagsItems)
        .filter(t => t.classList.contains('active') && t.innerHTML != 'Все')
        .map(tag => tag.innerHTML);

    tagsItems.forEach(tag => {
        tag.addEventListener('click', function () {
            const tagValue = this.innerHTML;
            this.classList.toggle('active');
            if (this.classList.contains('active') && tagValue != 'Все') {
                selectedTag.push(tagValue);
            } else {
                selectedTag = selectedTag.filter(i => i != tagValue);
            }
            upadateHiddenInput();
        });
    });

    function upadateHiddenInput() {
        if (selectedTagContainer) {
            selectedTagContainer.innerHTML = "";
            selectedTag.forEach(tag => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = 'tags';
                input.value = tag;
                selectedTagContainer.appendChild(input);
            });
        }
    }

    upadateHiddenInput();
});