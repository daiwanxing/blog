import Layout from "@theme/Layout";
import style from "./index.module.scss";

const Hello = () => {
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
            <li>JavaScript</li>
            <li>Vue.js</li>
            <li>Vite</li>
            <li>TypeScript</li>
            <li>uniAPP</li>
            <li>Taro</li>
            <li>qiankun</li>
            <li>...</li>
          </ul>
          <p>🌱 目前正在学习</p>
          <ul>
            <li>React</li>
            <li>Zustand</li>
          </ul>
        </div>
        <div className={style["content-experience"]}>
          <h3>💼 工作经历</h3>
          <hr />
          <div>
            <div className={style["workExp-item"]}>
              <h5>中高级前端开发工程师</h5>
              <div className={style["workExp-company"]}>
                <span>湖南小桔信息科技有限公司，2023-05 - 2024-07</span>
              </div>
              <ul>
                <li>
                  负责云平台 2.0
                  前端的项目搭建与代码编写与代码提交规范制定，确保开发体验一致
                </li>
                <li>第二点</li>
                <li>第三点</li>
              </ul>
            </div>
            <div className={style["workExp-item"]}>
              <h5>中级前端开发工程师</h5>
              <div className={style["workExp-company"]}>
                <span>湖南酷陆网络科技有限公司，2021-08 - 2023-05</span>
              </div>
              <ul>
                <li>第一点</li>
                <li>第二点</li>
                <li>第三点</li>
              </ul>
            </div>
            <div className={style["workExp-item"]}>
              <h5>初级前端开发工程师</h5>
              <div className={style["workExp-company"]}>
                <span>湖南蚁坊软件股份有限公司，2020-01 - 2021-08</span>
              </div>
              <ul>
                <li>第一点</li>
                <li>第二点</li>
                <li>第三点</li>
              </ul>
            </div>
          </div>

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
