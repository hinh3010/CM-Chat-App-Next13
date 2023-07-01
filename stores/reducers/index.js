import reduxConstant from '../constant'
import artworkDetailReducer from './artworkDetail.reducer'

const reducer = {
    [reduxConstant.artworkDetail]: artworkDetailReducer,
}

export default reducer
