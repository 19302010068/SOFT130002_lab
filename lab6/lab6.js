test();
function test()
{
    testTime();
    testMail("12345678901", "19302010068@fudan.edu.");
    testRedundancy("Is is IS IS is Is the Z z Z, iS-is cost of of gasoline going up up up _ _");
    testKeyBoard("7_This_is_a_test", "_hs_s_a_es");
    testSpecialReverse("  hello  world! the sky is blue  ");
    twoSum([1, 2, 3, 4], 5);
    lengthOfLongestSubstring("abcdbefg");
}

/*
1.
背景：
    每隔五秒运行一次函数直到某一整分钟停止，比如从20:55:45运行到20:56:00停止；
    或者运行10次，先到的为准。从1开始每过五秒，输入框内数值翻倍。初始值为1。
注意：
    你可以在函数 timeTest内部 和 timeTest外部 写代码使得该功能实现。
要求：
    ①要求使用JS闭包的方式使得计数实现局部私有，不可以在全局区域声明计数变量。
    ②使用console.log打印计数即可，到达一分钟提前停止也需要console.log相应的提示语句。
*/

function testTime(){
    let counter = 0;
    let value = 1;
    let interval = setInterval(count, 5000);
    let timeout = setTimeout(stop, 60000 - Date.now() % 60000);
    count();

    function count()
    {
        console.log(value);
        value *= 2;
        if (counter++ >= 10)
        {
            clearInterval(interval);
            clearTimeout(timeout);
        }
    }

    function stop()
    {
        clearInterval(interval);
        console.log("Timer was stopped at " + new Date());
    }
}
// testTime();

/*
2.
要求：
    ①能够对传入的、移动手机电话（11位）、邮箱字符串（上网查找其要求）进行正则判定。
    ②使用console.log打印即可，例如，电话不符合要求但是邮箱符合要求，则console.log("The telephone is right and the mail is wrong!")。
    ③邮箱字符串的正则匹配的理解需写入lab文档。
    ④telephone与mail均是字符串。
*/
function testMail(telephone,mail) {
    let tel = /^1\d{10}$/.test(telephone);
    let email = /^\w+@\w+(\.\w+)*$/.test(mail);
    console.log("The telephone is " + transform(tel) + " and the mail is " + transform(email) + "!");

    function transform(boolean)
    {
        return boolean ? "right" : "wrong";
    }
}

/*
3.
要求：
    ①输入一段全英文语句，要求使用正则表达式找到相邻的重复单词放入一个Set，如果集合中元素超过10个，则按照首字母顺序取前10个于集合。
    ②使用console.log打印即可，将该集合打印出来。
    ③例如：输入"Is is the iS is cost of of gasoline going up up"，输出：Set { 'Is is', 'iS is', 'of of', 'up up' }。
    ④对该函数中用的正则匹配的理解需写入lab文档。
    ⑤str为字符串。
*/
function testRedundancy(str) {
    let set = new Set();
    let regExp = /(\w+)\W+\1/gi;
    while (true)
    {
        let result = regExp.exec(str);
        if (result === null)
            break;
        set.add(result[0]);
        regExp.lastIndex -= result[1].length;
    }
    if (set.size > 10)
    {
        let array = Array.from(set).sort(compareIgnoreCase);
        for (const item of set)
        {
            if (array.indexOf(item) >= 10)
                set.delete(item);
        }
    }
    console.log(set);

    function compareIgnoreCase(a, b)
    {
        a = a.toUpperCase();
        b = b.toUpperCase();
        return a.localeCompare(b);
    }
}


/*
4.
背景：
    旧键盘上坏了几个键，于是在敲一段文字的时候，对应的字符就不会出现。
    现在给出应该输入的一段文字、以及实际被输入的文字，请你使用Set列出肯定坏掉的那些键。
    例如：输入7_This_is_a_test和_hs_s_a_es    输出：Set { '7', 'T', 'I' }
要求：
    ①需要使用Set。
    ②只能使用一次循环。
    ③使用console.log打印即可，将该集合打印出来。
    ④wantInput和actualInput为字符串。
注意：
    ①注意联系生活，并注意观察我给的上述例子。
*/
function testKeyBoard(wantInput, actualInput) {
    let wantSet = new Set(wantInput.toUpperCase());
    let actualSet = new Set(actualInput.toUpperCase());
    for (const key of actualSet)
        wantSet.delete(key);
    console.log(wantSet);
}

