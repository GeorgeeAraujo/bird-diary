if(window.matchMedia("(max-width:400px").matches){
    const hambMenuIcon = document.getElementById('hamb-menu-icon');
    const listMenu = document.getElementById('list-menu');
    hambMenuIcon.addEventListener('click', ()=>{
        toggleHambMenu();
    })

    function toggleHambMenu(){
        const classListHambMenu = Array.from(hambMenuIcon.classList);
        if(menuClickedClassIsThere(classListHambMenu)){
            hideMenuList();
            removeMenuClickedClass(hambMenuIcon);
        } else if (!menuClickedClassIsThere(classListHambMenu)){
            showMenuList();
            addMenuClickedClass(hambMenuIcon);
        }
    }

    function menuClickedClassIsThere(classList){
        return classList.includes('menu-clicked');
    }

    function showMenuList(){
        listMenu.style.display = 'block';
        listMenu.style.position = 'absolute';
        listMenu.style.top = '100%';
    }

    function hideMenuList(){
        listMenu.style.display = 'none';
    }


    function addMenuClickedClass(hambMenuIcon){
        hambMenuIcon.classList.add('menu-clicked');
    }

    function removeMenuClickedClass(hambMenuIcon){
        hambMenuIcon.classList.remove('menu-clicked');
    }
}
