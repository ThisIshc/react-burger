import styles from './feed-card.module.css'
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {TFeedItem} from "../../types/feed";
import {FunctionComponent, useMemo} from "react";
import {TIngredient} from "../../types/ingredient";

interface IItem {
	data: TFeedItem,
	ingredients: TIngredient[]
}

const FeedCard:FunctionComponent<IItem> = (props) => {
	const sum = useMemo(() => {
		let sumIngredients = 0
		props.ingredients.forEach((item) => {
			sumIngredients += item.price
		})
		return sumIngredients
	}, [])
	return (
		<div className={styles.card}>
			<div className="card__wrapper p-6">
				<div className={`${styles.card__top} mb-6`}>
					<div className='text text_type_digits-default'>
						#{props.data.number}
					</div>
					<div className="card__date text text_type_main-default text_color_inactive">
						<FormattedDate date={new Date(props.data.createdAt)} />
					</div>
				</div>
				<div className="card__title mb-6">
					<span className={'text text_type_main-medium'}>{props.data.name}</span>
				</div>
				<div className={styles.card__content}>
					<div className={styles.card__items}>
						{props.ingredients.length > 0 &&
							props.ingredients.map((ingredient, index) => {
								if (props.ingredients.length >= 6 && index === 0) {
									return (
										<div className={`${styles.card__item} ${styles.card__item_last}`} key={index}>
											<img src={ingredient.image} alt={ingredient.name} />
											<span className={'text text_type_main-default'}>+{props.ingredients.length - (index + 1)}</span>
										</div>
									)
								} else if (index <= 5) {
									return (
										<div className={styles.card__item} key={index}>
											<img src={ingredient.image} alt={ingredient.name}/>
										</div>
									)
								}
							})
						}
					</div>
					<div className={styles.card__sum}>
						<span className={'text text_type_digits-default mr-2'}>{sum}</span>
						<CurrencyIcon type="primary" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default FeedCard