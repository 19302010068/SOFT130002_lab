const works = [
    { author: "Micheal Jackson",lifetime:"1022-1055",tips: "Human", photos: ["human1.jpg","human2.jpg","human3.jpg"] },
    { author: "Maria JK",lifetime:"1920-2001", tips: "Classical", photos: ["classical1.jpg","classical2.jpg"] },
    { author: "John Herry UY", lifetime:"1894-1928",tips: "Abstract", photos: ["abstract1.jpg","abstract2.jpg","abstract3.jpg","abstract4.jpg","abstract5.jpg"] },
    { author: "Coco",lifetime:"1777-1799", tips: "Beauty",  photos: ["beauty1.jpg","beauty2.jpg"] }
];

let template = function()
{
    let article = elem("article");
    article.className = "item";

    let activeNode = elem("h4", "Genre : ", "tips");
    article.appendChild(activeNode);

    activeNode = elem("div");
    activeNode.className = "inner-box";
    activeNode.appendChild(elem("h3", "", "author"));
    activeNode.lastChild.style.display = "inline";
    activeNode.appendChild(elem("h5", "lifetime:", "lifetime"));
    activeNode.lastChild.style.display = "inline";
    activeNode.lastChild.style.marginLeft = "1rem";
    article.appendChild(activeNode);

    activeNode = elem("div");
    activeNode.className = "inner-box";
    activeNode.appendChild(elem("h3", "Popular Photos"));
    activeNode.appendChild(elem("div", undefined, "photos"));
    activeNode.lastChild.innerHTML = "<img width='50px' height='50px' style='margin: 0.25rem'>";
    article.appendChild(activeNode);

    activeNode = elem("button", "Visit");
    article.appendChild(activeNode);

    return article;

    function elem(tagName, data, anchor)
    {
        let element = document.createElement(tagName);
        if (data !== undefined)
            element.appendChild(document.createTextNode(data));
        if (anchor !== undefined)
            element.id = anchor;
        return element;
    }
}();

let container = document.querySelector(".flex-container");
for (const description of works)
{
    let article = template.cloneNode(true);

    for (const anchor of ["tips", "author", "lifetime"])
        select(anchor).firstChild.appendData(description[anchor]);

    let photos = select("photos");
    let img = photos.removeChild(photos.firstChild);
    for (const photo of description.photos)
    {
        let image = img.cloneNode();
        image.src = photo;
        photos.appendChild(image);
    }

    container.appendChild(article);

    function select(anchor)
    {
        let node = article.querySelector("#" + anchor);
        node.removeAttribute("id");
        return node;
    }
}