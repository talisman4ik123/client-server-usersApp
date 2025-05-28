const initialState = {
    currentUser: {},
    users: [],
    loading: false,
    error: null,
    updateLoading: false,
    updateError: null,
};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case "users/fetchUsers":
            return { ...state, loading: true, error: null };

        case "users/fetchSuccess":
            return {
                ...state,
                loading: false,
                currentUser: action.payload.currentUser,
                users: action.payload.users,
            };

        case "users/fetchError":
            return { ...state, loading: false, error: action.payload };

        case "users/clearState":
            return initialState;

        case "users/selectUser": {
            const { users } = state;
            return {
                ...state,
                users: users.map((user) =>
                    user.id == action.payload
                        ? { ...user, selected: !user.selected }
                        : user
                ),
            };
        }
        case "users/selectAllUsers": {
            const { users } = state;
            return {
                ...state,
                users: users.map((user) => ({
                    ...user,
                    selected: action.payload,
                })),
            };
        }
        case "users/fetchUpdateUsers": {
            return { ...state, updateLoading: true, updateError: null };
        }

        case "users/fetchUpdateSuccess": {
            return {
                ...state,
                updateLoading: false,
                users: action.payload,
            };
        }

        case "users/fetchUpdateError": {
            return {
                ...state,
                updateLoading: false,
                updateError: action.payload,
            };
        }

        default:
            return state;
    }
}

export function getAllUsers() {
    return async function (dispatch) {
        dispatch({ type: "users/fetchUsers" });

        try {
            const response = await fetch("http://localhost:5000/api/users", {
                method: "GET",
                credentials: "include",
            });

            if (!response.ok || response.status === 401) {
                const errorData = await response.json();

                dispatch({
                    type: "users/fetchError",
                    payload: errorData.message,
                });
            } else {
                const data = await response.json();
                data.users.map((user) => (user.selected = false));
                dispatch({ type: "users/fetchSuccess", payload: data });
            }
        } catch (error) {
            dispatch({ type: "users/fetchError", payload: error.message });
        }
    };
}
