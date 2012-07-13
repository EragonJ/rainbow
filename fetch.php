<?php

	$url = filter_input(INPUT_GET,'url',FILTER_SANITIZE_STRING);

	$ch = curl_init();
	curl_setopt($ch,CURLOPT_URL,$url);
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
	$content = curl_exec($ch);
	curl_close($ch);

	$pattern = "/([\x{4e00}-\x{9fff}])/u";

	preg_match_all($pattern,$content,$result);
	
	$result = $result[0];
    $output = '';
	foreach( $result as $key => $value)
	{
		$output .= $value;
	}

	echo $output;

?>
