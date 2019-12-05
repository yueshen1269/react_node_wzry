const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";
const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";

const fetchStart = () => ({
  type: FETCH_POSTS_REQUEST
});

const fetchEndWithFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  error
});

const fetchEndWithSuccess = (response) => ({
  type: FETCH_POSTS_SUCCESS,
  response,
});


export {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_SUCCESS,
  fetchStart,
  fetchEndWithFailure,
  fetchEndWithSuccess,
}
