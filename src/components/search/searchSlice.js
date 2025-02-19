import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";


export const getSearchResults = createAsyncThunk('search/getSearchResults',
async (argument) =>{
let response;
response = await fetch(`/search.json?q=${argument}`)
const responseJson = await response.json();

// console.log(responseJson.data.children)
return responseJson.data.children.map(results => results.data)
}
)

const searchSlice = createSlice({
    name: 'search',
    initialState: {results: [],
        isError: false,
        isLoading: false
    },
    extraReducers: {
        [getSearchResults.pending](state,action){
            state.isLoading = true;
            state.isError = false;
        },
        [getSearchResults.rejected](state,action){
            state.isLoading = false;
            state.isError = true;
        },
        [getSearchResults.fulfilled] (state,action){
            state.isLoading = false;
            state.isError = false;
            state.results = action.payload;
        }
    }
})

export const searchReducer = searchSlice.reducer;
export const selectResults = state => state.search.results;

