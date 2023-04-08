import React, {FunctionComponent, SyntheticEvent, useRef} from "react";
import {DragIcon, ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import style from "./ingredient-constructor.module.css"
import {useDispatch} from "react-redux";
import {deleteIngredientConstructor} from "../../services/burger-constructor-slice";
import {updateData} from "../../services/burger-slice";

type TIngredient = {
	readonly dragId: string,
	readonly id: string,
	readonly image: string,
	readonly name: string,
	readonly type: string,
	readonly index: number,
	readonly price: number,
}

interface IIngredientConstructorProps {
	item: TIngredient,
	index: number,
	moveCard: (dragIndex: number, hoverIndex: number) => void
}


const IngredientConstructor:FunctionComponent<IIngredientConstructorProps> = ({item, index, moveCard }) => {
	const dispatch = useDispatch()

	const ref = useRef<HTMLDivElement>(null);

	const [{handlerId}, drop] = useDrop({
		accept: 'card',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId()
			}
		},
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}

			// @ts-ignore
			const dragIndex = item.index
			const hoverIndex = index
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect()
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
			const clientOffset = monitor.getClientOffset()
			const hoverClientY = clientOffset ? (clientOffset.y - hoverBoundingRect.top) : hoverBoundingRect.top

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return
			}

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return
			}

			moveCard(dragIndex, hoverIndex)
			// @ts-ignore
			item.index = hoverIndex
		}
	})

	const [{ isDragging }, drag] = useDrag({
		type: 'card',
		item: () => ({ id: item.id, index: index }),
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	})

	const opacity = isDragging ? 0 : 1
	drag(drop(ref));
	const preventDefault = (e: SyntheticEvent) => e.preventDefault();

	const removeIngredient = () => {
		dispatch(deleteIngredientConstructor({itemId: item.dragId}))
		dispatch(updateData({item: item, type: 'remove'}))
	}

	return (
		<div className={style.ingredient} ref={ref} style={{opacity}} onDrop={preventDefault} data-handler-id={handlerId}>
			<div className="burgerConstructor__icon mr-2">
				<DragIcon type="primary" />
			</div>
			<ConstructorElement
				text={item.name}
				price={item.price}
				thumbnail={item.image}
				handleClose={removeIngredient}
			/>
		</div>
	)
}

export default IngredientConstructor