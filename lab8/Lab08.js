
/*请在该区域内声明或者获取所要使用的全局变量*/
/********************************************begin************************************/

/*Global Variable Area */
let container = document.querySelector(".container");
let prev = document.querySelector(".arrow_left");
let next = document.querySelector(".arrow_right");
let img = document.querySelector(".wrap").children;
let bt = document.querySelector(".buttons").children;
let on = document.querySelector(".on");
let td = document.getElementsByTagName("td");

let style = document.createElement("style");
document.head.appendChild(style);
style.outerHTML =
    "<style>" +
    "html" +
    "{" +
    "background-color: whitesmoke;" +
    "}" +
    "body" +
    "{" +
    "background-color: lightgray;" +
    "width: 700px;" +
    "margin: auto;" +
    "padding-bottom: 0.5rem;" +
    "}" +
    "h3" +
    "{" +
    "font-size: 20pt;" +
    "text-align: center;" +
    "}" +
    "table" +
    "{" +
    "font-size: 16pt;" +
    "font-weight: bold;" +
    "border-radius: 10px;" +
    "box-shadow: dimgray 2px 2px 5px;" +
    "width: 600px;" +
    "margin: 2rem auto 0 auto;" +
    "}" +
    "td" +
    "{" +
    "width: 33.3333%;" +
    "height: 29px;" +
    "}" +
    "[type=text]" +
    "{" +
    "display: block;" +
    "font-size: inherit;" +
    "font-weight: inherit;" +
    "box-sizing: border-box;" +
    "width: 100%;" +
    "height: 100%;" +
    "}" +
    "</style>";
/*********************************************end*************************************/



/* 任务一
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①点击左箭头prev和右箭头next的时候，可以切换到前一张图片和下一张图片。（左右箭头为html中的a标签）
 * ②每切换一张图片，右下角的数字标记对应变化。
 *      如：一开始，第1张图片显示出来，右下角的1-5的数值中，数值1位红色，2-4为绿色，表示当前显示第1张图片。
 *      点击next箭头，图片切换到第2张，同时，右下角红色数值从1切换为2，数值1,3,4,5为绿色。
 * ③当当前图片为第1张时，点击prev箭头，切换到第5张图片，且数值5置为红色。
 * 当当前图片为第5张时，点击next箭头，切换到第1张图片，且数值1置为红色。
 * ④切换图片的过程不要求，可直接切换，也可动画切换，但要求保证一定的切换动画合理性，不能出去明显的衔接不当。
 * ⑤本部分只能使用原生JS。
 */
/********************************************begin************************************/

/*Code Here*/
let transition = function()
{
    const WIDTH = 600;
    const ITEM_FIRST = 0;
    const ITEM_LAST = 6;
    const ITEMS = 5;
    const BOUNDARY_LEFT = (ITEM_LAST - 1) * -WIDTH;
    const BOUNDARY_RIGHT =  (ITEM_FIRST - 1) * -WIDTH;
    const SIZE = ITEMS * WIDTH;
    const DURATION = 300;

    let target = 1;
    let currentPos = 0;
    let endPos;
    let length;
    let endTime;
    let interval;
    let timeout;

    function move()
    {
        currentPos = endPos + length * (endTime - Date.now()) / DURATION;
        if (currentPos <= BOUNDARY_LEFT)
        {
            target -= ITEMS;
            currentPos += SIZE;
            endPos += SIZE;
        }
        else if (currentPos >= BOUNDARY_RIGHT)
        {
            target += ITEMS;
            currentPos -= SIZE;
            endPos -= SIZE;
        }
        setPos();
    }

    function stop()
    {
        clearInterval(interval);
        interval = undefined;

        currentPos = endPos;
        if (currentPos === BOUNDARY_LEFT)
        {
            target -= ITEMS;
            currentPos += SIZE;
        }
        else if (currentPos === BOUNDARY_RIGHT)
        {
            target += ITEMS;
            currentPos -= SIZE;
        }
        setPos();

        on.classList.remove("on");
        if (target < 1)
            target += ITEMS;
        on = on.parentNode.children[target - 1];
        on.classList.add("on");
    }

    function setPos()
    {
        let pos = currentPos;
        let state = true;
        for (const image of img)
        {
            if (state)
            {
                image.style.marginLeft = pos + "px";
                pos += WIDTH;
                if (pos >= 0)
                    state = false;
            }
            else
                image.style.removeProperty("margin-left");
        }
    }

    transition.to = function(n)
    {
        if (interval !== undefined)
        {
            clearInterval(interval);
            clearTimeout(timeout);
        }
        target = n;
        endPos = (target - 1) * -WIDTH;
        length = currentPos - endPos;
        endTime = Date.now() + DURATION;
        interval = setInterval(move, 1);
        timeout = setTimeout(stop, DURATION);
    };

    transition.by = function(n)
    {
        transition.to(target + n);
    }
};
transition();
prev.onclick = () => transition.by(-1);
next.onclick = () => transition.by(1);
/*********************************************end*************************************/



/* 任务二
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①轮播可以自动播放，切换图片间隔为2s，每一次切换的效果与点击next箭头的效果一致。
 * ②当鼠标移入轮播区域内时，停止自动播放。
 * ③当鼠标不在轮播区域内时，开始自动播放。
 * ④页面刚加载完成时，如果鼠标不在轮播区域内，自动开始自动播放；否则，等待直到鼠标移出轮播区域，再进行自动播放。
 * ⑤本部分只能使用原生JS。
 */
/********************************************begin************************************/

/*Code Here*/
let timer = function()
{
    const TIME = 2000;

    let startTime;
    let remainingTime = TIME;
    let timeout;

    function finish()
    {
        next.click();
        remainingTime = TIME;
        timeout = undefined;
        timer.start();
    }

    timer.start = function()
    {
        if (timeout === undefined)
        {
            startTime = Date.now();
            timeout = setTimeout(finish, remainingTime);
        }
    };

    timer.stop = function()
    {
        clearTimeout(timeout);
        timeout = undefined;
        remainingTime -= Date.now() - startTime;
    }
};
timer();
container.onmouseout = () =>
{
    if (document.hasFocus())
        timer.start();
};
container.onmouseover = () =>
{
    if (document.hasFocus())
        timer.stop();
};
window.onload = () => timer.start();
window.onfocus = () => timer.start();
window.onblur = () => timer.stop();
/*********************************************end*************************************/



/* 任务三
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①点击右下角的任意一个数值，能够切换到对应图片，且相应数值变为红色。
 * ②进行①操作过后，是否自动播放，其规则与上一个任务一致。
 * ③本部分只能使用原生JS。
 */
/********************************************begin************************************/

/*Code Here*/
for (let i = 1; i <= bt.length; i++)
    bt[i - 1].onclick = () => transition.to(i);
/*********************************************end*************************************/


/*任务四
 * 请参考css中的style参数、html中的内容、下方的效果要求，然后在下面区域内编写代码。
 * 效果要求：
 * ①点击某一非表头的单元格，可以编辑其内容，编辑完毕后点击其他部位，可以在界面上显示修改后的内容。
 * ②点击单元格后，光标自动定位于单元格的首个字符或者汉字前。
 * ③本部分可以使用jQuery，也可以使用原生JS。
 */
/********************************************begin************************************/

/*Code Here*/
let handler = e =>
{
    e.target.innerHTML = "<input type='text' value='" + e.target.innerText + "'>";
    let input = e.target.firstChild;
    input.onblur = () => e.target.innerText = input.value;
    input.focus();
};
for (const cell of td)
    cell.onclick = handler;
/*********************************************end*************************************/