import React from 'react';
import '../../sass/components/Pagination.scss'
import {InertiaLink} from "@inertiajs/inertia-react";

const Pagination = ({links}) => {
    return (
        <nav>
            <ul className="pagination">
                {
                    links.map((item, i) =>
                     <li key={i} className={`page-item`}>
                         {
                             item.url ?
                                 <InertiaLink
                                     href={item.url}
                                     className={`page-link ${item.active ? 'activePage' : ''}`}
                                 >
                                     <span dangerouslySetInnerHTML={{__html: item.label}} />
                                 </InertiaLink>
                                 :
                                 <div
                                     className={`page-link ${item.active ? 'activePage' : ''}`}
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

export default Pagination;
