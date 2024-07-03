import Layout from "@theme/Layout";
import style from "./index.module.scss";
import Career from "@site/src/components/career";

const Hello = () => {
  const myMajorSkills = [
    "JavaScript",
    "CSS",
    "HTML",
    "Vue.js",
    "Vite",
    "TypeScript",
    "uni-app",
    "Taro",
    "qiankun",
    "...",
  ];

  const learningSkills = ["React", "Zustand"];

  return (
    <Layout>
      <div className={style["page"]}>
        <h1 className={style["greeting"]}>Hello👋, 我叫 Klein.</h1>
        <div className={style["content-bio"]}>
          <div className={style["bio"]}>
            <p>
              我是一名前端工程师，从大学毕业入门该行业到现在已经从事将近 5
              年了。
            </p>
            <p>在我的职业生涯里，我主要负责网页和应用的用户界面开发。</p>
            <p>
              我喜欢将设计和功能完美结合，致力于提供用户友好的界面和顺畅的用户体验。
            </p>
            <p>
              我的日常生活中，除了喜欢编程之外，还喜欢徒步、骑行🚴‍♀️以及健身🏋️。其中徒步是我最喜欢的一项运动，目前登顶的山峰🏔️已经达到20多座，最近一次登顶的是赣州齐云山，海拔高达
              2061 米。希望今年能够完成登顶湖南最高峰 - 酃峰。
            </p>
          </div>
          <div className={style["avatar"]}>
            <img src="https://avatars.githubusercontent.com/u/37327614?v=4" />
          </div>
        </div>
        <div className={style["content-skill"]}>
          <h3>🛠️ 专业技能</h3>
          <hr />
          <p>我主要掌握的专业技能有</p>
          <ul>
            {myMajorSkills.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>🌱 目前正在学习</p>
          <ul>
            {learningSkills.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={style["content-experience"]}>
          <h3>💼 工作经历</h3>
          <hr />
          <Career
            jobName="中高级前端开发工程师"
            companyName="湖南小桔信息科技有限公司"
            workBeginTime="2023-05"
            workEndTime="2024-07"
            mainTasks={[
              "负责公司云平台 2.0 技术方案选型和项目搭建以及核心功能开发",
              "参与项目需求评审，定期召开前端技术例会，分配需求任务",
              "接手前任的基础设施开发工作，负责前端基建相关开发工作",
            ]}
          />
          <Career
            jobName="中级前端开发工程师"
            companyName="湖南酷陆网络科技有限公司"
            workBeginTime="2021-08"
            workEndTime="2023-05"
            mainTasks={[
              "参与代码审查和技术分享",
              "负责地图组件的开发工作",
              "承担项目的跨端开发任务",
            ]}
          />
          <Career
            jobName="初级前端开发工程师"
            companyName="湖南蚁坊软件股份有限公司"
            workBeginTime="2020-01"
            workEndTime="2021-08"
            mainTasks={[
              "负责完成领导分配的前端需求",
              "每周参与 CodeReview",
              "协助测试同事参与系统测试",
            ]}
          />
          <div>
            如果您对我的职业经历感兴趣，或者想了解我。可以点击左下角的
            <i>Fine Me</i> 相关的社交媒体找到我。
          </div>
          <p>salute! 🫡</p>
        </div>
      </div>
    </Layout>
  );
};

export default Hello;
