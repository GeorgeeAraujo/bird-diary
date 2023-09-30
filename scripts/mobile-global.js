if(window.matchMedia("(max-width:1024px").matches){ //Verifica se o é um dispositivo mobile.
    const hambMenuIcon = document.getElementById('hamb-menu-icon');
    const listMenu = document.getElementById('list-menu');
    
    hambMenuIconListener();

    function toggleHambMenu(){ 
        const classListHambMenu = Array.from(hambMenuIcon.classList);   
        if(IsThereMenuClickedClass(classListHambMenu)){
            hideMenuList();
            removeMenuClickedClass(hambMenuIcon);
        } else if (!IsThereMenuClickedClass(classListHambMenu)){
            showMenuList();
            addMenuClickedClass(hambMenuIcon);
        };
    };

    function IsThereMenuClickedClass(classList){
        return classList.includes('menu-clicked');
    };

    function showMenuList(){
        listMenu.style.display = 'block';
        listMenu.style.position = 'absolute';
        listMenu.style.top = '100%';
        listMenu.style.right = '0%'
    };

    function hideMenuList(){
        listMenu.style.display = 'none';
    };

    function addMenuClickedClass(hambMenuIcon){
        hambMenuIcon.classList.add('menu-clicked');
    };

    function removeMenuClickedClass(hambMenuIcon){
        hambMenuIcon.classList.remove('menu-clicked');
    };

    function hambMenuIconListener(){
        hambMenuIcon.addEventListener('click', ()=>{
            toggleHambMenu();
        });
    };
};
