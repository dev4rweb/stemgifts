import React from 'react';
import Layout from "../components/parts/Layout";
import s from '../../sass/pages/FaqPage.module.scss'
import {useSelector} from "react-redux";
import Accordion from "../components/Accordion/Accordion";

const FaqPage = () => {
    const stateData = useSelector(state => state.lang)
    const faqData = [
        {
            id: 1,
            title: 'vel odit porro et nemo dolorem architecto vero illum',
            content: 'qui ex maxime consequatur illum autem rerum esse earum iusto natus maxime eveniet omnis non quia porro quidem possimus quia dolores impedit et eaque quam quia sit consequatur excepturi sed est porro molestias velit commodi doloribus nam id nesciunt similique quidem nam corrupti odit sint asperiores sapiente veniam aut dolorem reiciendis ut voluptatum ad omnis velit dolor sed rem cupiditate eius non laudantium in quia alias est et sunt ad rerum fugit quam voluptas ut quaerat excepturi excepturi et voluptas quia consequuntur est voluptas qui praesentium illum non delectus et enim ut eveniet quaerat perspiciatis eius et quibusdam sed consequatur'
        },
        {
            id: 2,
            title: 'id sit dolor cupiditate itaque dolorem molestiae esse amet',
            content: 'dolor voluptatem nisi totam id quod facere qui est voluptate voluptas facere rerum nesciunt tempore quibusdam ipsum et id dolorem repellendus dolores molestiae velit ullam quis eos tenetur asperiores ipsa cum blanditiis magni doloremque ut beatae nihil ad quo voluptates omnis accusantium corporis nobis facere dolorem fuga nulla sint repudiandae quia consequuntur maiores nihil aut minima esse necessitatibus aspernatur ipsa sed aut earum minima architecto excepturi iste et necessitatibus qui veritatis molestias qui necessitatibus quisquam nemo omnis eos assumenda non voluptatem harum at odit et minima facere vel in ullam cumque a qui nihil neque et ea ut animi in'
        },
        {
            id: 3,
            title: 'repellat qui qui vel quaerat nihil ut laudantium sed',
            content: 'in in dolore qui dolores placeat laudantium voluptatem molestias numquam ut molestiae expedita doloremque aperiam repudiandae mollitia aperiam est ea neque ipsa aut vitae ea autem occaecati quis corrupti error maxime saepe voluptatem occaecati repellat voluptate deserunt nesciunt quaerat dolorum exercitationem et et odit numquam eligendi autem molestias tenetur minus est est ipsa maiores placeat similique omnis et totam et vero culpa similique quia nostrum qui sit ab voluptatum occaecati similique excepturi dolores laboriosam repellat iste explicabo debitis nemo repellendus velit quo aut pariatur exercitationem nihil quidem deleniti nobis quod corrupti id distinctio enim aut vel est cumque enim suscipit'
        },
        {
            id: 4,
            title: 'illum et tempore deserunt voluptas nihil molestiae debitis eos',
            content: 'officiis molestiae ipsam aspernatur excepturi velit voluptatibus quae id fuga fuga aspernatur tenetur quaerat perferendis omnis et ullam consequatur consequuntur odio aut soluta asperiores libero aliquam aut eius ut deserunt quas omnis eveniet nobis sunt et praesentium ex sit in harum eos ea ipsa nam aut rem nam rerum saepe sapiente recusandae aut tempore magnam asperiores animi incidunt ut esse voluptatem quasi quisquam voluptas similique assumenda eveniet totam aliquam vero architecto blanditiis cum deserunt nulla facere enim cupiditate consectetur sed doloremque consequuntur maiores repellendus harum voluptas sint ut excepturi veritatis neque officia explicabo temporibus qui modi fugiat quaerat et corporis'
        },
        {
            id: 5,
            title: 'quo et ut velit accusantium et magnam voluptate dolores',
            content: 'recusandae cum aut at quisquam itaque sit laudantium provident id numquam velit numquam voluptatem aspernatur sed omnis quia doloribus aut sunt ipsam enim quis eligendi consequuntur incidunt nostrum quae porro aspernatur rerum voluptatem nisi error molestias voluptates quam quas vel dignissimos distinctio mollitia quia iusto autem qui a adipisci blanditiis dolorem et possimus quam voluptatem quidem qui quis nostrum qui et provident dolorem laboriosam vel nulla ut quia dolores suscipit sint non et illo facilis ipsum deleniti corrupti alias neque doloremque magni ut minus et sapiente voluptas voluptatem tempore ullam magni aliquid libero et excepturi repudiandae ut dicta nostrum quod'
        }
    ]
    return (
        <Layout>
            <article className={s.faqPage}>
                <div className={s.layer}>
                    <section className={`container ${s.content}`}>
                        {
                            faqData && faqData.length > 0 &&
                            <Accordion list={faqData}/>
                        }
                    </section>
                </div>
            </article>
        </Layout>
    );
};

export default FaqPage;
