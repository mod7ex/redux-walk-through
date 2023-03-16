import { useAppDispatch, useAppSelector } from "../../app/store";
import iceCreamSlice, { orderIceCreamAsync } from '../../features/ice-cream/slice';

const {order, restock} = iceCreamSlice.actions

const IceCreamShow = () => {
    const count = useAppSelector(s => s.ice_cream.count)
    const pending = useAppSelector(s => s.ice_cream.pending)
    const error = useAppSelector(s => s.ice_cream.error)

    const dispatch = useAppDispatch()

    return (
        <div>
            <h1>Ice Cream : { count }</h1>
            <hr />
            <div>
                <button onClick={() => dispatch(order())} >Order</button>
                <button onClick={() => dispatch(orderIceCreamAsync(300))} >
                    {/* @ts-ignore */}
                    Order Async { pending ? '(loading...)' : error?.message && `(${error?.message || ''})` }
                </button>
                <button onClick={() => dispatch(restock(100))} >Restock</button>
            </div>
        </div>
    )
}

export default IceCreamShow