import reduxConstant from '../constant'
import artworkDetailReducer from './artworkDetail.reducer'

const reducer = {
    [reduxConstant.auth]: artworkDetailReducer,
}

export default reducer
