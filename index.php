<?PHP
	$_HEADERS = apache_request_headers();
	$ajaxified = !empty($_HEADERS['X-Ajaxify']);

	if (!$ajaxified) require 'tpl/page_header.php';
	else echo '<head><title>Secret</title></head>';

?>

<div data-ajaxified="main-content" data-ajaxifystate="<?PHP echo time(); ?>">
		<h1>Hello, world!</h1>
</div>

<?PHP
	$_HEADERS = apache_request_headers();
	if (!$ajaxified) require 'tpl/page_footer.php';
?>
