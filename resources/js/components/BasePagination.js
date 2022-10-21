import React from 'react';
import '../../sass/components/Pagination.scss'
import {InertiaLink} from "@inertiajs/inertia-react";

const BasePagination = ({links}) => {
    return (
        <nav>
            <ul className="pagination">
                {
                    links.map((item, i) =>
                        <li
                            key={i}
                            className={`page-item`}
                            style={{margin: '3px'}}
                        >
                            {
                                item.url ?
                                    <InertiaLink
                                        href={item.url}
                                        className={`page-link ${item.active ? 'activePage' : ''}`}
                                        style={{
                                            height: '28px', minWidth: '28px', fontSize: '16px'
                                        }}
                                    >
                                        <span dangerouslySetInnerHTML={{__html: item.label}} />
                                    </InertiaLink>
                                    :
                                    <div
                                        className={`page-link ${item.active ? 'activePage' : ''}`}
                                        style={{
                                            height: '28px', minWidth: '28px', fontSize: '16px'
                                        }}
                                    >
                                        <span dangerouslySetInnerHTML={{__html: item.label}} />
                                    </div>
                            }

                        </li>
                    )
                }
            </ul>
        </nav>
    );
};

export default BasePagination;
