import style from "../profile/profile.module.css";
import ProfileMenu from "../../components/profile-menu/profile-menu";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import {TIngredient} from "../../types/ingredient";
import {TFeedItem} from "../../types/feed";
import FeedCard from "../../components/feed-card/feed-card";
import {getCurrentFeed} from "../../services/feed-slice";
import {useAppSelector} from "../../services/store";

const ProfileOrdersPage = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const socketData = useAppSelector((state) => state.socket)
	const ingredients = useAppSelector(state => state.burger.data)
	const socketMessage = socketData.messages && socketData.messages[socketData.messages.length -1] ? JSON.parse(socketData.messages[socketData.messages.length -1]) : []

	const getOrder = (id: string) => {
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
		<div className={style.profile}>
			<div className={style.profile__container + " container"}>
				<div className={style.profile__menu + " mr-15"}>
					<ProfileMenu />
				</div>
				<div className={style.profile__content}>
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
									to={{ pathname: '/profile/orders/'+ item._id }}
									state={{backgroundOrder: location}}
									key={index}
									onClick={() => getOrder(item._id)}
								>
									<FeedCard data={item} ingredients={ingredientsFeed} />
								</Link>

							)
						})
					}
				</div>
			</div>
		</div>
	)
}

export default ProfileOrdersPage