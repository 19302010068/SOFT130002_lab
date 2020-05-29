<html>
<head>
    <title>Exercise 1</title>
</head>
<body>
<h1>Regular HTML section (outside &lt;?php ... ?&gt; tags)</h1>
<p>You can type regular HTML here and it will show up</p>

<h1>PHP section (inside &lt;?php ... ?&gt; tags)</h1>
<?php
//this is a php comment IN tags (will not appear)
date_default_timezone_set("Asia/Shanghai");
$date = date("l, M dS , Y H:i:s");
echo "This page was generated: " . $date . "<hr/>";
echo "<br>"; //notice we must echo tags in php.
$remaining = 365 - date("z");
$year = date("Y");
if ($year % 4 === 0 && $year % 100 !== 0 || $year % 400 === 0)
    $remaining++;
echo "There are " . $remaining . " days left in the year";
?>
</body>
</html>