import React, {useRef} from "react";
import {DragIcon, ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import style from "./ingredient-constructor.module.css"
import {useDispatch} from "react-redux";
import {deleteIngredientConstructor} from "../../services/store";

function IngredientConstructor({item, index, moveCard }) {
	const dispatch = useDispatch()

	const ref = useRef(null);

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
			const dragIndex = item.index
			const hoverIndex = index
			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect()
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
			const clientOffset = monitor.getClientOffset()
			const hoverClientY = clientOffset.y - hoverBoundingRect.top

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return
			}

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return
			}

			moveCard(dragIndex, hoverIndex)
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
	const preventDefault = (e) => e.preventDefault();

	const removeIngredient = (e) => {
		dispatch(deleteIngredientConstructor({itemId: item.dragId}))
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