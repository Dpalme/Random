let objects = [];
let counter = 0;
class RandomObject {
    constructor(type, title = "", author = "", text = "", url = "", external = "") {
        this.id = counter;
        this.type = type;
        this.title = title;
        this.author = author;
        this.text = text;
        this.url = url;
        this.external = external;
        objects.push(this);
        counter++;
    }
}

RandomObject.prototype.toString = function objToString() {
    return "<a class='lh-lg col-12 blue' href='javascript:set_data(get_from_id(" + this.id + "))'>" + this.author + " - " + this.title + "</a>";
}

window.onload = function start() {
    title_tag = object({
        type: "h4",
        class: "text-r my-n lh-1"
    });
    author_tag = object({
        type: "h4",
        class: "greyed-out text-r"
    });
    objectToContent({
        type: 'div',
        class: 'col-6',
        children: [title_tag, author_tag]
    })
    external_tag = object({
        type: "a",
        class: "d-block blue col-12 h4 mt-n lh-1",
        innerText: "open"
    })
    iframe_tag = object({
        type: "iframe",
        class: "card p-n col-12 my-n",
        frameborder: "0",
        allowtransparency: "true",
        allow: "encrypted-media",
        width: window.innerWidth < window.innerHeight ? parseInt(window.innerWidth * .775) + "px" : "440px",
        height: "512px"
    });
    text_tag = object({
        type: "pre",
        class: "body-text w-f my-n mr-lg back-2 lh-1",
        style: "box-sizing: border-box;"
    });
    objectToContent({
        type: 'div',
        class: 'col-6',
        children: [external_tag, iframe_tag, text_tag]
    })
    index_tag = objectToContent({
        type: "div",
        class: "grid col-12"
    })

    if (navigator.share) {
        document.getElementById("share-button").classList.remove("d-none")
    }
    url_object();
}

function set_data(object) {
    index_tag.innerHTML = "";

    if (object.title != "") {
        title_tag.classList.remove("d-none");
        title_tag.innerText = object.title;
    } else {
        title_tag.classList.add("d-none")
    }

    if (object.author != "") {
        author_tag.classList.remove("d-none");
        author_tag.innerText = object.author;
    } else {
        author_tag.classList.add("d-none")
    }

    if (object.text != "") {
        text_tag.classList.remove("d-none");
        text_tag.innerText = object.text;
    } else {
        text_tag.classList.add("d-none")
    }

    if (object.url != "") {
        iframe_tag.classList.remove("d-none");
        iframe_tag.setAttribute("src", object.url);
    } else {
        iframe_tag.classList.add("d-none")
    }

    if (object.external != "") {
        external_tag.classList.remove("d-none")
        external_tag.setAttribute("href", object.external);
        external_tag.innerText = "Spotify";
    } else {
        external_tag.classList.add("d-none")
        external_tag.innerText = "";
    }

    if (navigator.share) {
        document.getElementById("share-button").addEventListener('click', () => {
            navigator.share({
                title: object.title.toString() + " - " + object.author.toString(),
                text: object.title.toString() + " - " + object.author.toString(),
                url: './?o=' + object.id.toString()
            }).then(() => {
                console.log('Thanks for sharing!');
            })
                .catch(err => {
                    console.log(`Couldn't share because of`, err.message);
                });
        });
    }
}

function get_from_id(id) {
    var keys = Object.keys(objects);
    for (i = 0; i < keys.length; i++) {
        object = objects[keys[i]];
        if (object.id == id) {
            return object;
        }
    }
}

function clear_data() {
    set_data({
        title: "",
        author: "",
        text: "",
        url: "",
        external: ""
    });
    index_tag.innerHTML = "";
}

function change_object(type) {
    var object = [Math.floor(Math.random() * objects.length)];
    while (object.type != type) object = objects[Math.floor(Math.random() * objects.length)];
    window.location = "./?o=" + object.id;
}

function all_objects(type) {
    clear_data();
    objects.sort((a, b) => a.author.codePointAt(0) - b.author.codePointAt(0)).forEach(object => {
        if (object.type == type) index_tag.innerHTML += object + "\n"
    });
}

function change_type(new_type) {
    clear_data();
    var rButton = document.getElementById('rand-button');
    rButton.setAttribute("onclick", "change_object('" + new_type + "')");

    var aButton = document.getElementById('all-button');
    aButton.setAttribute("onclick", "all_objects('" + new_type + "')");
}