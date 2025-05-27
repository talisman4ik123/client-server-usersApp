const initialState = {
    users: [],
    loading: false,
    error: null,
};

export default function usersReducer(state = initialState, action) {
    switch (action.type) {
        case "users/fetchUsers":
            return { ...state, loading: true, error: null };

        case "users/fetchSuccess":
            return { ...state, loading: false, users: action.payload };

        case "users/fetchError":
            return { ...state, loading: false, error: action.payload };

        case "users/clearState":
            return initialState;

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
                dispatch({ type: "users/fetchSuccess", payload: data });
            }
        } catch (error) {
            dispatch({ type: "users/fetchError", payload: error.message });
        }
    };
}
