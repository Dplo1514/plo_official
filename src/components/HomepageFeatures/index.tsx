import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
    title: string;
    Svg?: React.ComponentType<React.ComponentProps<'svg'>>;
    png?: string; // PNG 이미지 경로 추가
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: 'About Me',
        png: require('@site/static/img/01_introduce.png'),
        description: (
            <>
                안녕하세요! 저는 서버 개발자 <strong>Plo</strong>입니다.
                다양한 기술을 탐구하고, 문제를 해결하는 것을 좋아합니다.
                이 사이트는 제 경험과 프로젝트를 소개하기 위한 공간입니다.
            </>
        ),
    },
    {
        title: 'Tech Stack',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (
            <>
                주로 <strong>Python</strong>, <strong>Java</strong>, <strong>React</strong>와 같은 기술을 사용하며,
                클라우드 서비스와 데이터베이스 설계에 관심이 많습니다.
                최신 기술과 트렌드를 지속적으로 학습하고 있습니다.
            </>
        ),
    },
    {
        title: 'Projects',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (
            <>
                <ul>
                    <li><strong>Project A:</strong> 효율적인 데이터 수집을 위한 자동화 솔루션</li>
                    <li><strong>Project B:</strong> 클라우드 기반 API 개발</li>
                    <li><strong>Project C:</strong> 사용자 친화적인 웹 애플리케이션 제작</li>
                </ul>
            </>
        ),
    },
];

function Feature({title, Svg, png, description}: FeatureItem) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                {Svg ? (
                    <Svg className={styles.featureSvg} role="img" />
                ) : png ? (
                    <img className={styles.featureSvg} src={png} alt={title} /> // PNG 렌더링
                ) : null}
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
                    <h3>안녕하세요! 저는 서버 개발자 <strong>Plo</strong>입니다.</h3>
                    <h3>방문해주셔서 감사합니다,</h3>
                    <h4>이 사이트는 저의 개발자로써 성장 과정을 소개하기 위한 공간입니다.</h4>
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
