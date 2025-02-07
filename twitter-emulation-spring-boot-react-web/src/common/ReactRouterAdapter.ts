import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { PartialLocation, QueryParamAdapter } from 'use-query-params/src/types.ts';

export default function ReactRouterAdapter({children}: { children: (adapter: QueryParamAdapter) => React.ReactElement | null }) {
    const navigate = useNavigate();

    return children({
        location: useLocation(),
        replace: (location: PartialLocation) => navigate({search: location.search}, {replace: true, state: location.state}),
        push: (location: PartialLocation) => navigate({search: location.search}, {state: location.state})
    });
}
