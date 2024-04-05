const GET_ALL_USERS = "users/getAllUsers";
const GET_USER = "api/user/GET_USER";

export const getAllUsers = (users) => ({
    type: GET_ALL_USERS,
    payload: users
});

export const getUser = (user) => ({
    type: GET_USER,
    user
});

export const thunkGetAllUsers = () => async (dispatch) => {
    const res  = await fetch('/api/users/');
    if (res.ok) {
        const users = await res.json();
        dispatch(getAllUsers(users.users));
        return users;
    }
};

export const fetchUser = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

    if (res.ok){
        const data = await res.json();
        dispatch(getUser(data));
    } else {
        return ["An error occurred. Please try again."]
    }
};

const initialState = {allUsers: {}, singleUser: {}};

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_USERS: {
            const newState = {...state, allUsers: {...state.allUsers}, singleUsers: {}};
            action.payload.forEach(user => {
                newState.allUsers[user.id] = user;
            });
            return newState;
        }
        case GET_USER:
            return {...state, singleUser: {...action.user}, allUsers: {...state.allUsers}};
        default:
            return state;
    }
}
