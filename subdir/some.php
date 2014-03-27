<?PHP
	$_HEADERS = apache_request_headers();
	$ajaxified = !empty($_HEADERS['X-Ajaxify']);

	$title = 'Some content in Subdir';

	if (!$ajaxified) require '../tpl/page_header.php';
	else echo '<title>', $title ?: 'Ajaxifier Demo', '</title>';
?>

<div data-ajaxified="main-content" id="asd" data-ajaxifystate="<?PHP echo time(); ?>">
		<p>Will this work?</p>
</div>


<?PHP
	$_HEADERS = apache_request_headers();
	if (!$ajaxified) require '../tpl/page_footer.php';
?>
