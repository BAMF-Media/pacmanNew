<?php
require "src/Kernel/require.php";

if(!defined("CLI_MODE"))
	define("CLI_MODE", false);

$GLOBALS["bootstrap"] = new Kernel\Kernel\Bootstrap;

?>
