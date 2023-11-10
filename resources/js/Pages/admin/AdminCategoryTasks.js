import React from 'react';
import s from '../../../sass/pages/AdminMainPage.module.scss'
import m from '../../../sass/pages/AdminPage.module.scss'
import AdminLayout from "../../components/parts/AdminLayout";
import {useSelector} from "react-redux";
import AdminSideBar from "../../components/parts/AdminSideBar";

const AdminCategoryTasks = ({categories}) => {
    const stateData = useSelector(state => state.lang)

    console.log('Categories', categories)

    return (
        <AdminLayout>
            <div className={`container admin-page ${m.adminPage}`}>
                <AdminSideBar/>
                <div className={`container ${s.adminMainPage}`}>
                    <div className="title-wrapper">
                        <p className="admin-title">| {stateData.admin.categoryTabs[stateData.lang]}</p>
                        <hr/>
                    </div>
                    <div>
                        <div className="accordion text-white" id="accordionExample">
                            {
                                categories.map((cat, i) =>
                                    <div className="accordion-item" key={cat.id}>
                                        <h2 className="accordion-header" id={`heading${cat.id}`}>
                                            <button
                                                className="accordion-button bg-body text-white text-uppercase fw-bold"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse${cat.id}`}
                                                aria-expanded={i === 0 ? `true` : 'false'}
                                                aria-controls={`collapse${cat.id}`}
                                            >
                                                {i + 1}. {cat.title}
                                            </button>
                                        </h2>
                                        <div
                                            id={`collapse${cat.id}`}
                                            className={i === 0 ? `accordion-collapse collapse show` : `accordion-collapse collapse`}
                                            aria-labelledby={`heading${cat.id}`}
                                            data-bs-parent="#accordionExample">
                                            <div className="accordion-body  bg-body text-white">
                                                <ul className="list-group">
                                                    {
                                                        cat.task_category_items.map((item, index) =>
                                                            <li
                                                                className="list-group-item  bg-body text-white"
                                                                key={`${cat.id}${item.id}`}
                                                            >
                                                                {index + 1}. {item.title}
                                                            </li>
                                                        )
                                                    }

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
};

export default AdminCategoryTasks;
