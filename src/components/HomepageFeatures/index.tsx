import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
    title: string;
    // Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
    png?: string; // PNG 이미지 경로 추가
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: 'Vision',
        png: 'img/01_introduce_removebg.png',
        description: (
            <>
                깊은 기술력을 가진
                <br/>
                <strong>엔지니어</strong>로써의 방향성을 지향하며
                <br/>
                꾸준한 성장을 지속중에 있습니다.
            </>
        ),
    },
    {
        title: 'Tech',
        png: 'img/02_tech_stack-removebg-preview.png',
        description: (
            <>
                <strong>주 사용 기술 스택은 아래와 같습니다.</strong>
                <br/>
                Java , Spring
                <br/>
                Python ,Django , Flask , FastAPI
                <br/>
                Mysql , Postgresql
                <br/>
                <strong>아래의 Software를 개발하여 왔습니다.</strong>
                <br/>
                LMS, API Gateway ,WAS
                <br/>
                AI BackEnd , RAG
            </>
        ),
    }
];

function Feature({title, png, description}: FeatureItem) {
    return (
        <div className={clsx('col col--4 col--offset-1')}>
            <div className="text--center">
                <img src={png} alt={title}/>
            </div>
            <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="text--center">
                    <h2>안녕하세요!</h2>
                    <h3>저는 서버 개발자 <strong>Plo</strong>입니다</h3>
                </div>
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
