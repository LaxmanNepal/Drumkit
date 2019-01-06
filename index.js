
var drum = document.querySelectorAll(".drum");
/* Add an event listener to each drum. Because drum is a collection of nodes (array), a loop has to add an event listener to each node element individually. */
for (var i = 0; i < drum.length; i++){
    drum[i].addEventListener('click', function(){
        var click = this.innerHTML;
       playSound(click);
    
    });
}

/*listen for and return the innerHTML of the element that was keypressed*/
document.addEventListener('keypress', function(e){
        var press = e.key;
       playSound(press);
    });

//function set up to play the sound
function playSound(key){

    switch(key){
        case 'w':
        var audio = new Audio('sounds/crash.mp3');
            audio.play();
            showAnimation(key);
        break;
        case 'a':
        var audio = new Audio('sounds/kick-bass.mp3');
            audio.play();
            showAnimation(key);
        break;
        case 's':
        var audio = new Audio('sounds/snare.mp3');
            audio.play();
            showAnimation(key);
        break;
        case 'd':
        var audio = new Audio('sounds/tom-1.mp3');
            audio.play();
            showAnimation(key);
        break;
        case 'j':
        var audio = new Audio('sounds/tom-2.mp3');
            audio.play();
            showAnimation(key);
        break;
        case 'k':
        var audio = new Audio('sounds/tom-3.mp3');
            audio.play();
            showAnimation(key);
        break;
        case 'l':
        var audio = new Audio('sounds/tom-4.mp3');
            audio.play();
            showAnimation(key);
        break;
    }

}

//set up a function to show animation
function showAnimation(key){
    var button = document.querySelector('.'+ key);
    button.classList.add('pressed');

    window.setTimeout(function(){
        button.classList.remove('pressed');
    }, 100)

}