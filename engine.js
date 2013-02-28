"use strict";

function ViewPort(element) {
    this.element = element;
    this.textBox = $("#textbox");
    this.textField = $("#text");
    this.avatar = $("#avatar");
    this.oWidth = element.getAttribute("width");
    this.oHeight = element.getAttribute("height");
    this.reset();
}
ViewPort.prototype = {
    reset: function () {
        this.isWider = window.innerWidth / window.innerHeight > this.oWidth / this.oHeight;
        if (this.isWider) {
            this.element.style.height = this.toPixelLength(window.innerHeight);
            this.element.style.width = this.toPixelLength(
                window.innerHeight / this.oHeight * this.oWidth);
        } else {
            this.element.style.width = this.toPixelLength(window.innerWidth);
            this.element.style.height = this.toPixelLength(
                window.innerWidth / this.oWidth * this.oHeight);
        }
        
        console.log("---------------");
        console.log("width:" + window.innerWidth + " vs " + this.element.style.width);
        console.log("height:" + window.innerHeight + " vs " + this.element.style.height);
    },
    toPixelLength: function (intval) {
        return intval.toString() + "px";
    }
}

function TextHandler(viewPort) {
    this.viewPort = viewPort;
}
TextHandler.prototype = {
    pattern: "p",
    handle: function (element) {
        this.viewPort.setAvatar(
            element.getAttribute("data-character"),
            element.getAttribute("data-mood"));
        this.viewPort.textField.replaceChild(
            text.cloneNode(true),
            this.textField.firstChild);
    }
}


function Scenario(chapters, textField) {
    this.chapters = chapters;
    this.chapterIndex = 0;
    this.initScenes();
    this.sceneIndex = 0;
    this.initTexts();
    this.textIndex = 0;
    this.textField = textField;
}
Scenario.prototype = {
    show: function () {
        var text = this.texts[this.textIndex];
        this.setAvatar(
            text.getAttribute("data-character"),
            text.getAttribute("data-mood")
        );
        this.textField.replaceChild(
            text.cloneNode(true),
            this.textField.firstChild);
    },
    initScenes: function() {
        this.scenes = this.chapters[this.chapterIndex].querySelectorAll("article");
    },
    initTexts: function() {
        this.texts = this.scenes[this.sceneIndex].querySelectorAll("p");
    },
    nextChapter: function () {
        if (this.chapterIndex < this.chapters.length - 1) {
            ++this.chapterIndex;
        } else {
            this.chapterIndex = 0;
        }
    },
    nextScene: function () {
        if (this.sceneIndex < this.scenes.length - 1) {
            ++this.sceneIndex;
        } else {
            this.nextChapter();
            this.initScenes();
            this.sceneIndex = 0;
        }
    },
    nextText: function () {
        if (this.textIndex < this.texts.length - 1) {
            ++this.textIndex;
        } else {
            this.nextScene();
            this.initTexts();
            this.textIndex = 0;
        }
    },
    next: function () {
        this.nextText();
        this.show();
    },
    setAvatar: function (character, version) {
        var picture = document.getElementById("avatar");
        picture.setAttribute("data-character", character);
        picture.setAttribute("data-mood", version);
    }
};

function init() {
    var textBox = document.getElementById("textbox");

    var scenario = new Scenario(
        document.querySelectorAll("section"),
        document.getElementById("text")
    );
    
    function next() {
        console.log("next");
        scenario.next();
    }
    
    function toggleTextBox() {
        textBox.classList.toggle("transparent");
    }

    function globalKeyDownListener(e) {
        switch (e.keyCode) {
            case 32: // space
                next();
            break;
            case 8: // backspace
                toggleTextBox();
            default:
            break;
        }
    }
    
    window.addEventListener("keydown", globalKeyDownListener, false);
    
    
    
    
    
    var viewport = new ViewPort(document.getElementById("viewport"));
    
    function resizeWindow() {
        viewport.reset();
    }
    
    window.addEventListener('resize', resizeWindow, false);
}

window.onload = init;
