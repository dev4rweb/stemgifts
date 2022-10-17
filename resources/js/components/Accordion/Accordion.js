import React from 'react';
import AccordionItem from "./AccordionItem";

const Accordion = ({list}) => {
    return (
        <div className="accordion" id="accordionExample">
            <h3>FAQ</h3>
            {
                list.map((item, index)=> <AccordionItem key={index} item={item} index={index}/>)
            }
        </div>
    );
};

export default Accordion;
