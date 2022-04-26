"use strict"
/**
 * Displays each character of the level given in parameter
 * @param {number} level -Corresponds to the level number in the levels array(0 -> 6 included)
 */
function buildLevel(level) {
        var laMap = levels[level].map;


        for (var lignes of laMap) {  //Creation des lignes

                var divLigne = document.createElement('div');
                $("#world").append(divLigne);
                $(divLigne).addClass('Lignes')


                for (var c of lignes) {  //Creation des cases



                        var divCase = document.createElement('div');



                        $(divLigne).append(divCase);
                        $(divCase).addClass('square');

                        if (c == " ") {
                                $(divCase).addClass('empty');
                        }
                        else if (c == '#') {
                                $(divCase).addClass('box');
                        }
                        else if (c == 'x') {
                                $(divCase).addClass('target');
                        }
                        else if (c == '🧍') {

                                $(divCase).addClass('empty');
                                $(divCase).addClass('player');
                        }
                        else if (c == '@') {
                                $(divCase).addClass('box');
                                $(divCase).addClass('target');
                        }
                        else {
                                $(divCase).addClass('wall');

                        }


                }
        }
}




function getPlayerPosition() {
        let laMap = $("#world");

        let i=0;
        let j=0;


        for (let lignes of laMap.children()) {
                j = 0;
                for (let cases of $(lignes).children()) {

                        if (cases.classList.contains("player")) {
                                let position = {
                                        x: i,
                                        y: j
                                }
                                return position;
                        }
                        j = j + 1;
                }
                i = i + 1;
        }

}

/**
 * @param {{ x: any; y: any; }} position
 */ //Donner un objet en parametre ex: -> getSquareAt({x:5,y:6})
function getSquareAt(position) {
        let laMap = $("#world");
        var ligne = laMap.children().eq(position.x);

        return $(ligne).children().eq(position.y);
}



function move() {
        window.onkeydown = function (e) {
                let pos = getPlayerPosition();
                console.log(getPlayerPosition())

                var key = e.keyCode || e.which;
                switch (key) {
                        case 37:
                                //-Move left
                                let moveLeft = {
                                        x: pos.x,
                                        y: pos.y-1
                                }
                                console.log(moveLeft)
                                getSquareAt(moveLeft).addClass('player');
                                getSquareAt(pos).removeClass('player');
                                break;

                        case 39:
                                //-Move right
                                let moveRight = {
                                        x: pos.x,
                                        y: pos.y + 1
                                }
                                console.log(moveRight)
                                getSquareAt(moveRight).addClass('player');
                                getSquareAt(pos).removeClass('player');
                                break;


                        case 38:
                                //-Move up
                                let moveUp = {
                                        x: pos.x - 1,
                                        y: pos.y
                                }
                                console.log(moveUp)
                                getSquareAt(moveUp).addClass('player');
                                getSquareAt(pos).removeClass('player');
                                break;

                        case 40:
                                //-Move down
                                let moveDown = {
                                        x: pos.x + 1,
                                        y: pos.y
                                }
                                console.log(moveDown)
                                getSquareAt(moveDown).addClass('player');
                                getSquareAt(pos).removeClass('player');
                                break;

                        default:
                                break;
                }
        }
};





$(document).ready(function () {
        move();
        buildLevel(6);
})