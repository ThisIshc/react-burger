import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {FunctionComponent, useEffect, useMemo, useState} from "react";
import styles from "./feed-detail.module.css"
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {clearCurrentFeed, getCurrentFeed} from "../../services/feed-slice";
import {TFeedItem} from "../../types/feed";
import {ISocketMessage} from "../../types/socket";
import {TIngredient} from "../../types/ingredient";
import {useAppSelector} from "../../services/store";

interface IFeedDetailsProps {
	isModal: boolean
}

interface IFeedDetailsState {
	order: TFeedItem | undefined,
	sum?: number,
	ingredientsData?: TIngredient[]
}

const FeedDetailPage:FunctionComponent<IFeedDetailsProps> = ({isModal}) => {
	const dispatch = useDispatch()
	const params = useParams()

	const [state, setState] = useState<IFeedDetailsState>()
	const socketData = useAppSelector((state) => state.socket)
	const ingredients = useAppSelector(state => state.burger.data)

	const socketMessage:ISocketMessage = socketData.messages && socketData.messages[socketData.messages.length -1] ? JSON.parse(socketData.messages[socketData.messages.length -1]) : []
	const order:TFeedItem | undefined = socketMessage && socketMessage.orders ? socketMessage.orders.find((item:TFeedItem) => item._id === params.id) : undefined

	// let sum = 0
	const orderIngredients = useMemo(() => {
		let obj:any = {}
		let ingredientsArr:TIngredient[] = []
		order?.ingredients?.forEach((item, index) => {
			obj[item] = obj[item] !== undefined ? ++obj[item] : 1
		})
		for (let key in obj) {
			if (ingredients && Array.isArray(ingredients)) {
				ingredients.forEach((item) => {
					if (item._id === key) {
						item = {
							...item,
							count: obj[key]
						}
						ingredientsArr.push(item)
					}
				})
			}
		}
		return ingredientsArr
	}, [ingredients, order])

	const sum = useMemo(() => {
		let sumOrder = 0
		if (orderIngredients.length) {
			orderIngredients.forEach(item => {
				if (item.count !== undefined) {
					sumOrder += (item.count * item.price)
				}
			})
		}
		return sumOrder
	}, [orderIngredients])

	useEffect(() => {
		dispatch({type: 'WS_CONNECTION_START'})
		setState({...state, order: order})
		if (state && state.order) {
			dispatch(getCurrentFeed(state.order))
		}
		return () => {
			dispatch({type: 'WS_CONNECTION_CLOSE'})
			dispatch(clearCurrentFeed)
		}
	}, [])

	return (
		<>
			{order !== undefined &&
				<div className={!isModal ? styles.feedDetail : ''}>
					<div className={`${styles.feedDetail__wrapper} pl-3 pr-3` }>
						<div className={`${styles.feedDetail__number} mb-10`}>
							<span className={'text text_type_digits-default'}>#{order.number}</span>
						</div>
						<div className="feedDetail__name mb-3">
							<span className={'text text_type_main-medium'}>{order.name}</span>
						</div>
						<div className={`${styles.feedDetail__status} mb-15`}>
							<span className={'text text_type_main-default'}>{order.status === 'done' ? 'Выполнен' : 'В работе'}</span>
						</div>
						<div className="feedDetail__compound">
							<div className="feedDetail__compound_title mb-6">
								<span className={'text text_type_main-medium'}>Состав:</span>
							</div>
							{orderIngredients &&
								<div className={`${styles.feedDetail__list} mb-10`}>
									{ orderIngredients.map((item, index) => {
										return (
											<div className={styles.feedDetail__item} key={index}>
												<div className={styles.feedDetail__item_name}>
													<div className={`${styles.card__item} mr-4`}>
														<img src={item.image} alt={item.name}/>
													</div>
													<span className={'text text_type_main-default'}>{item.name}</span>
												</div>
												<div className="feedDetail__item_count">
													<span className={'text text_type_digits-medium'}>{`${item.count} x ${item.price}`}</span>
													<CurrencyIcon type={'primary'} />
												</div>
											</div>
										)
									})}
							</div>
							}
							<div className={styles.feedDetail__bottom}>
								<div className="feedDetail__date">
									<span className={'text text_type_main-default text_color_inactive'}>
										<FormattedDate date={new Date(order.createdAt)} />
									</span>
								</div>
								<div className={styles.feedDetail__sum}>
									<span className={'text text_type_digits-default'}>{sum}</span>
									<CurrencyIcon type={'primary'} />
								</div>
							</div>
						</div>
					</div>
				</div>
			}
		</>
	)
}

export default FeedDetailPage