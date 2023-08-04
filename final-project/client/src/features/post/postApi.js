import { apiSlice } from "../api/apiSlice";

const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `/api/posts`,
    }),
    getPostsByUserId: builder.query({
      query: () => `/api/posts/get-all`,
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: `/api/posts`,
        method: "POST",
        body: data,
      }),
    }),
    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/posts/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    createComment: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/posts/${id}/create-comment`,
        method: "POST",
        body: data,
      }),
    }),
    likeUnlike: builder.mutation({
      query: ({ data, id }) => ({
        url: `/api/posts/${id}/like-unlike`,
        method: "POST",
        body: data,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/api/posts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useCreateCommentMutation,
  useLikeUnlikeMutation,
  useDeletePostMutation,
} = postApi;
