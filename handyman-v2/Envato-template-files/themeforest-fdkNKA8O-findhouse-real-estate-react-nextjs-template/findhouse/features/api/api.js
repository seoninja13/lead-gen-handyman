import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Using a mock API for now
const mockData = {
    properties: [],
    agents: [],
    agencies: []
};

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "/",
        // Mock the fetch function to return our mock data
        fetchFn: async () => {
            return {
                ok: true,
                json: async () => mockData
            };
        }
    }),
    endpoints: (builder) => ({
        getProperties: builder.query({
            query: () => "properties",
        }),
        getAgents: builder.query({
            query: () => "agents",
        }),
        getAgencies: builder.query({
            query: () => "agencies",
        }),
    }),
});

export const { useGetPropertiesQuery, useGetAgentsQuery, useGetAgenciesQuery } = api;
