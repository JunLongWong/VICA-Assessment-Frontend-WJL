import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IBook } from "../Api/model/types";
import { api } from "../Api/api";


type BookListState = {
    bookList: IBook[];
    isSuccess: boolean | undefined;
    isLoading: boolean | undefined;
    isError: boolean | undefined;
    error: string | null;
    totalBookCount: number
};

const slice = createSlice({
    name: "book",
    initialState: {
        bookList: [],
        isSuccess: undefined,
        isLoading: undefined,
        isError: undefined,
        error: null,
        totalBookCount: 0
    } as BookListState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.getAllBook.matchFulfilled,
            (state, action) => {
                state.bookList = action.payload.Books.bookList;
                state.isSuccess = true;
                state.totalBookCount = action.payload.Books.bookList.length;
            }
        );

        builder.addMatcher(
            api.endpoints.deleteBook.matchFulfilled,
            (state, action) => {
                state.bookList = state.bookList.filter(bookObj => bookObj._id !== action.payload.Book._id)
            }
        );

        builder.addMatcher(
            api.endpoints.createBook.matchFulfilled,
            (state, action) => {
                const bookPayload = action.payload.Book
                let updatedQty = false;
                for (let i = 0; i < state.bookList.length; i++) {
                    if (state.bookList[i].title === bookPayload.title &&
                        state.bookList[i].description === bookPayload.description &&
                        state.bookList[i].author === bookPayload.author &&
                        state.bookList[i].genre === bookPayload.genre &&
                        state.bookList[i].published_year === bookPayload.published_year) {
                        state.bookList[i].quantity = bookPayload.quantity;
                        updatedQty = true
                    }
                }
                if (!updatedQty) { state.bookList = [...state.bookList, action.payload.Book]; }
            }
        );
        builder.addMatcher(
            api.endpoints.updateBook.matchFulfilled,
            (state, action) => {
                state.bookList = state.bookList.map(book => book._id !== action.payload.Book._id ? book : action.payload.Book)
            }
        );
    },
});


export default slice.reducer;

// for use selectors to get state in components
export const getAllBookList = (state: RootState) => state.book.bookList;
export const getTotalBookCount = (state: RootState) => state.book.totalBookCount;
export const getAllBookListIsSuccess = (state: RootState) => state.book.isSuccess;
export const getAllBookListIsLoading = (state: RootState) => state.book.isLoading;
export const getAllBookListIsError = (state: RootState) => state.book.isError;
export const getAllBookListError = (state: RootState) => state.book.error;
