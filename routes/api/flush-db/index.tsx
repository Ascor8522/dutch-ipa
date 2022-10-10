export default () => {
	return (
		<form action="/api/flush-db/post" method="POST">
			<h1>Flush the database</h1>
			<input type="password" name="password" placeholder="password" />
			<input type="submit" />
		</form>
	);
};
