import React from 'react';
import '../../sass/components/Pagination.scss'
import {useDispatch} from "react-redux";
import {setHomePaginationPageAction} from "../reducers/pages/homePageReducer";

const Pagination = ({links}) => {
    const dispatch = useDispatch()

    const changePageHandler = (url) => {
        const urlParams = new URLSearchParams(new URL(url).search)
        dispatch(setHomePaginationPageAction(urlParams.get('page')))
        console.log('changePageHandler', urlParams.get('page'))
    };

    return (
        <nav>
            <ul className="pagination">
                {
                    links.map((item, i) =>
                     <li key={i} className={`page-item`}>
                         {
                             item.url ?
                                 <button
                                     onClick={e => changePageHandler(item.url)}
                                     className={`page-link ${item.active ? 'activePage' : ''}`}
                                 >
                                     <span dangerouslySetInnerHTML={{__html: item.label}} />
                                 </button>
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
