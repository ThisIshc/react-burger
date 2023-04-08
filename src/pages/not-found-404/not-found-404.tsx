import style from "./not-found-404.module.css"

const NotFound404 = () => {
	return (
		<div className={style.wrapper}>
			<p className="text text_type_digits-large">404</p>
			<br/>
			<p className="text text_type_main-medium">Страница не найдена</p>
		</div>
	)
}

export default NotFound404