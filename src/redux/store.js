import { createStore,combineReducers } from "redux";
import { loginReducer,menuReducer } from "./reducers/login";
//一个项目不可能只有一个reducer
const rootReducer=combineReducers({
    loginReducer,menuReducer
})
const store=createStore(rootReducer)

export default store