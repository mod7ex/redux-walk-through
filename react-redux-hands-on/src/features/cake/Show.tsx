import { useAppDispatch, useAppSelector } from "../../app/store";
import cakeSlice from '../../features/cake/slice';

const {order, restock} = cakeSlice.actions

const CakeShow = () => {
    const count = useAppSelector(s => s.cake.count)

    const dispatch = useAppDispatch()

    return (
        <div>
            <h1>Cake : { count }</h1>
            <hr />
            <div>
                <button onClick={() => dispatch(order())} >Order</button>
                <button onClick={() => dispatch(restock(100))} >Restock</button>
            </div>
        </div>
    )
}

export default CakeShow