<?PHP
	$_HEADERS = apache_request_headers();
	$ajaxified = !empty($_HEADERS['X-Ajaxify']);

	$title = 'Secret';

	if (!$ajaxified) require 'tpl/page_header.php';
	else echo '<title>', $title ?: 'Ajaxifier Demo', '</title>';
?>

<div data-ajaxified="main-content" id="asd" data-ajaxifystate="<?PHP echo time(); ?>">
		<p>Whoop!</p>
		<script>
		console.log('test');
		</script>
		<script src="foo.js"></script>
</div>


<?PHP
	$_HEADERS = apache_request_headers();
	if (!$ajaxified) require 'tpl/page_footer.php';
?>
