import React, {useState} from 'react';
import up from '../../../assets/icons/chevron-up.svg'
import down from '../../../assets/icons/chevron-down.svg'

const AccordionItem = ({item, index}) => {
    const [icon, setIcon] = useState(up);
    const collapsed = index === 0 ? '' : 'collapsed';
    const show = index === 0 ? 'show' : '';
    const chevron = show ? down : up;
    const [isShow, setShow] = useState(false)

    const toggleOpen = isShow => {
        setShow(isShow)
    };

    return (
        <div>
            <div className="card">
                <div className="card-header" id={`heading${index}`}>
                    <h2 className="mb-0">
                        <button
                            className="btn text-left d-flex justify-content-between align-items-center"
                            type="button"
                            data-toggle="collapse"
                            data-target={`#collapse${index}`}
                            aria-expanded={index === 0 ? 'true' : 'false'}
                            aria-controls={`collapse${index}`}
                            onClick={e => toggleOpen(!isShow)}
                        >
                            {item.title}
                        </button>

                    </h2>
                </div>

                <div
                    id={`collapse${index}`}
                    className={`collapse ${isShow ? 'show' : 'collapsed'}`}
                    aria-labelledby={`heading${index}`}
                    data-parent="#accordionExample"
                >
                    <div className="card-body">
                        <p>{item.content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccordionItem;
