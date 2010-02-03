<?php

	require_once('conf.php');

	$fname = 'liu7.0.4';
	$content = file_get_contents("tables/$fname.txt");
	preg_match_all("/(\S+)[\t ]+(.*)/",$content,$result);
	
	$cn = mysql_connect('localhost',$username,$password);
	mysql_select_db($db);

	for($i=0;$i<sizeof($result[1]);$i++)
	{
		mysql_query("SET NAMES 'UTF8';");
		mysql_query("INSERT INTO `$fname` (`word`,`code`) VALUES ('".$result[2][$i]."','".$result[1][$i]."')");
	}

?>