/*
5.
背景：
    给定一个输入英文语句字符串，反转该语句。例如the sky is blue变成blue is sky the。
要求：
    ①如果输入的字符串前后有空格，输出中应该去除前后空格。如果输入字符串中间出现连续的两个空格，输出应该变为一个。
    比如输入是“  hello  world!  ”，输出应该是“world! hello”。
    ②请使用Array。
    ③使用console.log打印即可，将该字符串打印出来。
    ④只能显式使用一次循环。
    ⑤str为字符串。
*/
function testSpecialReverse(str) {
    console.log(join(str.trim().split(/ +/).reverse()));

    function join(array)
    {
        let result = "";
        for (const item of array)
            result += item + " ";
        return result.substr(0, result.length - 1);
    }
}

/*
6.
背景：
    给定一个整数数组和一个值，找出相加为该值的两个元素下标并保存在一个数组中。
    例如给定 [2, 7, 11, 15]和9,
    打印结果为[0,1]
要求：
    ①使用Map。
    ②只能显式使用一次循环。
    ③使用console.log打印即可，将满足条件的数组打印出来。
    ④nums为数字数组，如[1,2,3,4],target为数字,如5，那么输出为
    [ 0, 3 ]
    [ 1, 2 ]
*/

function twoSum(nums, target) {
    let map = new Map();
    for (let i = nums.length - 1; i >= 0; i--)
    {
        map.set(nums[i], i);
        if (map.has(target - nums[i]))
            console.log([i, map.get(target - nums[i])]);
    }
}


/*
7.
背景：
    打印最长的包含不同字符串的子字符串长度。
要求：
    ①使用Map。
    ②例如：输入"abbbbb",输出2，输入"bbbbb",输出1；
    ③只能显式使用一次循环。
    ④使用console.log打印即可。
    ⑤str为字符串。
*/
function lengthOfLongestSubstring(str) {
    let longest = 0;
    let start = 0;
    let map = new Map();
    for (let i = 0; i < str.length; i++)
    {
        let char = str.charAt(i);
        let pos = map.get(char);
        if (pos >= start)
        {
            updateLongest(i);
            start = pos + 1;
        }
        map.set(char, i);
    }
    updateLongest(str.length);
    console.log(longest);

    function updateLongest(end)
    {
        let length = end - start;
        if (length > longest)
            longest = length;
    }
}

/*
8.
背景：
    该部分只是为了让你们自己动动手更好地感受不同继承方式。
要求：
    ①借助构造函数、原型链、和Object.create分别编写DevelopingCountry、PoorCountry、DevelopedCountry以实现对Country的继承，
    并在三者分别添加sayHi、saySad、sayHappy函数分别打印"Hi,i am a developing country."、"I am a sad poor country."、"I am a Happy developed country."
    ②请调用他们并打印相关语句即可。
*/
function Country() {
    this.name = "国家";
}

function DevelopingCountry()
{
    Country.call(this);
}
DevelopingCountry.prototype.sayHi = function()
{
    console.log("Hi,i am a developing country.");
};
var developingCountry = new DevelopingCountry();

function PoorCountry() {}
PoorCountry.prototype = new Country();
PoorCountry.prototype.saySad = function()
{
    console.log("I am a sad poor country.");
};
var poorCountry = new PoorCountry();

Country.call(Country.prototype);
var developedCountry = Object.create(Country.prototype,
    {sayHappy:
            {
                value: function()
                {
                    console.log("I am a Happy developed country.");
                },
                writable: true,
                enumerable: true,
                configurable: true,
            }
    });

developingCountry.sayHi();
poorCountry.saySad();
developedCountry.sayHappy();