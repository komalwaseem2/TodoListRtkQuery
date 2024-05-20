import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3500'}),
    endpoints: (builder)=>({
        getTodos: builder.query({ // for requesting/querying only
            query: ()=>'/todos',
            transformResponse: res => res.sort((a, b) => b.id - a.id),
            providesTags: ['Todos'] // otherwise caches data and doesn't update
        }),
        addTodo: builder.mutation({ // for changing data
            query: (todo)=>({
                url: '/todos',
                method:'POST',
                body:todo
            }),
            invalidatesTags: ['Todos']
        }),
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ['Todos']
        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['Todos'] 
        }),
    })
})

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = apiSlice;