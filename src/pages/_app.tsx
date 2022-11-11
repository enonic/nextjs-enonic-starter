import type {AppProps} from 'next/app'
import '../styles/globals.css'
import React from 'react';
import {FetchContentResult, RENDER_MODE, XP_REQUEST_TYPE} from '@enonic/nextjs-adapter';

/**
 * Wraps all rendered components
 * @param Component Usually triggering [[...contentPath]].tsx, this component is BasePage.tsx
 * @param pageProps {{common, data, meta, error}}
 */
function MyApp({Component, pageProps}: AppProps<FetchContentResult>) {

    // Component rendering - for component updates in Content Studio without reloading page
    if (pageProps.meta) {
        const meta = pageProps.meta;
        if (meta.requestType === XP_REQUEST_TYPE.COMPONENT) {
            return <details data-single-component-output="true"><Component {...pageProps} /></details>;
        } else if (!meta.canRender
            || (meta.catchAll && meta.renderMode === RENDER_MODE.EDIT)) {
            // return empty page, status is set in [[...contentPath.tsx]]
            return null;
        }
    }
    return <Component {...pageProps} />;

}

export default MyApp
