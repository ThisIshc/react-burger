import {FunctionComponent, useEffect} from "react";
import styles from "./feed.module.css"
import {useDispatch} from "react-redux";
import FeedCard from "../../components/feed-card/feed-card";
import {TFeedItem} from "../../types/feed";
import {TIngredient} from "../../types/ingredient";
import {Link, useLocation} from "react-router-dom";
import {getCurrentFeed} from "../../services/feed-slice";
import {useAppSelector} from "../../services/store";



const FeedPage:FunctionComponent = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const socketData = useAppSelector((state) => state.socket)
	const ingredients = useAppSelector(state => state.burger.data)
	const socketMessage = socketData.messages && socketData.messages[socketData.messages.length -1] ? JSON.parse(socketData.messages[socketData.messages.length -1]) : []

	const getFeed = (id: string) => {
		if (socketMessage && socketMessage.orders) {
			const order = socketMessage.orders.find((item:TFeedItem) => id === item._id)
			dispatch(getCurrentFeed(order))
		}
	}

	useEffect(() => {
		dispatch({type: 'WS_CONNECTION_START'})
		return () => {
			dispatch({type: 'WS_CONNECTION_CLOSE'})
		}
	}, [])

	return (
		<div className={'feed'}>
			<div className="container pl-3 pr-3">
				<div className="feed__wrapper">
					<div className="feed__title mb-5 mt-8">
						<h1 className="text text_type_main-large">
							Лента заказов
						</h1>
					</div>
					<div className={styles.feed__content}>
						<div className={styles.feed__content_left}>
							<div className={styles.feed__cards}>
								{socketMessage && socketMessage.orders &&
									socketMessage.orders.map((item: TFeedItem, index: number) => {
										let ingredientsFeed:TIngredient[] = []
										item.ingredients.forEach((ingredientID) => {
											if (ingredients && Array.isArray(ingredients)) {
												ingredients.forEach((ingredient:TIngredient) => {
													if (ingredientID === ingredient._id) {
														ingredientsFeed.push(ingredient)
													}
												})
											}
										})
										ingredientsFeed = ingredientsFeed.reverse()
										return (
											<Link
												to={{ pathname: '/feed/'+ item._id }}
												state={{backgroundFeed: location}}
												key={index}
												onClick={() => getFeed(item._id)}
											>
												<FeedCard data={item} ingredients={ingredientsFeed} />
											</Link>

										)
									})
								}
							</div>
						</div>
						<div className={styles.feed__content_right}>
							<div className={`${styles.feed__table} mb-15`}>
								<div className={styles.feed__table_column}>
									<div className="feed__table_title text text_type_main-medium mb-6">
										Готовы:
									</div>
									<div className={`${styles.feed__table_complete} ${styles.feed__table_orders}`}>
										{socketMessage && socketMessage.orders &&
											socketMessage.orders.map((item:TFeedItem, index:number) => {
												if (item.status === 'done') {
													return <div className={'text text_type_digits-default mb-2'} key={index}>{item.number}</div>
												}
												return null
											})
										}
									</div>
								</div>
								<div className={styles.feed__table_column}>
									<div className="feed__table_title text text_type_main-medium mb-6">
										В работе:
									</div>
									<div className={styles.feed__table_orders}>
										{socketMessage && socketMessage.orders &&
											socketMessage.orders.map((item:TFeedItem, index:number) => {
												if (item.status !== 'done') {
													return <div className={'text text_type_digits-default mb-2'} key={index}>{item.number}</div>
												}
												return null
											})
										}
									</div>
								</div>
							</div>
							<div className="feed__result mb-15">
								<div className={'text text_type_main-medium'}>Выполнено за все время:</div>
								<div className={'text text_type_digits-large'}>{socketMessage.total}</div>
							</div>
							<div className="feed__result">
								<div className={'text text_type_main-medium'}>Выполнено за сегодня:</div>
								<div className={'text text_type_digits-large'}>{socketMessage.totalToday}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FeedPage