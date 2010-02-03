<?php

	//Use gzip to speed up
	ob_start("ob_gzhandler");

	require_once('conf.php');

	$input = filter_input(INPUT_GET,'input',FILTER_SANITIZE_STRING);
	$check = filter_input(INPUT_GET,'check',FILTER_SANITIZE_STRING);
	$IME   = filter_input(INPUT_GET,'IME',FILTER_SANITIZE_STRING);
	
	if($IME == "tsangjei")
	{
		$table = "`tsangjei7.0`";
	}
	else
	{
		$table = "`liu7.0.4`";
	}

	mysql_connect('localhost',$username,$password);
	mysql_select_db($db);
	mysql_query("SET NAMES 'UTF8'");

	//if your input is correct
	if(isset($check)&&isset($input)&&($check=="true"))
	{
		$pattern = "/(\D*)(\d*)/";
		preg_match($pattern,$input,$final);
		$code   = $final[1]; //chars
		$offset = ($final[2]=='') ? 0 : $final[2]; //digits
		
		if($result = mysql_query("SELECT `word` FROM ".$table." WHERE `code` = '".$code."' LIMIT ".$offset.",1"))
		{
			if($word = mysql_fetch_row($result))
			{
				echo trim($word[0]);
			}
			else
			{
				echo "nothing";
			}
		}
	}
	//if your input is incorrect
	else if(isset($check)&&isset($input)&&($check=="false"))
	{
		if($result = mysql_query("SELECT `code` FROM ".$table." WHERE `word` = '".$input."'"))
		{
			$count = 0;
			while($word = mysql_fetch_row($result))
			{
				$output .= $count.".".$word[0];
				$count++;
				
			}
			echo $output;
		}
	}
	else
	{
		if($result = mysql_query("SELECT `word` FROM ".$table." WHERE `code` = '".$input."'"))
		{
			$count = 0;
			while($word = mysql_fetch_row($result))
			{
				echo $count.".".$word[0];
				$count++;
			}
		}
	}
	//echo preg_match('/[\x{4e00}-\x{9fa5}]/u',$word[0]);
?>
